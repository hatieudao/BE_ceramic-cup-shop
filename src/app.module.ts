import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';
import {
  MYSQL_DATABASE,
  MYSQL_HOST,
  MYSQL_PASSWORD,
  MYSQL_PORT,
  MYSQL_USER,
  REDIS_HOST,
  REDIS_PASSWORD,
  REDIS_PORT,
} from './constant';
import { AuthModule } from './modules/authentication/authentication.module';
import { LoggerMiddleware } from './utils/logger.middleware';
import { ProductsModule } from './modules/products/products.module';
import { ProductTypesModule } from './modules/product-types/product-types.module';
import { CartsModule } from './modules/carts/carts.module';
import { OrdersModule } from './modules/orders/orders.module';
import { RedisModule, RedisModuleOptions } from '@nestjs-modules/ioredis';
import { NotificationsModule } from './modules/notifications/notifications.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      load: configuration,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get(MYSQL_HOST),
        port: +configService.get(MYSQL_PORT),
        username: configService.get(MYSQL_USER),
        password: configService.get(MYSQL_PASSWORD),
        database: configService.get(MYSQL_DATABASE),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false,
      }),
    }),
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): RedisModuleOptions => ({
        type: 'single',
        options: {
          host: configService.get<string>(REDIS_HOST),
          port: parseInt(configService.get<string>(REDIS_PORT, '6379'), 10),
          password: configService.get<string>(REDIS_PASSWORD),
          // ttl: 600,
        },
      }),
    }),
    AuthModule,
    ProductsModule,
    ProductTypesModule,
    CartsModule,
    OrdersModule,
    NotificationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
