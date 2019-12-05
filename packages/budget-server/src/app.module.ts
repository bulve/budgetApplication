import { Module } from '@nestjs/common';
import { ConnectionModule } from './connection/connection.module';
import { UserModule } from './user/user.module';
import { BudgetModule } from './budget/budget.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [ConnectionModule, ConfigModule, BudgetModule, UserModule, AuthModule],
})
export class ApplicationModule {}