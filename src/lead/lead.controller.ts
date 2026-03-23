import { Controller, Post, Param, Put, Body, Get, UseGuards } from '@nestjs/common';
import { LeadService } from './lead.service';
import { Roles } from '../comman/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from '../comman/guards/jwt-auth.guard';
import { RolesGuard } from '../comman/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('lead')
export class LeadController {
  constructor(private readonly leadService: LeadService) {}


  @Post('convert/:id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.USER)
  convert(@Param('id') id: string) {
    return this.leadService.convertFromEnquiry(id);
  }


  @Get()
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.USER)
  findAll() {
    return this.leadService.findAll();
  }


  @Put(':id/status')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  updateStatus(
    @Param('id') id: string,
    @Body() body: { status: 'NEW' | 'DONE' }
  ) {
    return this.leadService.updateStatus(id, body.status);
  }
}