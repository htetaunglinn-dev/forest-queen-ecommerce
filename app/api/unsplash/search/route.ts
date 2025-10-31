/**
 * Server-Side Unsplash Search API Route
 *
 * This route handles all Unsplash search requests server-side,
 * keeping the API key secure and implementing rate limiting and caching.
 */

import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getClientIP, applyRateLimitHeaders, rateLimiter } from '@/lib/rateLimit';
import { withCache } from '@/lib/cache';

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
const UNSPLASH_API_URL = 'https://api.unsplash.com';

// Rate limit: 10 requests per minute per IP
const RATE_LIMIT = 10;
const RATE_WINDOW = 60 * 1000; // 1 minute

// Cache TTL: 24 hours (images don't change frequently)
const CACHE_TTL = 24 * 60 * 60; // 24 hours in seconds

export async function GET(request: NextRequest) {
  // Check rate limit
  const rateLimitResponse = checkRateLimit(request, RATE_LIMIT, RATE_WINDOW);
  if (rateLimitResponse) {
    console.log(`[API] Rate limit exceeded for IP: ${getClientIP(request)}`);
    return rateLimitResponse;
  }

  // Validate API key
  if (!UNSPLASH_ACCESS_KEY) {
    return NextResponse.json(
      { error: 'Unsplash API key not configured' },
      { status: 500 }
    );
  }

  // Get query parameters
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('query');
  const perPage = parseInt(searchParams.get('per_page') || '10', 10);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const orientation = searchParams.get('orientation') || 'squarish';

  // Validate query parameter
  if (!query) {
    return NextResponse.json(
      { error: 'Missing required parameter: query' },
      { status: 400 }
    );
  }

  // Validate pagination parameters
  if (perPage < 1 || perPage > 30) {
    return NextResponse.json(
      { error: 'per_page must be between 1 and 30' },
      { status: 400 }
    );
  }

  try {
    // Create cache key based on request parameters
    const cacheKey = `unsplash:search:${query}:${perPage}:${page}:${orientation}`;

    // Use cached response if available
    const data = await withCache(
      cacheKey,
      async () => {
        // Make request to Unsplash API
        const url = new URL(`${UNSPLASH_API_URL}/search/photos`);
        url.searchParams.append('query', query);
        url.searchParams.append('per_page', perPage.toString());
        url.searchParams.append('page', page.toString());
        url.searchParams.append('orientation', orientation);

        console.log(`[API] Fetching from Unsplash: ${query} (page ${page})`);

        const response = await fetch(url.toString(), {
          headers: {
            'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Unsplash API error: ${response.status} ${response.statusText}`);
        }

        return response.json();
      },
      CACHE_TTL
    );

    // Get rate limit info for headers
    const ip = getClientIP(request);
    const rateLimitInfo = rateLimiter.check(ip, RATE_LIMIT, RATE_WINDOW);

    // Create successful response
    const jsonResponse = NextResponse.json(data);

    // Add rate limit headers
    applyRateLimitHeaders(jsonResponse, rateLimitInfo, RATE_LIMIT);

    return jsonResponse;

  } catch (error) {
    console.error('[API] Unsplash search error:', error);

    return NextResponse.json(
      {
        error: 'Failed to fetch images from Unsplash',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
