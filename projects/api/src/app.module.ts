import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { LoggerModule } from 'nestjs-pino';

import { appConfig, appConfigSchema } from './configs/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      validationSchema: appConfigSchema,
      validationOptions: { abortEarly: true },
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: { target: 'pino-pretty', options: { singleLine: true } },
        autoLogging: {
          ignore: (req) => req.url === '/api/health',
        },
        customLogLevel: (req, res, err) => {
          if (process.env.NODE_ENV === 'test') {
            return 'silent';
          }
          if (res.statusCode === 401) {
            return 'silent';
          }
          if (res.statusCode >= 400 && res.statusCode < 500) {
            return 'warn';
          } else if (res.statusCode >= 500) {
            return 'error';
          } else if (err != null) {
            return 'error';
          }
          return 'info';
        },
      },
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
