import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, Payload, Transport } from '@nestjs/microservices';
import { ClientKafka } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) { }

  @Post('order')
  async createOrder(@Body() orderData: { orderId: string; product: string; quantity: number; price: number }) {
    this.kafkaClient.emit('order.created', {
      value: orderData,
    });
    return { message: 'Order created and event emitted to Kafka.' };
  }

  @EventPattern('order.created')
  async handleOrderCreated(@Payload() message: any) {
    console.log('Raw Kafka Message:', message);

    const orderData = message;

    if (!orderData) {
      console.error('No order data found in message');
      return;
    }
    console.log('Order received:', orderData);
    await this.appService.createInvoice(orderData);
  }
}
