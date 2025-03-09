import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { ORDER_NOTIFICATION } from './constant/rabitmq.constant';
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    NotificationsModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672'],
        queue: ORDER_NOTIFICATION,
        queueOptions: {
          durable: true,
        },
      },
    },
  );

  await app.listen();
  console.log('🚀 Notifications Microservice is listening...');
}

bootstrap();
