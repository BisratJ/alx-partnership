/**
 * Resend Email Service (FREE: 3,000 emails/month)
 * https://resend.com
 * 
 * Install: npm install resend --legacy-peer-deps
 */

import { Resend } from 'resend';
import { prisma } from '@/lib/db/prisma';

const resend = new Resend(process.env.RESEND_API_KEY);

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

/**
 * Send email using Resend (FREE tier: 3,000 emails/month)
 */
export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    const { data, error } = await resend.emails.send({
      from: options.from || process.env.EMAIL_FROM || 'ALX Partnership <onboarding@resend.dev>',
      to: [options.to],
      subject: options.subject,
      html: options.html,
    });

    if (error) {
      console.error('Resend error:', error);
      
      // Log failed email
      await prisma.notification.create({
        data: {
          type: 'EMAIL',
          recipient: options.to,
          subject: options.subject,
          status: 'FAILED',
          sentAt: new Date(),
          failureReason: error.message,
        },
      });
      
      return false;
    }

    // Log successful email
    await prisma.notification.create({
      data: {
        type: 'EMAIL',
        recipient: options.to,
        subject: options.subject,
        status: 'SENT',
        sentAt: new Date(),
        metadata: { resendId: data?.id },
      },
    });

    console.log('Email sent successfully:', data?.id);
    return true;
  } catch (error) {
    console.error('Email send error:', error);
    return false;
  }
}

/**
 * Send submission receipt email
 */
export async function sendSubmissionReceipt(params: {
  email: string;
  pocName: string;
  requestId: string;
  eventTitle: string;
  eventDate: string;
  hubName: string;
}): Promise<void> {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                   color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; background: #3b82f6; color: white; 
                   padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; color: #6b7280; font-size: 14px; margin-top: 20px; }
          .info-box { background: white; padding: 15px; border-left: 4px solid #3b82f6; margin: 15px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ Application Received!</h1>
          </div>
          <div class="content">
            <p>Hi ${params.pocName},</p>
            <p>Thank you for submitting your partnership request to ALX Africa!</p>
            
            <div class="info-box">
              <strong>📋 Your Reference ID:</strong><br>
              <code style="font-size: 16px; color: #3b82f6;">${params.requestId}</code>
            </div>
            
            <div class="info-box">
              <strong>🎯 Event Details:</strong><br>
              <strong>Title:</strong> ${params.eventTitle}<br>
              <strong>Date:</strong> ${params.eventDate}<br>
              <strong>Hub:</strong> ${params.hubName}
            </div>
            
            <p><strong>What happens next?</strong></p>
            <ol>
              <li>Our team will review your request within <strong>48 hours</strong></li>
              <li>You'll receive an email update when status changes</li>
              <li>If approved, we'll work with you on scheduling details</li>
            </ol>
            
            <center>
              <a href="${process.env.APP_URL}/track/${params.requestId}" class="button">
                Track Your Application
              </a>
            </center>
            
            <p>Keep this email for your records. Use the reference ID above to track your application status.</p>
            
            <p>Questions? Reply to this email or contact us at partnerships@alxafrica.com</p>
            
            <p>Best regards,<br>
            <strong>ALX Partnership Team</strong></p>
          </div>
          <div class="footer">
            <p>© 2025 ALX Africa. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  await sendEmail({
    to: params.email,
    subject: `Partnership Request Received - ${params.eventTitle}`,
    html,
  });
}

/**
 * Send status change notification
 */
export async function sendStatusChange(params: {
  email: string;
  pocName: string;
  requestId: string;
  eventTitle: string;
  oldStatus: string;
  newStatus: string;
  comment?: string;
}): Promise<void> {
  const statusMessages: Record<string, string> = {
    APPROVED: '🎉 Great news! Your partnership request has been approved.',
    REJECTED: '❌ Unfortunately, we cannot proceed with your partnership request at this time.',
    UNDER_REVIEW: '👀 Your request is now under review by our team.',
    SCHEDULED: '📅 Your event has been scheduled!',
  };

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                   color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
          .status-badge { display: inline-block; padding: 8px 16px; border-radius: 20px; 
                         font-weight: bold; margin: 10px 0; }
          .status-approved { background: #10b981; color: white; }
          .status-rejected { background: #ef4444; color: white; }
          .status-review { background: #f59e0b; color: white; }
          .button { display: inline-block; background: #3b82f6; color: white; 
                   padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Status Update: ${params.eventTitle}</h1>
          </div>
          <div class="content">
            <p>Hi ${params.pocName},</p>
            
            <p>${statusMessages[params.newStatus] || 'Your request status has been updated.'}</p>
            
            <p>
              <strong>Previous Status:</strong> ${params.oldStatus}<br>
              <strong>New Status:</strong> <span class="status-badge status-${params.newStatus.toLowerCase()}">${params.newStatus}</span>
            </p>
            
            ${params.comment ? `
              <p><strong>Note from our team:</strong></p>
              <blockquote style="border-left: 4px solid #3b82f6; padding-left: 15px; color: #6b7280;">
                ${params.comment}
              </blockquote>
            ` : ''}
            
            <center>
              <a href="${process.env.APP_URL}/track/${params.requestId}" class="button">
                View Full Details
              </a>
            </center>
            
            <p>Reference ID: <code>${params.requestId}</code></p>
            
            <p>Best regards,<br>
            <strong>ALX Partnership Team</strong></p>
          </div>
        </div>
      </body>
    </html>
  `;

  await sendEmail({
    to: params.email,
    subject: `Status Update: ${params.eventTitle}`,
    html,
  });
}

export const resendEmailService = {
  sendEmail,
  sendSubmissionReceipt,
  sendStatusChange,
};
