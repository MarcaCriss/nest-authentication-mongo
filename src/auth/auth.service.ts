/* eslint-disable @typescript-eslint/no-unused-vars */
import { PayloadToken } from './models/token.model';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { User } from './../user/schemas/user.schema';
import { UserService } from './../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.getUserByEmail(email);
    if (!user) return null;
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const { password, ...rpta } = user.toJSON();
      return rpta;
    }
  }

  generateJWT(user: User) {
    const payload: PayloadToken = { role: user.role, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
