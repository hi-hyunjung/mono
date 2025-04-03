import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';

import { appConfig, appConfigSchema } from './configs/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      validationSchema: appConfigSchema,
      validationOptions: { abortEarly: true },
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
