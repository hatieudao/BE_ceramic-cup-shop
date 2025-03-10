import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT_SECRET_KEY } from '../../../constant/index';
import { AuthService } from '../authentication.service';

interface JwtPayload {
  sub: string;
  email: string;
  isAdmin: boolean;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>(JWT_SECRET_KEY),
    });
  }

  async validate(payload: JwtPayload, token: string) {
    // Check if token is invalid
    const isInvalid = await this.authService.isTokenInvalid(token);
    if (isInvalid) {
      throw new UnauthorizedException('Token has been invalidated');
    }

    return {
      id: payload.sub,
      email: payload.email,
      isAdmin: payload.isAdmin,
    };
  }
}
