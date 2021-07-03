import { ConfigType } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import appConfig from './config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config: ConfigType<typeof appConfig> = app.get(appConfig.KEY);

  const properties = new DocumentBuilder()
    .setTitle(config.swagger.title)
    .setDescription(config.swagger.description)
    .build();
  const document = SwaggerModule.createDocument(app, properties);
  SwaggerModule.setup('swagger', app, document);

  app.enableCors();
  await app.listen(config.port, () => {
    console.log(`Server listen in http://${config.host}:${config.port}`);
    console.log(
      `For test porpuse use http://${config.host}:${config.port}/swagger`,
    );
  });
}
bootstrap();
