import { Controller, Post, Get, Body, Inject, Req, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { FirebaseAuthGuard } from '../../auth/firebase-auth.guard';

@Controller('condition')
@UseGuards(FirebaseAuthGuard)
export class ConditionsGatewayController {
  constructor(
    @Inject('CONDITIONS_SERVICE') private readonly conditionsClient: ClientProxy,
  ) {}

  @Post()
  saveMedicalProfile(@Req() req, @Body() body: any) {
    return this.conditionsClient.send({ cmd: 'save_medical_profile' }, { userId: req.user.uid, data: body });
  }

  @Get()
  getMedicalProfile(@Req() req) {
    return this.conditionsClient.send({ cmd: 'get_medical_profile' }, req.user.uid);
  }
}