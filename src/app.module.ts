import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccessControlModule } from 'nest-access-control';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { roles } from './app.roles';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/autenticacion'),
    UserModule,
    AuthModule,
    AccessControlModule.forRoles(roles),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
