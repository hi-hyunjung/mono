import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import type { NestFastifyApplication } from '@nestjs/platform-fastify';
import { FastifyAdapter } from '@nestjs/platform-fastify';
// import { ConfigService } from '@nestjs/config';
// import type { ConfigServiceType } from './types/config-service.type';

const globalPrefix = 'api';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter({}), { bufferLogs: true });

  app.enableCors({ origin: '*', exposedHeaders: ['Content-Disposition'] });
  app.setGlobalPrefix(globalPrefix, { exclude: ['/docs/redoc'] });

  // const configService = app.get(ConfigService<ConfigServiceType>);

  await app.listen(process.env.PORT ?? 3003);
}
void bootstrap();
