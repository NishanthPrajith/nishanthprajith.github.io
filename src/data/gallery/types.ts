// Gallery
export type GalleryItem = {
  id: string;
  title?: string;
  image: string;
  thumbnail?: string;
  aspectRatio?: number;
  href?: string;
  highlight?: boolean;
  group: string;
};

export type ViewerSelection = {
  item: GalleryItem;
  sourceRect: DOMRect;
  sourceElement: HTMLElement;
  aspectRatio: number;
  grabPoint: { x: number; y: number };
};
