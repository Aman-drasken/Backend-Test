import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEnquiryDto } from './dto/create-enquiry.dto';
import { UpdateEnquiryDto } from './dto/update-enquiry.dto';
import { LeadService } from '../lead/lead.service'; // 🔥 IMPORT

@Injectable()
export class EnquiryService {
  constructor(
    private prisma: PrismaService,
    private leadService: LeadService, // 🔥 INJECT
  ) {}

  
  async create(dto: CreateEnquiryDto) {
    return this.prisma.enquiry.create({
      data: {
        ...dto,
      },
    });
  }

  
  async findAll() {
    return this.prisma.enquiry.findMany({
      where: { isDeleted: false },
      include: {
        service: true,
      },
    });
  }

  
  async findOne(id: string) {
    const enquiry = await this.prisma.enquiry.findUnique({
      where: { id },
      include: {
        service: true,
      },
    });

    if (!enquiry) {
      throw new NotFoundException('Enquiry not found');
    }

    return enquiry;
  }

  
  async update(id: string, dto: UpdateEnquiryDto) {
    return this.prisma.enquiry.update({
      where: { id },
      data: {
        ...dto,
      },
    });
  }

  
  async remove(id: string) {
    return this.prisma.enquiry.update({
      where: { id },
      data: {
        isDeleted: true,
      },
    });
  }

  
  async convertToLead(id: string) {
    return this.leadService.convertFromEnquiry(id);
  }
}