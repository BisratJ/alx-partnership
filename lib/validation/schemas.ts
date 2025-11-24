import { z } from 'zod';
import { isMinBusinessDaysAhead, isWithinOperatingHours, isValidEmail, isValidPhone } from '@/lib/utils';

/**
 * Partnership Intake Form Validation Schema
 * Maps to the Field Mapping Table in PRD
 */
export const intakeFormSchema = z.object({
  // Section 1: Partner Info
  org_name: z.string()
    .min(1, 'Organization name is required')
    .max(150, 'Organization name must be 150 characters or less')
    .trim(),
  
  poc_name: z.string()
    .min(1, 'Point of contact name is required')
    .max(100, 'Name must be 100 characters or less')
    .trim(),
  
  poc_email: z.string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .refine((email) => isValidEmail(email), {
      message: 'Invalid email format',
    }),
  
  poc_phone: z.string()
    .min(1, 'Phone number is required')
    .refine((phone) => isValidPhone(phone), {
      message: 'Please enter a valid phone number with country code (e.g., +254712345678)',
    }),
  
  org_url: z.string()
    .url('Please enter a valid URL')
    .optional()
    .or(z.literal('')),
  
  // Section 2: Criteria (Required Checkboxes)
  mission_align: z.literal(true, {
    errorMap: () => ({ message: 'You must confirm alignment with ALX mission to proceed' }),
  }),
  
  cobranding_consent: z.literal(true, {
    errorMap: () => ({ message: 'You must agree to ALX co-branding guidelines' }),
  }),
  
  // Section 3: Event Details
  event_title: z.string()
    .min(1, 'Event title is required')
    .max(100, 'Event title must be 100 characters or less')
    .trim(),
  
  event_desc: z.string()
    .min(1, 'Event description is required')
    .max(1000, 'Event description must be 1000 characters or less')
    .trim(),
  
  partnership_type: z.enum(['SPEAKER', 'EVENT', 'RECRUITMENT', 'SPONSORSHIP', 'OTHER'], {
    errorMap: () => ({ message: 'Please select a partnership type' }),
  }),
  
  target_hub: z.enum(['CAPSTONE', 'CITYPOINT', 'VIRTUAL'], {
    errorMap: () => ({ message: 'Please select a hub' }),
  }),
  
  event_date: z.string()
    .min(1, 'Event date is required')
    .refine((dateStr) => {
      const date = new Date(dateStr);
      return !isNaN(date.getTime());
    }, {
      message: 'Invalid date format',
    })
    .refine((dateStr) => {
      const date = new Date(dateStr);
      const minDays = parseInt(process.env.BUSINESS_DAYS_ADVANCE || '15', 10);
      return isMinBusinessDaysAhead(date, minDays);
    }, {
      message: `Event must be scheduled at least ${process.env.BUSINESS_DAYS_ADVANCE || 15} business days in advance`,
    }),
  
  start_time: z.string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (use HH:MM)')
    .refine((time) => isWithinOperatingHours(time, '09:00', '20:00'), {
      message: 'Start time must be within hub operating hours (09:00 - 20:00)',
    }),
  
  end_time: z.string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (use HH:MM)')
    .refine((time) => isWithinOperatingHours(time, '09:00', '20:00'), {
      message: 'End time must be within hub operating hours (09:00 - 20:00)',
    }),
  
  attendee_count: z.number()
    .int('Attendee count must be a whole number')
    .min(1, 'At least 1 attendee is required')
    .max(1000, 'Attendee count seems too high. Please contact us directly.'),
  
  // Section 4: Files (handled separately in file upload)
  file_concept: z.instanceof(File).optional(),
  file_logo: z.instanceof(File).optional(),
  
}).refine((data) => {
  // Validate end_time is after start_time
  const [startHours, startMins] = data.start_time.split(':').map(Number);
  const [endHours, endMins] = data.end_time.split(':').map(Number);
  
  const startMinutes = startHours * 60 + startMins;
  const endMinutes = endHours * 60 + endMins;
  
  return endMinutes > startMinutes;
}, {
  message: 'End time must be after start time',
  path: ['end_time'],
});

export type IntakeFormData = z.infer<typeof intakeFormSchema>;

/**
 * File upload validation
 */
export const fileUploadSchema = z.object({
  concept_note: z.instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: 'Concept note must be less than 5MB',
    })
    .refine((file) => file.type === 'application/pdf', {
      message: 'Concept note must be a PDF file',
    }),
  
  logo: z.instanceof(File)
    .refine((file) => file.size <= 2 * 1024 * 1024, {
      message: 'Logo must be less than 2MB',
    })
    .refine((file) => ['image/png', 'image/jpeg'].includes(file.type), {
      message: 'Logo must be PNG or JPEG format',
    })
    .optional(),
});

/**
 * Request update schema (for internal dashboard)
 */
export const requestUpdateSchema = z.object({
  status: z.enum(['NEW', 'UNDER_REVIEW', 'APPROVED', 'REJECTED', 'SCHEDULED', 'COMPLETED', 'CANCELLED']).optional(),
  assigned_to_id: z.string().uuid().optional(),
  comment: z.string().max(1000).optional(),
});

/**
 * Event creation schema (calendar)
 */
export const eventCreationSchema = z.object({
  request_id: z.string().uuid(),
  title: z.string().min(1).max(100),
  description: z.string().max(1000).optional(),
  start_datetime: z.string().datetime(),
  end_datetime: z.string().datetime(),
  hub_id: z.string().uuid(),
  room_resource: z.string().max(50).optional(),
  color_code: z.string().regex(/^#[0-9A-Fa-f]{6}$/).default('#3B82F6'),
}).refine((data) => {
  const start = new Date(data.start_datetime);
  const end = new Date(data.end_datetime);
  return end > start;
}, {
  message: 'Event end time must be after start time',
  path: ['end_datetime'],
});

/**
 * Comment creation schema
 */
export const commentSchema = z.object({
  request_id: z.string().uuid(),
  content: z.string().min(1, 'Comment cannot be empty').max(2000),
  is_internal: z.boolean().default(true),
});

/**
 * User creation/update schema
 */
export const userSchema = z.object({
  email: z.string().email(),
  full_name: z.string().min(1).max(100),
  role: z.enum(['ADMIN', 'REVIEWER', 'TEAM_MEMBER', 'SCHEDULER']),
});

/**
 * Hub configuration schema
 */
export const hubConfigSchema = z.object({
  name: z.enum(['CAPSTONE', 'CITYPOINT', 'VIRTUAL']),
  timezone: z.string().default('Africa/Nairobi'),
  open_time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).default('09:00'),
  close_time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).default('20:00'),
  address: z.string().optional(),
  capacity: z.number().int().positive().optional(),
});

/**
 * Search/filter schema for dashboard
 */
export const requestFilterSchema = z.object({
  status: z.enum(['NEW', 'UNDER_REVIEW', 'APPROVED', 'REJECTED', 'SCHEDULED', 'COMPLETED', 'CANCELLED']).optional(),
  hub_id: z.string().uuid().optional(),
  assigned_to_id: z.string().uuid().optional(),
  partnership_type: z.enum(['SPEAKER', 'EVENT', 'RECRUITMENT', 'SPONSORSHIP', 'OTHER']).optional(),
  date_from: z.string().datetime().optional(),
  date_to: z.string().datetime().optional(),
  search: z.string().optional(),
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(20),
});

export type RequestFilter = z.infer<typeof requestFilterSchema>;
