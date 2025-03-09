import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { join } from 'path';
import { rabbitMQConfig } from '../../config/rabbitmq.config';
import { MAIL_HOST, MAIL_PASSWORD, MAIL_USER } from '../../constant';
import configuration from '../../config/configuration';
import { NotificationsController } from './notifications.controller';
import * as Handlebars from 'handlebars';

// Register the eq helper
Handlebars.registerHelper('eq', function (v1, v2) {
  return v1 === v2;
});

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      load: configuration,
    }),
    ClientsModule.register(rabbitMQConfig),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        return {
          transport: {
            host: config.get<string>(MAIL_HOST),
            secure: false,
            auth: {
              user: config.get<string>(MAIL_USER),
              pass: config.get<string>(MAIL_PASSWORD),
            },
          },
          defaults: {
            from: '"Ceramic Cup Shop" <noreply@ceramiccupshop.com>',
          },
          template: {
            dir: join(__dirname, './templates'),
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [NotificationsController],
})
export class NotificationsModule {}
