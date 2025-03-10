import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { API_SEND_MAIL_KEY, DOMAINNAME } from '../../constant';
import { getJwtConfig } from './tokenConfig';
import { UsersService } from './users/users.service';
import { User } from './users/entity/user.entity';
import * as sendGrid from '@sendgrid/mail';
import { generate, GenerateOptions } from 'randomstring';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import {
  REDIS_KEYS,
  REDIS_EXPIRATION_TIME,
} from '../../constant/redis-keys.constant';

interface TokenPayload {
  exp?: number;
  email?: string;
  sub?: string;
}

const convertToUserInfor = (user: User) => ({
  email: user.email,
  name: user.name,
  id: user.id,
  isAdmin: user.isAdmin,
});

@Injectable()
export class AuthService {
  private accessTokenSignConfig;
  private refreshTokenSignConfig;

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly config: ConfigService,
    @InjectRedis() private readonly redis: Redis,
  ) {
    const { accessTokenSignConfig, refreshTokenSignConfig } =
      getJwtConfig(config);
    this.accessTokenSignConfig = accessTokenSignConfig;
    this.refreshTokenSignConfig = refreshTokenSignConfig;
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    return await this.usersService.validateUserPassword(email, password);
  }

  async getCurrentUser(id: string) {
    // Try to get user from cache first
    const cacheKey = `${REDIS_KEYS.USER_CACHE}:${id}`;
    const cachedUser = await this.redis.get(cacheKey);

    if (cachedUser) {
      try {
        return { data: JSON.parse(cachedUser) };
      } catch (error) {
        console.error('Error parsing cached user:', error);
        await this.invalidateUserCache(id);
      }
    }

    const user = await this.usersService.getItemById(id);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Cache the user data
    const userData = convertToUserInfor(user);
    await this.redis.set(
      cacheKey,
      JSON.stringify(userData),
      'EX',
      REDIS_EXPIRATION_TIME.USER_CACHE,
    );

    return { data: userData };
  }

  async login(user: { email: string; password: string }) {
    const result = await this.usersService.validateUserPassword(
      user.email,
      user.password,
    );
    if (result) {
      const thisUser = result;
      if (!thisUser) {
        throw new BadRequestException('User not found');
      }
      const payload = {
        email: thisUser.email,
        sub: thisUser.id,
        isAdmin: thisUser.isAdmin,
      };
      const refreshToken = thisUser.refreshToken;

      if (refreshToken) {
        const decodedToken = this.tokenToPayload(refreshToken);
        if (
          !decodedToken ||
          (decodedToken?.exp && Date.now() >= decodedToken.exp * 1000)
        ) {
          const newRefreshToken = this.jwtService.sign(
            payload,
            this.refreshTokenSignConfig,
          );
          await this.usersService.updateUserRefreshToken(
            thisUser.id,
            newRefreshToken,
          );
        }
      }

      const currentUser = await this.usersService.getUserByEmail(
        thisUser.email,
      );

      // Cache user data after successful login
      const userData = convertToUserInfor(thisUser);
      await this.redis.set(
        `${REDIS_KEYS.USER_CACHE}:${thisUser.id}`,
        JSON.stringify(userData),
        'EX',
        REDIS_EXPIRATION_TIME.USER_CACHE,
      );

      return {
        access_token: this.jwtService.sign(payload, this.accessTokenSignConfig),
        refresh_token: currentUser?.refreshToken,
        userInfor: userData,
      };
    }
    return null;
  }

  async logout(accessToken: string): Promise<void> {
    // Add token to invalid tokens set
    await this.redis.set(
      `${REDIS_KEYS.INVALID_TOKEN}:${accessToken}`,
      '1',
      'EX',
      REDIS_EXPIRATION_TIME.INVALID_TOKEN,
    );
  }

  async isTokenInvalid(accessToken: string): Promise<boolean> {
    const invalidToken = await this.redis.get(
      `${REDIS_KEYS.INVALID_TOKEN}:${accessToken}`,
    );
    return !!invalidToken;
  }

  private async invalidateUserCache(userId: string): Promise<void> {
    await this.redis.del(`${REDIS_KEYS.USER_CACHE}:${userId}`);
  }

  async register(user: {
    email: string;
    password: string;
    confirmPassword?: string;
    name: string;
  }): Promise<any> {
    const userFindByEmail = await this.usersService.getUserByEmail(user.email);
    if (userFindByEmail) {
      throw new BadRequestException('Email already exists');
    }
    if (user.confirmPassword && user.confirmPassword !== user.password) {
      throw new BadRequestException(
        'The password and confirm password is not the same',
      );
    }
    const hash = await bcrypt.hash(user.password, 12);
    const createUser = await this.usersService.create({
      email: user.email,
      password: hash,
      refreshToken: '',
      name: user.name,
      isAdmin: false,
    });
    const userId = await this.usersService.getUserIdByEmail(user.email);
    const payload = { email: user.email, sub: userId };
    const newRefreshToken = this.jwtService.sign(
      payload,
      this.refreshTokenSignConfig,
    );
    await this.usersService.updateUserRefreshToken(userId, newRefreshToken);
    if (createUser) {
      return {
        access_token: this.jwtService.sign(payload, this.accessTokenSignConfig),
        refresh_token: newRefreshToken,
      };
    }
    return null;
  }

  async refreshAccessToken(refreshToken: string, userId: string): Promise<any> {
    const user = await this.usersService.getItemById(userId);
    if (!user) {
      throw new BadRequestException('Can not get user with given userId');
    }
    if (refreshToken === user.refreshToken) {
      const payload = { email: user.email, sub: userId };
      const newAccessToken = this.jwtService.sign(
        payload,
        this.accessTokenSignConfig,
      );
      return {
        access_token: newAccessToken,
      };
    }
    return null;
  }

  async loginWithThirdService(req: { user: { email: string } }): Promise<any> {
    if (!req.user) {
      throw new BadRequestException(
        'Can not read user from request which is required field',
      );
    }
    const existedUser = await this.usersService.getUserByEmail(req.user.email);
    if (!existedUser) {
      const hash = await bcrypt.hash('123456', 12);
      const createUser = await this.usersService.create({
        email: req.user.email,
        password: hash,
        refreshToken: '',
        name: '',
        isAdmin: false,
      });
      const userId = await this.usersService.getUserIdByEmail(req.user.email);
      const payload = { email: req.user.email, sub: userId };
      const newRefreshToken = this.jwtService.sign(
        payload,
        this.refreshTokenSignConfig,
      );
      await this.usersService.updateUserRefreshToken(userId, newRefreshToken);
      if (createUser) {
        return {
          access_token: this.jwtService.sign(
            payload,
            this.accessTokenSignConfig,
          ),
          refresh_token: newRefreshToken,
        };
      }
      return null;
    }
    const currentRefreshToken = existedUser.refreshToken;
    if (currentRefreshToken) {
      const decodedToken = this.tokenToPayload(currentRefreshToken);
      const userId = await this.usersService.getUserIdByEmail(req.user.email);
      const payload = { sub: userId, email: req.user.email };

      if (decodedToken?.exp && Date.now() >= decodedToken.exp * 1000) {
        const newRefreshToken = this.jwtService.sign(
          payload,
          this.refreshTokenSignConfig,
        );
        await this.usersService.updateUserRefreshToken(userId, newRefreshToken);
      }

      const currentUser = await this.usersService.getUserByEmail(
        req.user.email,
      );
      return {
        access_token: this.jwtService.sign(payload, this.accessTokenSignConfig),
        refresh_token: currentUser?.refreshToken,
      };
    }
    return null;
  }

  async sentActivateAccountEmail(userInfo: {
    email: string;
    sub: string;
  }): Promise<void> {
    const email = userInfo.email;
    const options: GenerateOptions = {
      length: 32,
      charset: 'alphanumeric',
    };
    const activateCode = generate(options);
    const setResult = await this.usersService.setActivatedCode(
      userInfo.sub,
      activateCode,
    );
    const domainName = this.config.get<string>(DOMAINNAME);
    const senderApiKey = this.config.get<string>(API_SEND_MAIL_KEY);

    if (!senderApiKey) {
      throw new Error('SendGrid API key not configured');
    }

    if (setResult) {
      sendGrid.setApiKey(senderApiKey);
      const message = {
        to: email,
        from: 'admin@lysu.com',
        subject: 'Activate your account now!',
        html: `${domainName}api/auth/activateAccount?userId=${userInfo.sub}&activateCode=${activateCode}`,
      };
      await sendGrid.send(message);
    } else {
      throw new Error('Failed to set activate code to user');
    }
  }

  async sentInvitationGroupEmail(
    userInfo: { email: string },
    email: string,
    invitationLink: string,
  ): Promise<void> {
    const senderApiKey = this.config.get<string>(API_SEND_MAIL_KEY);
    if (!senderApiKey) {
      throw new Error('SendGrid API key not configured');
    }

    try {
      sendGrid.setApiKey(senderApiKey);
      const message = {
        to: email,
        from: 'darkflamekhtn@gmail.com',
        subject: `${userInfo.email} invited you to join a group`,
        html: `${invitationLink}`,
      };
      await sendGrid.send(message);
    } catch {
      throw new Error('Failed to send invitation email');
    }
  }

  getTokenFromRequestHeader(request: {
    headers: { authorization: string };
  }): string {
    const requestAuthorization = request.headers.authorization;
    const [, token] = requestAuthorization.split(' ');
    return token;
  }

  tokenToPayload(token: string): TokenPayload {
    return this.jwtService.decode(token) as TokenPayload;
  }
}
