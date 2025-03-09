import { ClientsModuleOptions, Transport } from '@nestjs/microservices';
import {
  MESSAGE_QUEUE_SERVICE,
  ORDER_NOTIFICATION,
} from '../constant/rabitmq.constant';

export const rabbitMQConfig: ClientsModuleOptions = [
  {
    name: MESSAGE_QUEUE_SERVICE,
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672'],
      queue: ORDER_NOTIFICATION,
      queueOptions: {
        durable: true,
      },
    },
  },
];
