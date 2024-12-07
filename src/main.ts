import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'invoice-consumer',
      },
    },
  });

  await app.startAllMicroservices();

  await app.listen(3000);
  console.log('Application is running on: http://localhost:3000');
}
void bootstrap();
