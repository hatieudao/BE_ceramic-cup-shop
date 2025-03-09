import { MailerService } from '@nestjs-modules/mailer';
import { Controller, Logger } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { CREATE_ORDER, UPDATE_ORDER } from '../../constant/rabitmq.constant';
import { OrderStatus } from '../orders/entity/order.entity';

@Controller()
export class NotificationsController {
  private readonly logger = new Logger('MESSAGE_QUEUE_SERVICE');

  constructor(private readonly mailerService: MailerService) {}

  @EventPattern(CREATE_ORDER)
  async handleOrderCreated(data: {
    email: string;
    orderId: string;
    status: OrderStatus;
  }) {
    if (data.email) {
      try {
        await this.mailerService.sendMail({
          to: data.email,
          subject: 'Order Status Update',
          template: 'order-notification',
          context: {
            name: data.email,
            orderId: data.orderId,
            status: data.status,
          },
        });
        this.logger.log(`Email sent successfully to ${data.email}`);
      } catch (error) {
        this.logger.error(`Failed to send email to ${data.email}:`, error);
      }
    } else {
      this.logger.warn(`User not found for userId: ${data.email}`);
    }
  }

  @EventPattern(UPDATE_ORDER)
  async handleOrderUpdated(data: {
    email: string;
    orderId: string;
    status: OrderStatus;
  }) {
    this.logger.log(`Received order_updated event: ${JSON.stringify(data)}`);

    if (data.email) {
      try {
        await this.mailerService.sendMail({
          to: data.email,
          subject: 'Order Status Update',
          template: 'order-notification',
          context: {
            name: data.email,
            orderId: data.orderId,
            status: data.status,
          },
        });
        this.logger.log(`Email sent successfully to ${data.email}`);
      } catch (error) {
        this.logger.error(`Failed to send email to ${data.email}:`, error);
      }
    } else {
      this.logger.warn(`User not found for userId: ${data.email}`);
    }
  }
}
