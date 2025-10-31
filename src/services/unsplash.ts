/**
 * Unsplash API Service for Camping & Hiking Gear Images
 *
 * This service provides functions to fetch high-quality camping and hiking gear
 * images from Unsplash API.
 *
 * SECURITY: All API calls now go through server-side routes (/api/unsplash/*)
 * to protect the API key and implement rate limiting + caching.
 */

// Use our secure API routes instead of calling Unsplash directly
const API_BASE_URL = '/api/unsplash';

export interface UnsplashImage {
  id: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  alt_description: string | null;
  description: string | null;
  user: {
    name: string;
    username: string;
    links: {
      html: string;
    };
  };
  links: {
    html: string;
    download_location: string;
  };
}

export interface UnsplashSearchResponse {
  total: number;
  total_pages: number;
  results: UnsplashImage[];
}

/**
 * Predefined camping and hiking gear search queries
 */
export const CAMPING_QUERIES = {
  // Product categories
  TENTS: ['camping tent', 'backpacking tent', 'outdoor tent'],
  SLEEPING_GEAR: ['sleeping bag camping', 'camping mattress', 'camping pillow'],
  BACKPACKS: ['hiking backpack', 'camping backpack', 'outdoor backpack'],
  COOKING: ['camping stove', 'camping cookware', 'outdoor cooking'],
  FOOTWEAR: ['hiking boots', 'trail running shoes', 'outdoor footwear'],
  ACCESSORIES: ['camping lantern', 'camping gear', 'hiking accessories'],

  // General camping/hiking
  GENERAL_CAMPING: ['camping equipment', 'camping gear', 'outdoor adventure'],
  HIKING: ['hiking trail', 'mountain hiking', 'outdoor hiking'],
} as const;

/**
 * Search for camping/hiking images on Unsplash
 * Now uses secure server-side API route with caching and rate limiting
 * @param query - Search query (use CAMPING_QUERIES for predefined queries)
 * @param perPage - Number of results per page (default: 10, max: 30)
 * @param page - Page number (default: 1)
 */
export async function searchUnsplashImages(
  query: string,
  perPage: number = 10,
  page: number = 1
): Promise<UnsplashSearchResponse> {
  const url = new URL(`${API_BASE_URL}/search`, window.location.origin);
  url.searchParams.append('query', query);
  url.searchParams.append('per_page', perPage.toString());
  url.searchParams.append('page', page.toString());
  url.searchParams.append('orientation', 'squarish');

  const response = await fetch(url.toString());

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || `API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Get a random camping/hiking image from Unsplash
 * Now uses secure server-side API route with caching and rate limiting
 * @param query - Search query to filter random images (optional)
 * @param count - Number of random images to return (default: 1, max: 30)
 */
export async function getRandomUnsplashImage(
  query?: string,
  count: number = 1
): Promise<UnsplashImage | UnsplashImage[]> {
  const url = new URL(`${API_BASE_URL}/random`, window.location.origin);
  if (query) {
    url.searchParams.append('query', query);
  }
  url.searchParams.append('count', count.toString());
  url.searchParams.append('orientation', 'squarish');

  const response = await fetch(url.toString());

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || `API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Get the optimized image URL with specific dimensions
 * Works with Next.js Image component
 * @param image - Unsplash image object or raw URL
 * @param width - Desired width
 * @param height - Desired height (optional)
 * @param quality - Image quality (default: 80)
 */
export function getOptimizedImageUrl(
  image: UnsplashImage | string,
  width: number,
  height?: number,
  quality: number = 80
): string {
  const rawUrl = typeof image === 'string' ? image : image.urls.raw;
  const url = new URL(rawUrl);

  url.searchParams.append('w', width.toString());
  if (height) {
    url.searchParams.append('h', height.toString());
    url.searchParams.append('fit', 'crop');
  }
  url.searchParams.append('q', quality.toString());
  url.searchParams.append('fm', 'jpg');
  url.searchParams.append('auto', 'format');

  return url.toString();
}

/**
 * Get attribution text for an Unsplash image
 * Required by Unsplash API guidelines
 * @param image - Unsplash image object
 */
export function getImageAttribution(image: UnsplashImage): string {
  return `Photo by ${image.user.name} on Unsplash`;
}

/**
 * Get the Unsplash user profile URL with UTM parameters
 * @param image - Unsplash image object
 */
export function getUserProfileUrl(image: UnsplashImage): string {
  return `${image.user.links.html}?utm_source=forest_queen&utm_medium=referral`;
}

/**
 * Get the Unsplash photo page URL with UTM parameters
 * @param image - Unsplash image object
 */
export function getPhotoPageUrl(image: UnsplashImage): string {
  return `${image.links.html}?utm_source=forest_queen&utm_medium=referral`;
}

/**
 * Trigger a download tracking event
 * Required by Unsplash API guidelines when displaying images
 * NOTE: This function is deprecated for client-side use.
 * Download tracking should be handled server-side to protect the API key.
 * @param downloadLocation - The download_location URL from the image object
 * @deprecated Use server-side download tracking instead
 */
export async function triggerDownload(downloadLocation: string): Promise<void> {
  console.warn('[Unsplash] triggerDownload is deprecated. Implement server-side download tracking.');
  // Download tracking should be implemented server-side
  // For now, this is a no-op to avoid exposing the API key
  return;
}

/**
 * Helper to get a specific image for a product category
 * @param category - Product category name
 * @param index - Index to select from multiple options (default: 0)
 */
export async function getImageForCategory(
  category: string,
  index: number = 0
): Promise<UnsplashImage | null> {
  const categoryLower = category.toLowerCase();
  let query = 'camping gear'; // Default fallback

  // Map categories to search queries
  if (categoryLower.includes('tent')) {
    query = CAMPING_QUERIES.TENTS[index % CAMPING_QUERIES.TENTS.length];
  } else if (categoryLower.includes('sleeping')) {
    query = CAMPING_QUERIES.SLEEPING_GEAR[index % CAMPING_QUERIES.SLEEPING_GEAR.length];
  } else if (categoryLower.includes('backpack') || categoryLower.includes('bag')) {
    query = CAMPING_QUERIES.BACKPACKS[index % CAMPING_QUERIES.BACKPACKS.length];
  } else if (categoryLower.includes('cooking')) {
    query = CAMPING_QUERIES.COOKING[index % CAMPING_QUERIES.COOKING.length];
  } else if (categoryLower.includes('footwear') || categoryLower.includes('shoe')) {
    query = CAMPING_QUERIES.FOOTWEAR[index % CAMPING_QUERIES.FOOTWEAR.length];
  } else if (categoryLower.includes('accessories')) {
    query = CAMPING_QUERIES.ACCESSORIES[index % CAMPING_QUERIES.ACCESSORIES.length];
  }

  try {
    const response = await searchUnsplashImages(query, 1, 1);
    return response.results[0] || null;
  } catch (error) {
    console.error('Error fetching image for category:', error);
    return null;
  }
}
