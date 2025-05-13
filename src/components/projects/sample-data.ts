import type { Project } from "@/types/project";

export const projects: Project[] = [
    {
        id: 1,
        name: "Website Redesign",
        image: "/images/app-image-demo.jpg",
        tags: ["Web", "Design", "UI/UX"],
        lastUpdated: "2025-05-11T15:30:00Z",
    },
    {
        id: 2,
        name: "Mobile App Development",
        image: "/images/app-image-demo.jpg",
        tags: ["Mobile", "React Native", "iOS"],
        lastUpdated: "2025-05-03T09:45:00Z",
    },
    {
        id: 3,
        name: "Brand Identity",
        image: "/images/app-image-demo.jpg",
        tags: ["Branding", "Logo", "Design"],
        lastUpdated: "2025-04-10T11:20:00Z",
    },
    {
        id: 4,
        name: "E-commerce Platform",
        image: "/images/app-image-demo.jpg",
        tags: ["Web", "E-commerce", "React"],
        lastUpdated: "2025-04-04T16:15:00Z",
    },
    {
        id: 5,
        name: "Marketing Campaign",
        image: "/images/app-image-demo.jpg",
        tags: ["Marketing", "Social Media"],
        lastUpdated: "2025-02-25T14:30:00Z",
    },
    {
        id: 6,
        name: "Data Visualization Dashboard",
        image: "/images/app-image-demo.jpg",
        tags: ["Data", "Charts", "Analytics"],
        lastUpdated: "2023-02-17T10:00:00Z",
    },
];

export const savedProjects: Project[] = [
    {
        id: 7,
        name: "CRM System",
        image: "/images/app-image-demo.jpg",
        tags: ["SaaS", "Enterprise", "UI"],
        lastUpdated: "2025-04-16T08:20:00Z",
        owner: "Sarah Johnson",
        avatar: "/api/placeholder/50/50",
    },
    {
        id: 8,
        name: "Portfolio Website",
        image: "/images/app-image-demo.jpg",
        tags: ["Portfolio", "Creative", "Personal"],
        lastUpdated: "2025-04-10T13:45:00Z",
        owner: "Michael Chen",
        avatar: "/api/placeholder/50/50",
    },
    {
        id: 9,
        name: "AI Research Dashboard",
        image: "/images/app-image-demo.jpg",
        tags: ["AI", "Machine Learning", "Research"],
        lastUpdated: "2025-04-04T09:30:00Z",
        owner: "Elena Rodriguez",
        avatar: "/api/placeholder/50/50",
    },
    {
        id: 10,
        name: "Productivity App",
        image: "/images/app-image-demo.jpg",
        tags: ["Productivity", "Mobile", "Flutter"],
        lastUpdated: "2025-02-17T11:15:00Z",
        owner: "David Kim",
        avatar: "/api/placeholder/50/50",
    },
];
