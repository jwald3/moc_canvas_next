import { HandSpunProject, HandSpunProjectStats, HandSpunBuildStep, HandSpunProjectImage } from '@prisma/client';

export type ProjectWithRelations = HandSpunProject & {
  stats: HandSpunProjectStats | null;
  steps: (HandSpunBuildStep & {
    images: HandSpunProjectImage[];
  })[];
}; 