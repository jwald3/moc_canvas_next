export interface Project {
  id: number;
  name: string;
  image: string;
  tags: string[];
  lastUpdated: string;
  owner?: string;
  avatar?: string;
} 