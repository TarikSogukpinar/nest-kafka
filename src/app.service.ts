import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  handleExampleEvent(message: string): Promise<void> {
    console.log(`Create order: ${message}`);
    return Promise.resolve();
  }

  async createInvoice(orderData: { orderId: string; product: string; quantity: number; price: number }): Promise<void> {
    const totalPrice = orderData.quantity * orderData.price;
    console.log(`Invoice created for Order ID: ${orderData.orderId}`);
    console.log(`Product: ${orderData.product}, Quantity: ${orderData.quantity}, Total Price: ${totalPrice}`);
  }
}