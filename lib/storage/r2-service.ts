/**
 * Cloudflare R2 Storage Service (FREE: 10GB + unlimited bandwidth!)
 * https://cloudflare.com/products/r2
 * 
 * R2 is S3-compatible, so we can use the AWS SDK
 * 100% compatible with existing storage service
 */

import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';

// Initialize R2 client (S3-compatible)
const r2Client = new S3Client({
  region: 'auto', // R2 uses 'auto' region
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

const BUCKET_NAME = process.env.R2_BUCKET_NAME || 'alx-partnership-files';
const PUBLIC_URL = process.env.R2_PUBLIC_URL; // Optional: for public bucket

/**
 * Upload file to Cloudflare R2 (FREE 10GB)
 */
export async function uploadFile(
  file: File | Buffer,
  folder: string,
  filename?: string
): Promise<{ fileUrl: string; fileKey: string }> {
  const fileKey = `${folder}/${filename || uuidv4()}-${Date.now()}`;
  
  let buffer: Buffer;
  let contentType: string;

  if (file instanceof Buffer) {
    buffer = file;
    contentType = 'application/octet-stream';
  } else {
    buffer = Buffer.from(await file.arrayBuffer());
    contentType = file.type;
  }

  await r2Client.send(
    new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: fileKey,
      Body: buffer,
      ContentType: contentType,
    })
  );

  // If public bucket, use public URL
  const fileUrl = PUBLIC_URL 
    ? `${PUBLIC_URL}/${fileKey}`
    : await getSignedUrl(r2Client, new GetObjectCommand({
        Bucket: BUCKET_NAME,
        Key: fileKey,
      }), { expiresIn: 3600 * 24 * 365 }); // 1 year

  return { fileUrl, fileKey };
}

/**
 * Upload concept note (PDF)
 */
export async function uploadConceptNote(file: File): Promise<{ fileUrl: string; fileKey: string }> {
  // Validate file type
  if (!file.type.includes('pdf')) {
    throw new Error('Only PDF files are allowed for concept notes');
  }

  // Validate file size (5MB max)
  const MAX_SIZE = 5 * 1024 * 1024;
  if (file.size > MAX_SIZE) {
    throw new Error('File size must be less than 5MB');
  }

  return uploadFile(file, 'concept-notes');
}

/**
 * Upload logo (PNG/JPEG)
 */
export async function uploadLogo(file: File): Promise<{ fileUrl: string; fileKey: string }> {
  // Validate file type
  if (!file.type.includes('image/png') && !file.type.includes('image/jpeg')) {
    throw new Error('Only PNG and JPEG images are allowed for logos');
  }

  // Validate file size (2MB max)
  const MAX_SIZE = 2 * 1024 * 1024;
  if (file.size > MAX_SIZE) {
    throw new Error('Logo size must be less than 2MB');
  }

  return uploadFile(file, 'logos');
}

/**
 * Get signed URL for private file
 */
export async function getFileUrl(fileKey: string, expiresIn: number = 3600): Promise<string> {
  // If using public bucket, return public URL
  if (PUBLIC_URL) {
    return `${PUBLIC_URL}/${fileKey}`;
  }

  // Otherwise, generate signed URL
  return getSignedUrl(
    r2Client,
    new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: fileKey,
    }),
    { expiresIn }
  );
}

/**
 * Delete file from R2
 */
export async function deleteFile(fileKey: string): Promise<void> {
  await r2Client.send(
    new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: fileKey,
    })
  );
}

/**
 * Get file metadata
 */
export async function getFileMetadata(fileKey: string): Promise<{
  size: number;
  contentType: string;
  lastModified: Date;
} | null> {
  try {
    const response = await r2Client.send(
      new GetObjectCommand({
        Bucket: BUCKET_NAME,
        Key: fileKey,
      })
    );

    return {
      size: response.ContentLength || 0,
      contentType: response.ContentType || 'application/octet-stream',
      lastModified: response.LastModified || new Date(),
    };
  } catch {
    return null;
  }
}

export const r2StorageService = {
  uploadFile,
  uploadConceptNote,
  uploadLogo,
  getFileUrl,
  deleteFile,
  getFileMetadata,
};

/**
 * Benefits of Cloudflare R2:
 * 
 * ✅ 10GB storage FREE (no credit card for first 10GB)
 * ✅ UNLIMITED bandwidth (no egress fees!)
 * ✅ S3-compatible API (drop-in replacement)
 * ✅ Global CDN included
 * ✅ 99.9% uptime SLA
 * ✅ Built-in DDoS protection
 * 
 * Cost after free tier:
 * - Storage: $0.015/GB/month
 * - Operations: $0.36 per million writes, $0.45 per million reads
 * - Bandwidth: $0 (FREE!)
 * 
 * For comparison, AWS S3:
 * - Storage: $0.023/GB/month (53% more expensive)
 * - Bandwidth: $0.09/GB (vs FREE on R2!)
 * 
 * Savings example (100GB data, 1TB bandwidth):
 * - AWS S3: ~$90/month
 * - R2: ~$1.50/month (98% cheaper!)
 */
