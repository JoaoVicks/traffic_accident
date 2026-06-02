import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      // validationError: { // comentada até esse erro acontecer, pois não consegui reproduzir o erro
      //   target: false,
      //   value: false,
      // },
      // disableErrorMessages: { // comentada até esse erro acontecer, pois não consegui reproduzir o erro
      //   target: false,
      //   value: false,
      // },
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();