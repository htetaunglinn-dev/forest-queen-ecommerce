/**
 * Rate Limiting Utility
 *
 * Prevents API abuse by limiting the number of requests per IP address
 * within a specified time window.
 */

import { NextRequest, NextResponse } from 'next/server';

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

class RateLimiter {
  private requests: Map<string, RateLimitEntry> = new Map();
  private cleanupInterval: NodeJS.Timeout | null = null;

  constructor() {
    // Cleanup expired entries every minute
    this.cleanupInterval = setInterval(() => this.cleanup(), 60 * 1000);
  }

  /**
   * Check if a request should be rate limited
   * @param identifier - Unique identifier (usually IP address)
   * @param limit - Maximum requests allowed in the window
   * @param windowMs - Time window in milliseconds
   * @returns Object with allowed status and remaining requests
   */
  check(
    identifier: string,
    limit: number = 10,
    windowMs: number = 60 * 1000 // 1 minute default
  ): { allowed: boolean; remaining: number; resetTime: number } {
    const now = Date.now();
    const entry = this.requests.get(identifier);

    // No previous requests or window expired
    if (!entry || now > entry.resetTime) {
      const resetTime = now + windowMs;
      this.requests.set(identifier, {
        count: 1,
        resetTime,
      });

      return {
        allowed: true,
        remaining: limit - 1,
        resetTime,
      };
    }

    // Increment request count
    entry.count++;

    // Check if limit exceeded
    if (entry.count > limit) {
      return {
        allowed: false,
        remaining: 0,
        resetTime: entry.resetTime,
      };
    }

    return {
      allowed: true,
      remaining: limit - entry.count,
      resetTime: entry.resetTime,
    };
  }

  /**
   * Reset rate limit for a specific identifier
   * @param identifier - Unique identifier
   */
  reset(identifier: string): void {
    this.requests.delete(identifier);
  }

  /**
   * Clear all rate limit data
   */
  clear(): void {
    this.requests.clear();
  }

  /**
   * Remove expired entries
   */
  private cleanup(): void {
    const now = Date.now();
    const keysToDelete: string[] = [];

    this.requests.forEach((entry, key) => {
      if (now > entry.resetTime) {
        keysToDelete.push(key);
      }
    });

    keysToDelete.forEach(key => this.requests.delete(key));

    if (keysToDelete.length > 0) {
      console.log(`[RateLimit] Cleaned up ${keysToDelete.length} expired entries`);
    }
  }

  /**
   * Get statistics about current rate limits
   */
  getStats() {
    return {
      activeIPs: this.requests.size,
      entries: Array.from(this.requests.entries()).map(([ip, data]) => ({
        ip,
        count: data.count,
        expiresIn: Math.max(0, data.resetTime - Date.now()),
      })),
    };
  }

  /**
   * Cleanup on shutdown
   */
  destroy() {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
    this.clear();
  }
}

// Export singleton instance
export const rateLimiter = new RateLimiter();

/**
 * Get client IP address from request
 * @param request - Next.js request object
 * @returns IP address or 'unknown'
 */
export function getClientIP(request: NextRequest): string {
  // Try to get IP from various headers (for proxies/load balancers)
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP.trim();
  }

  // Fallback to unknown if no IP headers are present
  return 'unknown';
}

/**
 * Middleware helper for rate limiting API routes
 * @param request - Next.js request object
 * @param limit - Maximum requests per window
 * @param windowMs - Time window in milliseconds
 * @returns NextResponse if rate limited, null otherwise
 */
export function checkRateLimit(
  request: NextRequest,
  limit: number = 10,
  windowMs: number = 60 * 1000
): NextResponse | null {
  const ip = getClientIP(request);
  const result = rateLimiter.check(ip, limit, windowMs);

  if (!result.allowed) {
    const resetIn = Math.ceil((result.resetTime - Date.now()) / 1000);

    return NextResponse.json(
      {
        error: 'Too many requests',
        message: `Rate limit exceeded. Please try again in ${resetIn} seconds.`,
        retryAfter: resetIn,
      },
      {
        status: 429,
        headers: {
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': result.resetTime.toString(),
          'Retry-After': resetIn.toString(),
        },
      }
    );
  }

  return null;
}

/**
 * Apply rate limit headers to a response
 * @param response - NextResponse to modify
 * @param result - Rate limit check result
 * @param limit - Maximum requests per window
 */
export function applyRateLimitHeaders(
  response: NextResponse,
  result: { remaining: number; resetTime: number },
  limit: number
): void {
  response.headers.set('X-RateLimit-Limit', limit.toString());
  response.headers.set('X-RateLimit-Remaining', result.remaining.toString());
  response.headers.set('X-RateLimit-Reset', result.resetTime.toString());
}

export default rateLimiter;
