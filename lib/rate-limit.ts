import { prisma } from '@/lib/db/prisma';

/**
 * Rate Limiting Service
 * Prevents abuse of public endpoints
 */

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: Date;
}

/**
 * Check if action is rate limited
 * @param identifier - IP address or email
 * @param action - Action type (e.g., 'submit_form')
 * @param maxAttempts - Maximum attempts per window (default: 5)
 * @param windowMinutes - Time window in minutes (default: 60)
 */
export async function rateLimit(
  identifier: string,
  action: string,
  maxAttempts: number = 5,
  windowMinutes: number = 60
): Promise<RateLimitResult> {
  const now = new Date();
  const windowStart = new Date(now.getTime() - windowMinutes * 60 * 1000);
  const expiresAt = new Date(now.getTime() + windowMinutes * 60 * 1000);

  // Clean up expired entries
  await prisma.rateLimit.deleteMany({
    where: {
      expiresAt: { lt: now },
    },
  });

  // Find or create rate limit record
  const existing = await prisma.rateLimit.findFirst({
    where: {
      identifier,
      action,
      windowStart: { gte: windowStart },
    },
  });

  if (existing) {
    if (existing.count >= maxAttempts) {
      return {
        allowed: false,
        remaining: 0,
        resetAt: existing.expiresAt,
      };
    }

    // Increment count
    await prisma.rateLimit.update({
      where: { id: existing.id },
      data: { count: existing.count + 1 },
    });

    return {
      allowed: true,
      remaining: maxAttempts - existing.count - 1,
      resetAt: existing.expiresAt,
    };
  }

  // Create new rate limit record
  await prisma.rateLimit.create({
    data: {
      identifier,
      action,
      count: 1,
      windowStart: now,
      expiresAt,
    },
  });

  return {
    allowed: true,
    remaining: maxAttempts - 1,
    resetAt: expiresAt,
  };
}

/**
 * Reset rate limit for identifier (admin use)
 */
export async function resetRateLimit(identifier: string, action: string): Promise<void> {
  await prisma.rateLimit.deleteMany({
    where: {
      identifier,
      action,
    },
  });
}
