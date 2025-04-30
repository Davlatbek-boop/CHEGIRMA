import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthAdminController } from './admin/auth.admin.controller';
import { AuthUserController } from './user/auth.user.controller';
import { AuthAdminService } from './admin/auth.admin.service';
import { AuthUserService } from './user/auth.user.service';
import { AdminModule } from '../admin/admin.module';

@Module({
  imports: [JwtModule.register({ global: true }), UsersModule, AdminModule],
  controllers: [AuthAdminController, AuthUserController],
  providers: [AuthAdminService, AuthUserService],
  exports:[]
})
export class AuthModule {}
