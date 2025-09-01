import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { DepositUseCase, WithdrawUseCase, TransferUseCase } from './usecases';
import { AccountModule } from '../';
import { IdempotencyRepository } from './repository/idempotency.repository';
import { AccountLockService } from '../../common/locks/account-lock.service';

@Module({
  imports: [AccountModule],
  controllers: [EventController],
  providers: [
    DepositUseCase,
    WithdrawUseCase,
    TransferUseCase,
    IdempotencyRepository,
    AccountLockService,
  ],
})
export class EventModule {}
