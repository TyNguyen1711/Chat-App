import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from "cookie-parser";

// import * as  graphqlUploadExpress  from "graphql-upload/graphqlUploadExpress.mjs";
import { graphql } from 'graphql';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { default: graphqlUploadExpress } = await import('graphql-upload/graphqlUploadExpress.mjs');
  app.enableCors({
    origin: "http://localhost:5173",
    credential: true,
    allowedHeaders: [
      'Accept',
      'Authorization',
      'Content-Type',
      'X-Requested-With',
      'apollo-require-preflight'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
  })
  app.use(cookieParser())
  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    })
  )
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
