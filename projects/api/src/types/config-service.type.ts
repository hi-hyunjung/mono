import type { ConfigType } from '@nestjs/config';
import type { appConfig } from '@/configs/app.config';

export interface ConfigServiceType {
  app: ConfigType<typeof appConfig>;
}
