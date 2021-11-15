import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';

import { UserSchema, User } from './schemas/user.schema';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;
          schema.pre<User>('save', async function (next) {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const user = this;
            const hashedPassword = await bcrypt.hash(user.password, 10);
            user.password = hashedPassword;
            next();
          });
          return schema;
        },
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
