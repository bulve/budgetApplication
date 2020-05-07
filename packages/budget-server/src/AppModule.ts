import { Module } from '@nestjs/common';
import { ConnectionModule } from './connection';
import { UserModule } from './user';
import { AuthModule } from './auth';
import { ConfigModule } from './config';
import { AccountModule } from "./account";
import { HealthModule } from "./health";

@Module({
  imports: [ConnectionModule, ConfigModule, AccountModule, UserModule, AuthModule, HealthModule],
})
export class ApplicationModule {}