import { HandSpunProject, HandSpunProjectStats, HandSpunBuildStep, HandSpunProjectImage, HandSpunTheme, HandSpunProjectMainImage } from '@prisma/client';

export type ProjectWithRelations = HandSpunProject & {
  stats: HandSpunProjectStats | null;
  steps: (HandSpunBuildStep & {
    images: HandSpunProjectImage[];
  })[];
  theme: HandSpunTheme;
  mainImage: HandSpunProjectMainImage | null;
}; 