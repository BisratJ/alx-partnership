import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { sanitizeFilename } from '@/lib/utils';
import { v4 as uuidv4 } from 'uuid';

/**
 * File Storage Service (S3-compatible)
 * Handles secure file uploads, downloads, and deletions
 */

export interface UploadResult {
  fileUrl: string;
  fileKey: string;
  fileName: string;
  fileSize: number;
}

class StorageService {
  private s3Client: S3Client;
  private bucket: string;
  private publicUrl: string;

  constructor() {
    this.s3Client = new S3Client({
      region: process.env.S3_REGION || 'us-east-1',
      endpoint: process.env.S3_ENDPOINT,
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
      },
    });

    this.bucket = process.env.S3_BUCKET || 'alx-partnership-files';
    this.publicUrl = process.env.S3_PUBLIC_URL || `https://${this.bucket}.s3.amazonaws.com`;
  }

  /**
   * Upload a file to S3
   * @param file - File to upload
   * @param folder - Optional folder path (e.g., 'concept-notes', 'logos')
   * @returns Upload result with file URL and metadata
   */
  async uploadFile(file: File, folder: string = 'uploads'): Promise<UploadResult> {
    try {
      // Validate file
      this.validateFile(file);

      // Generate unique file key
      const fileExt = file.name.split('.').pop();
      const sanitizedName = sanitizeFilename(file.name);
      const uniqueKey = `${folder}/${uuidv4()}-${sanitizedName}`;

      // Convert File to Buffer
      const buffer = Buffer.from(await file.arrayBuffer());

      // Upload to S3
      const command = new PutObjectCommand({
        Bucket: this.bucket,
        Key: uniqueKey,
        Body: buffer,
        ContentType: file.type,
        Metadata: {
          originalName: file.name,
          uploadedAt: new Date().toISOString(),
        },
      });

      await this.s3Client.send(command);

      const fileUrl = `${this.publicUrl}/${uniqueKey}`;

      return {
        fileUrl,
        fileKey: uniqueKey,
        fileName: file.name,
        fileSize: file.size,
      };
    } catch (error) {
      console.error('File upload failed:', error);
      throw new Error('Failed to upload file. Please try again.');
    }
  }

  /**
   * Get a signed URL for temporary file access (for private files)
   * @param fileKey - S3 object key
   * @param expiresIn - URL expiration time in seconds (default: 1 hour)
   */
  async getSignedUrl(fileKey: string, expiresIn: number = 3600): Promise<string> {
    try {
      const command = new GetObjectCommand({
        Bucket: this.bucket,
        Key: fileKey,
      });

      return await getSignedUrl(this.s3Client, command, { expiresIn });
    } catch (error) {
      console.error('Failed to generate signed URL:', error);
      throw new Error('Failed to access file');
    }
  }

  /**
   * Delete a file from S3
   * @param fileKey - S3 object key to delete
   */
  async deleteFile(fileKey: string): Promise<void> {
    try {
      const command = new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: fileKey,
      });

      await this.s3Client.send(command);
      console.log('File deleted:', fileKey);
    } catch (error) {
      console.error('File deletion failed:', error);
      throw new Error('Failed to delete file');
    }
  }

  /**
   * Validate file before upload
   */
  private validateFile(file: File): void {
    const maxSize = parseInt(process.env.MAX_FILE_SIZE_MB || '5', 10) * 1024 * 1024;
    const allowedTypes = (process.env.ALLOWED_FILE_TYPES || 'application/pdf,image/png,image/jpeg').split(',');

    if (file.size > maxSize) {
      throw new Error(`File size exceeds maximum allowed size of ${process.env.MAX_FILE_SIZE_MB || 5}MB`);
    }

    if (!allowedTypes.includes(file.type)) {
      throw new Error(`File type ${file.type} is not allowed. Allowed types: ${allowedTypes.join(', ')}`);
    }
  }

  /**
   * Upload concept note (PDF only, max 5MB)
   */
  async uploadConceptNote(file: File): Promise<UploadResult> {
    if (file.type !== 'application/pdf') {
      throw new Error('Concept note must be a PDF file');
    }
    return this.uploadFile(file, 'concept-notes');
  }

  /**
   * Upload logo (PNG/JPEG only, max 2MB)
   */
  async uploadLogo(file: File): Promise<UploadResult> {
    if (!['image/png', 'image/jpeg'].includes(file.type)) {
      throw new Error('Logo must be PNG or JPEG format');
    }
    if (file.size > 2 * 1024 * 1024) {
      throw new Error('Logo size must be less than 2MB');
    }
    return this.uploadFile(file, 'logos');
  }
}

// Singleton instance
export const storageService = new StorageService();
