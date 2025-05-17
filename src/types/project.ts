import { HandSpunProject as PrismaProject, HandSpunProjectStats, HandSpunBuildStep, HandSpunProjectImage } from '@prisma/client';

export type Project = PrismaProject & {
    stats?: HandSpunProjectStats | null;
    steps?: (HandSpunBuildStep & {
        images: HandSpunProjectImage[];
    })[];
}; 