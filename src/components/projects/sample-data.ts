import type { Project } from "@/types/project";

export const projects: Project[] = [
    {
        id: 1,
        name: "Imperial Star Destroyer",
        image: "/images/app-image-demo.jpg",
        tags: ["Star Wars", "Spaceships", "Custom Build", "Large Scale", "Build", "Sci-Fi"],
        lastUpdated: "2025-05-11T15:30:00Z",
    },
    {
        id: 2,
        name: "Taj Mahal Recreation",
        image: "/images/app-image-demo.jpg",
        tags: ["Architecture", "Landmarks", "Historical"],
        lastUpdated: "2025-05-03T09:45:00Z",
    },
    {
        id: 3,
        name: "Avengers Tower",
        image: "/images/app-image-demo.jpg",
        tags: ["Marvel", "Superheroes", "Buildings"],
        lastUpdated: "2025-04-10T11:20:00Z",
    },
    {
        id: 4,
        name: "Ancient Roman Colosseum",
        image: "/images/app-image-demo.jpg",
        tags: ["Architecture", "Historical", "Large Scale"],
        lastUpdated: "2025-04-04T16:15:00Z",
    },
    {
        id: 5,
        name: "Millennium Falcon MOC",
        image: "/images/app-image-demo.jpg",
        tags: ["Star Wars", "Spaceships", "Modified"],
        lastUpdated: "2025-02-25T14:30:00Z",
    },
    {
        id: 6,
        name: "Hogwarts Castle",
        image: "/images/app-image-demo.jpg",
        tags: ["Harry Potter", "Fantasy", "Architecture"],
        lastUpdated: "2023-02-17T10:00:00Z",
    },
];

export const savedProjects: Project[] = [
    {
        id: 7,
        name: "Jurassic Park Gates",
        image: "/images/app-image-demo.jpg",
        tags: ["Movies", "Diorama", "Scenery"],
        lastUpdated: "2025-04-16T08:20:00Z",
        owner: "Sarah Johnson",
        avatar: "/api/placeholder/50/50",
    },
    {
        id: 8,
        name: "Stark Industries HQ",
        image: "/images/app-image-demo.jpg",
        tags: ["Marvel", "Architecture", "Custom Design"],
        lastUpdated: "2025-04-10T13:45:00Z",
        owner: "Michael Chen",
        avatar: "/api/placeholder/50/50",
    },
    {
        id: 9,
        name: "USS Enterprise NCC-1701",
        image: "/images/app-image-demo.jpg",
        tags: ["Star Trek", "Spaceships", "Sci-Fi"],
        lastUpdated: "2025-04-04T09:30:00Z",
        owner: "Elena Rodriguez",
        avatar: "/api/placeholder/50/50",
    },
    {
        id: 10,
        name: "Gotham City Skyline",
        image: "/images/app-image-demo.jpg",
        tags: ["Batman", "DC Comics", "Architecture"],
        lastUpdated: "2025-02-17T11:15:00Z",
        owner: "David Kim",
        avatar: "/api/placeholder/50/50",
    },
];
