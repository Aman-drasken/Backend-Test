export class UpdateEnquiryDto {
  name?: string;
  email?: string;
  phone?: string;
  description?: string;
  serviceId?: string;
  status?: 'OPEN' | 'IN_PROGRESS' | 'CLOSED';
}