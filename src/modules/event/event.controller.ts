import { Body, Controller, Post, BadRequestException, Headers, HttpCode } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { DepositUseCase, WithdrawUseCase, TransferUseCase } from './usecases';
import { IdempotencyRepository } from './repository/idempotency.repository';

@Controller('event')
export class EventController {
  constructor(
    private readonly depositUseCase: DepositUseCase,
    private readonly withdrawUseCase: WithdrawUseCase,
    private readonly transferUseCase: TransferUseCase,
    private readonly idempotencyRepo: IdempotencyRepository,
  ) {}

  @Post()
  @HttpCode(201)
  async handle(@Body() body: CreateEventDto, @Headers('idempotency-key') idempotencyKey?: string) {
    if (idempotencyKey && this.idempotencyRepo.exists(idempotencyKey)) {
      return this.idempotencyRepo.get(idempotencyKey);
    }

    const { type, amount, origin, destination } = body;
    let result;

    switch (type) {
      case 'deposit':
        if (!destination) throw new BadRequestException('Destination is required');
        result = await this.depositUseCase.execute(destination, amount);
        break;

      case 'withdraw':
        if (!origin) throw new BadRequestException('Origin is required');
        result = await this.withdrawUseCase.execute(origin, amount);
        break;

      case 'transfer':
        if (!origin || !destination)
          throw new BadRequestException('Origin and destination are required');
        result = await this.transferUseCase.execute(origin, destination, amount);
        break;

      default:
        throw new BadRequestException('Invalid event type');
    }

    if (idempotencyKey) {
      this.idempotencyRepo.save(idempotencyKey, result);
    }
    return result;
  }
}
