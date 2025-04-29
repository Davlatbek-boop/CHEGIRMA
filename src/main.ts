import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function start() {
  try {
    const PORT = process.env.PORT || 3030;
    const app = await NestFactory.create(AppModule, {
      logger: ["error", "warn"],
    });
    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix("api")

    const config = new DocumentBuilder()
      .setTitle("Nest-One project")
      .setDescription("NEST-ONE REST API")
      .setVersion("1.0")
      .addTag("NestJS, swagger, sendMail, bot, SMS, tokens, Validation")
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("docs", app, document);
    await app.listen(PORT, () => {
      console.log(`Server started at: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
start();
