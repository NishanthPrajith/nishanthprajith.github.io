import { CarouselCardItem } from '../data/types';

const COLUMN_WIDTH_PX = 350;
/** Match a tall portrait column (~2:3 at 350px wide). */
const TARGET_COLUMN_HEIGHT_PX = COLUMN_WIDTH_PX / 0.6667;

function getPhotoHeight(item: CarouselCardItem, width = COLUMN_WIDTH_PX) {
  const aspectRatio = item.photo?.aspectRatio ?? 4 / 5;
  return width / aspectRatio;
}

function isStackableLandscape(item: CarouselCardItem) {
  const aspectRatio = item.photo?.aspectRatio ?? 4 / 5;
  return aspectRatio >= 1;
}

export function groupGalleryCarouselStacks(
  items: CarouselCardItem[],
  stackGap: number
): CarouselCardItem[][] {
  const stacks: CarouselCardItem[][] = [];
  let index = 0;

  while (index < items.length) {
    const current = items[index];
    const currentHeight = getPhotoHeight(current);

    if (
      !isStackableLandscape(current) ||
      currentHeight > TARGET_COLUMN_HEIGHT_PX
    ) {
      stacks.push([current]);
      index += 1;
      continue;
    }

    const next = items[index + 1];
    if (next && isStackableLandscape(next)) {
      const stackedHeight = currentHeight + stackGap + getPhotoHeight(next);

      if (stackedHeight <= TARGET_COLUMN_HEIGHT_PX) {
        stacks.push([current, next]);
        index += 2;
        continue;
      }
    }

    stacks.push([current]);
    index += 1;
  }

  return stacks;
}
