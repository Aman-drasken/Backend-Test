import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LeadService {
  constructor(private prisma: PrismaService) {}

  async convertFromEnquiry(enquiryId: string) {
    
    const enquiry = await this.prisma.enquiry.findUnique({
      where: { id: enquiryId },
    });

    if (!enquiry) {
      throw new BadRequestException('Enquiry not found');
    }

    
    const existingLead = await this.prisma.lead.findUnique({
      where: { enquiryId },
    });

    if (existingLead) {
      throw new BadRequestException('Lead already exists for this enquiry');
    }

    
    const nameExists = await this.prisma.lead.findFirst({
      where: { name: enquiry.name },
    });

    if (nameExists) {
      throw new BadRequestException('Lead with this name already exists');
    }

    
    return this.prisma.lead.create({
      data: {
        name: enquiry.name,
        email: enquiry.email,
        phone: enquiry.phone,
        description: enquiry.description,
        enquiryId: enquiry.id,
      },
    });
  }

  
  async updateStatus(id: string, status: 'NEW' | 'DONE') {
    return this.prisma.lead.update({
      where: { id },
      data: { status },
    });
  }

  
  async findAll() {
    return this.prisma.lead.findMany();
  }
}