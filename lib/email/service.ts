import nodemailer from 'nodemailer';
import Handlebars from 'handlebars';
import { prisma } from '@/lib/db/prisma';
import { readFileSync } from 'fs';
import { join } from 'path';

/**
 * Email Service - Handles all email notifications
 * Uses Handlebars templates and Nodemailer
 */

interface EmailOptions {
  to: string;
  subject: string;
  templateName: string;
  templateData: Record<string, any>;
  cc?: string[];
}

class EmailService {
  private transporter: nodemailer.Transporter;
  private templatesCache: Map<string, HandlebarsTemplateDelegate> = new Map();

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  /**
   * Load and compile email template
   */
  private getTemplate(templateName: string): HandlebarsTemplateDelegate {
    if (this.templatesCache.has(templateName)) {
      return this.templatesCache.get(templateName)!;
    }

    const templatePath = join(process.cwd(), 'lib', 'email', 'templates', `${templateName}.hbs`);
    const templateSource = readFileSync(templatePath, 'utf-8');
    const template = Handlebars.compile(templateSource);
    
    this.templatesCache.set(templateName, template);
    return template;
  }

  /**
   * Send email with template
   */
  async send(options: EmailOptions): Promise<void> {
    try {
      const template = this.getTemplate(options.templateName);
      const html = template({
        ...options.templateData,
        app_url: process.env.APP_URL,
        current_year: new Date().getFullYear(),
      });

      const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: options.to,
        cc: options.cc,
        subject: options.subject,
        html,
      };

      const info = await this.transporter.sendMail(mailOptions);

      // Log to database
      await prisma.notification.create({
        data: {
          recipientEmail: options.to,
          subject: options.subject,
          templateName: options.templateName,
          templateData: options.templateData,
          sentAt: new Date(),
        },
      });

      console.log('Email sent:', info.messageId);
    } catch (error) {
      console.error('Email send failed:', error);
      
      // Log failure to database
      await prisma.notification.create({
        data: {
          recipientEmail: options.to,
          subject: options.subject,
          templateName: options.templateName,
          templateData: options.templateData,
          failedAt: new Date(),
          errorMessage: error instanceof Error ? error.message : 'Unknown error',
          retryCount: 0,
        },
      });

      throw error;
    }
  }

  /**
   * Send submission receipt to partner
   */
  async sendSubmissionReceipt(data: {
    email: string;
    pocName: string;
    requestId: string;
    eventTitle: string;
    eventDate: string;
    hubName: string;
  }): Promise<void> {
    await this.send({
      to: data.email,
      cc: [process.env.EMAIL_ADMIN_CC || ''],
      subject: `We received your partnership request (Ref: ${data.requestId})`,
      templateName: 'submission-receipt',
      templateData: data,
    });
  }

  /**
   * Send assignment notification to staff
   */
  async sendAssignment(data: {
    email: string;
    staffName: string;
    requestId: string;
    orgName: string;
    eventTitle: string;
    eventDate: string;
    hubName: string;
  }): Promise<void> {
    await this.send({
      to: data.email,
      subject: `New Assignment: ${data.eventTitle}`,
      templateName: 'assignment-created',
      templateData: data,
    });
  }

  /**
   * Send status change notification
   */
  async sendStatusChange(data: {
    email: string;
    pocName: string;
    requestId: string;
    eventTitle: string;
    oldStatus: string;
    newStatus: string;
    comment?: string;
  }): Promise<void> {
    await this.send({
      to: data.email,
      subject: `Partnership Request Update: ${data.eventTitle}`,
      templateName: 'status-changed',
      templateData: data,
    });
  }

  /**
   * Send calendar confirmation
   */
  async sendCalendarConfirmation(data: {
    email: string;
    pocName: string;
    eventTitle: string;
    startDatetime: string;
    endDatetime: string;
    hubName: string;
    hubAddress?: string;
  }): Promise<void> {
    await this.send({
      to: data.email,
      subject: `Event Confirmed: ${data.eventTitle}`,
      templateName: 'calendar-confirmed',
      templateData: data,
    });
  }

  /**
   * Retry failed emails
   */
  async retryFailedEmails(): Promise<void> {
    const failedNotifications = await prisma.notification.findMany({
      where: {
        failedAt: { not: null },
        retryCount: { lt: 3 },
      },
      take: 10,
    });

    for (const notification of failedNotifications) {
      try {
        await this.send({
          to: notification.recipientEmail,
          subject: notification.subject,
          templateName: notification.templateName,
          templateData: notification.templateData as Record<string, any>,
        });

        await prisma.notification.update({
          where: { id: notification.id },
          data: {
            sentAt: new Date(),
            failedAt: null,
            errorMessage: null,
          },
        });
      } catch (error) {
        await prisma.notification.update({
          where: { id: notification.id },
          data: {
            retryCount: notification.retryCount + 1,
            errorMessage: error instanceof Error ? error.message : 'Retry failed',
          },
        });
      }
    }
  }

  /**
   * Test email configuration
   */
  async testConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      console.log('SMTP connection verified');
      return true;
    } catch (error) {
      console.error('SMTP connection failed:', error);
      return false;
    }
  }
}

// Singleton instance
export const emailService = new EmailService();
