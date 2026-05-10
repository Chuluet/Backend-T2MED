import { Controller, Post, Get, Patch, Body, Inject, Req, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { FirebaseAuthGuard } from '../../auth/firebase-auth.guard';

@Controller('users')
export class UserGatewayController {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
  ) {}

  @Post('create')
  createUser(@Body() body: any) {
    return this.userClient.send({ cmd: 'create_user' }, body);
  }

  @Get('profile')
  @UseGuards(FirebaseAuthGuard)
  getProfile(@Req() req) {
    return this.userClient.send({ cmd: 'get_user_profile' }, req.user.uid);
  }

  @Patch('profile')
  @UseGuards(FirebaseAuthGuard)
  updateProfile(@Req() req, @Body() body: any) {
    return this.userClient.send({ cmd: 'update_user_profile' }, { uid: req.user.uid, data: body });
  }

  @Post('reset-password')
  resetPassword(@Body() body: { email: string }) {
    return this.userClient.send({ cmd: 'reset_password' }, body.email);
  }

  @Post('fcm-token')
  @UseGuards(FirebaseAuthGuard)
  saveFcmToken(@Req() req, @Body('fcmToken') fcmToken: string) {
    return this.userClient.send({ cmd: 'save_fcm_token' }, { uid: req.user.uid, fcmToken });
  }

  @Post('logout')
  @UseGuards(FirebaseAuthGuard)
  @HttpCode(HttpStatus.OK)
  logout(@Req() req) {
    return this.userClient.send({ cmd: 'logout' }, { uid: req.user.uid });
  }
}