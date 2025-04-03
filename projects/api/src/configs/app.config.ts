import { registerAs } from '@nestjs/config';
import Joi from 'joi';

export const appConfigSchema = Joi.object({
  APP_PORT: Joi.number().default(4000),
  APP_ADDRESS: Joi.string().default('0.0.0.0'),
  BASE_URL: Joi.string().required,
});

export const appConfig = registerAs('app', () => ({
  port: process.env.APP_PORT,
  address: process.env.APP_ADDRESS,
  baseUrl: process.env.APP_BASE_URL,
}));
