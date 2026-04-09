import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { EnquiryService } from './enquiry.service';
import { CreateEnquiryDto } from './dto/create-enquiry.dto';
import { UpdateEnquiryDto } from './dto/update-enquiry.dto';
import { Roles } from '../comman/decorators/roles.decorator';
import { Public } from '../comman/decorators/public.decorator';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from '../comman/guards/jwt-auth.guard';
import { RolesGuard } from '../comman/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('enquiry')
export class EnquiryController {
  constructor(private readonly enquiryService: EnquiryService) { }

  // 🔹 Create enquiry (PUBLIC)
  @Post()
  @Public()
  create(@Body() dto: CreateEnquiryDto) {
    return this.enquiryService.create(dto);
  }

  // 🔹 Get all enquiries
  @Get()
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.USER)
  findAll() {
    return this.enquiryService.findAll();
  }



  // 🔹 Get single enquiry
  @Get(':id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.USER)
  findOne(@Param('id') id: string) {
    return this.enquiryService.findOne(id);
  }

  // 🔹 Update enquiry
  @Put(':id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.USER)
  update(@Param('id') id: string, @Body() dto: UpdateEnquiryDto) {
    return this.enquiryService.update(id, dto);
  }

  // 🔹 Delete enquiry (soft delete)
  @Delete(':id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.enquiryService.remove(id);
  }


  @Post(':id/convert-to-lead')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.USER)
  convertToLead(@Param('id') id: string) {
    return this.enquiryService.convertToLead(id);
  }


}