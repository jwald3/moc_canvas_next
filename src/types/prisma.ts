import { Project, ProjectStats, BuildStep, ProjectImage } from '@prisma/client';

export type ProjectWithRelations = Project & {
  stats: ProjectStats | null;
  steps: (BuildStep & {
    images: ProjectImage[];
  })[];
}; 