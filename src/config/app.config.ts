import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: Number(process.env.APP_PORT) || 3000,
  host: process.env.APP_HOST || 'localhost',
  swagger: {
    title: process.env.SWAGGER_TITLE || 'Bibliotec API',
    description: process.env.SWAGGER_DESCRIPTION || 'API for the Bibliotec',
  },
}));
