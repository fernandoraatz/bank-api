import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  NotFoundException,
} from "@nestjs/common";

@Catch(NotFoundException)
export class NotFoundZeroFilter implements ExceptionFilter {
  catch(_exception: NotFoundException, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse();
    res.status(404).send(0);
  }
}
