export interface ProjectObject {
    id: string;
    title: string;
    description: string;
    tags: string[];
    theme: ProjectThemeObject;
    createdAt: Date;
    updatedAt: Date;
    status: ProjectStatus;
    owner: string | null;
    avatar: string | null;
    steps: ProjectBuildStepObject[];
    stats: ProjectStatsObject;
    mainImage?: ProjectImageObject;
}

// Using a union type for better type safety
export type ProjectStatus = 
    | "planning"
    | "in progress"
    | "on hold"
    | "completed"
    | "cancelled";

export interface ProjectBuildStepObject {
    id: string;
    projectId: string;
    title: string;
    description: string;
    order: number;
    images: ProjectImageObject[];
}

export interface ProjectImageObject {
    id: string;
    buildStepId: string;
    order: number;
    caption: string;
    url: string;
    type?: "reference" | "progress"; // Optional type for image categorization
}

export interface ProjectThemeObject {
    id: string;
    name: string;
    description: string;
    iconType?: string; 
    color?: string; 
}

export interface ProjectStatsObject {
    id: string;
    projectId: string;
    views: number;
    likes: number;
    comments: number;
    shares: number;
    public: boolean;
}
