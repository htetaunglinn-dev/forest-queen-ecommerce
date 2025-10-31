import React from 'react';
import { UnsplashImage } from '@/src/services/unsplash';

interface UnsplashAttributionProps {
  image?: UnsplashImage;
  photographerName?: string;
  photographerUsername?: string;
  className?: string;
  variant?: 'inline' | 'overlay';
}

/**
 * UnsplashAttribution Component
 *
 * Displays photographer attribution for Unsplash images.
 * Required by Unsplash API guidelines.
 *
 * @param image - Full Unsplash image object (preferred)
 * @param photographerName - Photographer name (if image object not available)
 * @param photographerUsername - Photographer username (if image object not available)
 * @param className - Additional CSS classes
 * @param variant - Display variant: 'inline' or 'overlay' (default: 'inline')
 */
export function UnsplashAttribution({
  image,
  photographerName,
  photographerUsername,
  className = '',
  variant = 'inline',
}: UnsplashAttributionProps) {
  // Extract photographer info from image object or use direct props
  const name = image?.user.name || photographerName;
  const username = image?.user.username || photographerUsername;

  if (!name || !username) {
    return null;
  }

  const profileUrl = image?.user.links.html
    ? `${image.user.links.html}?utm_source=forest_queen&utm_medium=referral`
    : `https://unsplash.com/@${username}?utm_source=forest_queen&utm_medium=referral`;

  const unsplashUrl = 'https://unsplash.com/?utm_source=forest_queen&utm_medium=referral';

  const baseClasses = variant === 'overlay'
    ? 'absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[10px] px-2 py-1 backdrop-blur-sm'
    : 'text-xs text-gray-500 dark:text-gray-400';

  return (
    <div className={`${baseClasses} ${className}`}>
      Photo by{' '}
      <a
        href={profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
      >
        {name}
      </a>
      {' '}on{' '}
      <a
        href={unsplashUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
      >
        Unsplash
      </a>
    </div>
  );
}

/**
 * Compact version for product cards (just photographer name)
 */
export function UnsplashAttributionCompact({
  image,
  photographerName,
  photographerUsername,
  className = '',
}: Omit<UnsplashAttributionProps, 'variant'>) {
  const name = image?.user.name || photographerName;
  const username = image?.user.username || photographerUsername;

  if (!name || !username) {
    return null;
  }

  const profileUrl = image?.user.links.html
    ? `${image.user.links.html}?utm_source=forest_queen&utm_medium=referral`
    : `https://unsplash.com/@${username}?utm_source=forest_queen&utm_medium=referral`;

  return (
    <a
      href={profileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`text-[10px] text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors ${className}`}
      title={`Photo by ${name} on Unsplash`}
    >
      📷 {name}
    </a>
  );
}

export default UnsplashAttribution;
