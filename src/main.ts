import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function main() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,              //elimina las propiedades que no existen, pero no da error
      forbidNonWhitelisted: true,   //lanza error bad request si vienen propiedades que no existen
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}

main();
