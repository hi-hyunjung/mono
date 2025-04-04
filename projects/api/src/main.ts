/**
 * Copyright 2023 LINE Corporation
 *
 * LINE Corporation licenses this file to you under the Apache License,
 * version 2.0 (the "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at:
 *
 *   https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */

import { Logger as DefaultLogger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { HttpExceptionFilter } from './common/filters';

import { AppModule } from './app.module';
import type { NestFastifyApplication } from '@nestjs/platform-fastify';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';

import type { ConfigServiceType } from './types/config-service.type';

const globalPrefix = 'api';

async function bootstrap() {
  initializeTransactionalContext();
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter({}), { bufferLogs: true });

  app.enableCors({ origin: '*', exposedHeaders: ['Content-Disposition'], methods: '*' });
  app.setGlobalPrefix(globalPrefix, { exclude: ['/docs/redoc'] });

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useLogger(app.get(Logger));

  const configService = app.get(ConfigService<ConfigServiceType>);
  const { port, address }: { port: number; address: string } = configService.get('app', { infer: true }) ?? {
    port: 4000,
    address: 'localhost',
  };

  await app.listen(process.env.PORT ?? port, address);
  DefaultLogger.log(`🚀 Application is running on: ${await app.getUrl()}`);
}
void bootstrap();
