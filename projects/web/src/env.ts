import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  shared: {
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  },
  client: {
    NEXT_PUBLIC_MAX_DAYS: z.coerce.number().default(90),
    NEXT_PUBLIC_API_BASE_URL: z.string(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_MAX_DAYS: process.env.NEXT_PUBLIC_MAX_DAYS,
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NODE_ENV: process.env.NODE_ENV,
  },
  skipValidation: !!process.env.CI || !!process.env.SKIP_ENV_VALIDATION || process.env.npm_lifecycle_event === 'lint',
});
