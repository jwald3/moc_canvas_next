import { Project as PrismaProject, ProjectStats, BuildStep, ProjectImage } from '@prisma/client';

export type Project = PrismaProject & {
    stats?: ProjectStats | null;
    steps?: (BuildStep & {
        images: ProjectImage[];
    })[];
}; 