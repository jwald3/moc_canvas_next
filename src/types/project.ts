export interface Project {
  id: number;
  name: string;
  image: string;
  description?: string;
  tags: string[];
  lastUpdated: string;
  owner?: string;
  avatar?: string;
} 