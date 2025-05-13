import type { Project } from "@/types/project";

export const projects: Project[] = [
    {
        id: 1,
        name: "Website Redesign",
        image: "/images/app-image-demo.jpg",
        tags: ["Web", "Design", "UI/UX"],
        lastUpdated: "2 days ago",
    },
    {
        id: 2,
        name: "Mobile App Development",
        image: "/images/app-image-demo.jpg",
        tags: ["Mobile", "React Native", "iOS"],
        lastUpdated: "5 days ago",
    },
    {
        id: 3,
        name: "Brand Identity",
        image: "/images/app-image-demo.jpg",
        tags: ["Branding", "Logo", "Design"],
        lastUpdated: "1 week ago",
    },
    {
        id: 4,
        name: "E-commerce Platform",
        image: "/images/app-image-demo.jpg",
        tags: ["Web", "E-commerce", "React"],
        lastUpdated: "2 weeks ago",
    },
    {
        id: 5,
        name: "Marketing Campaign",
        image: "/images/app-image-demo.jpg",
        tags: ["Marketing", "Social Media"],
        lastUpdated: "3 weeks ago",
    },
    {
        id: 6,
        name: "Data Visualization Dashboard",
        image: "/images/app-image-demo.jpg",
        tags: ["Data", "Charts", "Analytics"],
        lastUpdated: "1 month ago",
    },
];

export const savedProjects: Project[] = [
    {
        id: 7,
        name: "CRM System",
        image: "/images/app-image-demo.jpg",
        tags: ["SaaS", "Enterprise", "UI"],
        lastUpdated: "3 days ago",
        owner: "Sarah Johnson",
        avatar: "/api/placeholder/50/50",
    },
    {
        id: 8,
        name: "Portfolio Website",
        image: "/images/app-image-demo.jpg",
        tags: ["Portfolio", "Creative", "Personal"],
        lastUpdated: "1 week ago",
        owner: "Michael Chen",
        avatar: "/api/placeholder/50/50",
    },
    {
        id: 9,
        name: "AI Research Dashboard",
        image: "/images/app-image-demo.jpg",
        tags: ["AI", "Machine Learning", "Research"],
        lastUpdated: "2 weeks ago",
        owner: "Elena Rodriguez",
        avatar: "/api/placeholder/50/50",
    },
    {
        id: 10,
        name: "Productivity App",
        image: "/images/app-image-demo.jpg",
        tags: ["Productivity", "Mobile", "Flutter"],
        lastUpdated: "1 month ago",
        owner: "David Kim",
        avatar: "/api/placeholder/50/50",
    },
];
