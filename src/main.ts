import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NotFoundZeroFilter } from "./common/filters/not-found-zero.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new NotFoundZeroFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
