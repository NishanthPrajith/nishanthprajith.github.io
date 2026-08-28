import { silverstoneGalleryItems } from './gallery/silverstone';
import { GalleryItem } from './gallery/types';
import { versaillesGalleryItems } from './gallery/versailles';

function seededShuffle<T>(arr: T[], seed: number): T[] {
  const result = [...arr];
  let s = seed;
  const random = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export const galleryItems: GalleryItem[] = seededShuffle<GalleryItem>(
  [...versaillesGalleryItems, ...silverstoneGalleryItems],
  34
);
