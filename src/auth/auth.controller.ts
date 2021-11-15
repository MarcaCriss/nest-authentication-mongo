import { Controller, Post, Req, UseGuards } from '@nestjs/common';

import { User } from './../user/schemas/user.schema';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req: Request) {
    const user = req.user as User;
    return this.authService.generateJWT(user);
  }
}
