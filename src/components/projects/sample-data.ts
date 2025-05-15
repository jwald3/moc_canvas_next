import type { Project as BaseProject } from "@/types/project";

interface ProjectImage {
    id: number;
    type: "reference" | "progress";
    url: string;
}

interface BuildStep {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    images: ProjectImage[];
}

interface ProjectStats {
    totalPieces: number;
    completedPieces: number;
    totalSteps: number;
    completedSteps: number;
}

export interface Project extends BaseProject {
    id: number;
    name: string;
    image: string;
    tags: string[];
    lastUpdated: string;
    owner?: string;
    avatar?: string;
    description?: string;
    progress?: number;
    status?: string;
    stats?: ProjectStats;
    steps?: BuildStep[];
}

export const projects: Project[] = [
    {
        id: 1,
        name: "Imperial Star Destroyer",
        image: "/images/star-destroyer.jpg",
        tags: [
            "Star Wars",
            "Spaceships",
            "Custom Build",
            "Large Scale",
            "Build",
            "Sci-Fi",
        ],
        lastUpdated: "2025-05-11T15:30:00Z",
    },
    {
        id: 2,
        name: "Taj Mahal Recreation",
        image: "/images/taj-mahal.jpg",
        tags: ["Architecture", "Landmarks", "Historical"],
        lastUpdated: "2025-05-03T09:45:00Z",
    },
    {
        id: 3,
        name: "Avengers Tower",
        image: "/images/avengers-tower.jpg",
        tags: ["Marvel", "Superheroes", "Buildings"],
        lastUpdated: "2025-04-10T11:20:00Z",
    },
    {
        id: 4,
        name: "Ancient Roman Colosseum",
        image: "/images/colosseum.jpg",
        tags: ["Architecture", "Historical", "Large Scale"],
        lastUpdated: "2025-04-04T16:15:00Z",
    },
    {
        id: 5,
        name: "Millennium Falcon MOC",
        image: "/images/millennium-falcon.jpg",
        tags: ["Star Wars", "Spaceships", "Modified"],
        lastUpdated: "2025-02-25T14:30:00Z",
    },
    {
        id: 6,
        name: "Hogwarts Castle",
        image: "/images/hogwarts-castle.jpg",
        tags: ["Harry Potter", "Fantasy", "Architecture"],
        lastUpdated: "2023-02-17T10:00:00Z",
    },
];

export const savedProjects: Project[] = [
    {
        id: 7,
        name: "Jurassic Park Gates",
        image: "/images/jurassic-park-gates.jpg",
        tags: ["Movies", "Diorama", "Scenery"],
        lastUpdated: "2025-04-16T08:20:00Z",
        owner: "Sarah Johnson",
        avatar: "/api/placeholder/50/50",
    },
    {
        id: 8,
        name: "Gotham City Skyline",
        image: "/images/gotham-skyline.jpg",
        tags: ["Batman", "DC Comics", "Architecture"],
        lastUpdated: "2025-02-17T11:15:00Z",
        owner: "David Kim",
        avatar: "/api/placeholder/50/50",
    },
    {
        id: 9,
        name: "USS Enterprise NCC-1701",
        image: "/images/enterprise.jpg",
        tags: ["Star Trek", "Spaceships", "Sci-Fi"],
        lastUpdated: "2025-04-04T09:30:00Z",
        owner: "Elena Rodriguez",
        avatar: "/api/placeholder/50/50",
    },
    {
        id: 10,
        name: "Stark Industries HQ",
        image: "/images/stark-industries.jpg",
        tags: ["Marvel", "Architecture", "Custom Design"],
        lastUpdated: "2025-04-10T13:45:00Z",
        owner: "Michael Chen",
    },
];

export const projectDetails: { [key: number]: Partial<Project> } = {
    1: {
        description: "A massive 4,784-piece Imperial Star Destroyer build featuring detailed surface paneling, intricate technical sections, and a display stand.",
        progress: 35,
        status: "In Progress",
        stats: {
            totalPieces: 4784,
            completedPieces: 1674,
            totalSteps: 22,
            completedSteps: 8
        },
        steps: [
            {
                id: 1,
                title: "Bridge Assembly",
                description: "Building the bridge section of the Star Destroyer",
                completed: true,
                images: [
                    {
                        id: 201,
                        type: "reference",
                        url: "/images/star-destroyer-bridge.jpg",
                    },
                    {
                        id: 202,
                            type: "progress",
                            url: "/images/lego-star-destroyer-bridge.png",
                    }
                ]
            },
        ]
    },
    2: {
        description: "Recreation of the iconic Taj Mahal featuring intricate architectural details, ornate domes, and decorative elements. This 5,923-piece set is a challenging but rewarding build.",
        progress: 82,
        status: "Almost Complete",
        stats: {
            totalPieces: 5923,
            completedPieces: 4856,
            totalSteps: 24,
            completedSteps: 20
        },
        steps: [
            {
                id: 1,
                title: "Exterior",
                description: "Setting up the main platform and structural base",
                completed: true,
                images: [
                    {
                        id: 301,
                        type: "reference",
                        url: "/images/taj-mahal-exterior.jpeg",
                    },
                    {
                        id: 302,    
                        type: "progress",
                        url: "/images/taj-mahal.jpg",
                    }
                ]
            },
            {
                id: 2,
                title: "Main Dome Construction",
                description: "Building the central dome and surrounding minarets",
                completed: true,
                images: [
                    {
                        id: 303,
                        type: "reference",
                        url: "/images/taj-mahal-dome.jpg",
                    },
                    {
                        id: 304,
                        type: "progress",
                        url: "/images/lego-taj-mahal-dome.jpg",
                    }
                ]
            }
        ]
    },
    3: {
        description: "Custom-designed Avengers Tower featuring multiple floors, landing pad, and detailed interior with labs and living quarters.",
        progress: 45,
        status: "In Progress",
        stats: {
            totalPieces: 3842,
            completedPieces: 1728,
            totalSteps: 18,
            completedSteps: 8
        },
        steps: [
            {
                id: 1,
                title: "Exterior",
                description: "Building the base structure and lobby area",
                completed: true,
                images: [
                    {
                        id: 401,
                        type: "reference",
                        url: "/images/avengers-tower-exterior.jpg",
                    },
                    {
                        id: 402,
                        type: "progress",
                        url: "/images/lego-avengers-tower-exterior.jpg",
                    }
                ]
            }
        ]
    },
    5: {
        description:
            "Building the iconic UCS Millennium Falcon (set #75192). This 7,541-piece build is expected to take about 3 months working on weekends.",
        progress: 65,
        status: "In Progress",
        stats: {
            totalPieces: 7541,
            completedPieces: 4902,
            totalSteps: 28,
            completedSteps: 18,
        },
        steps: [
            {
                id: 1,
                title: "Exterior",
                description: "Assembling the foundation and main support beams",
                completed: true,
                images: [
                    {
                        id: 101,
                        type: "reference",
                        url: "/images/millennium-falcon-exterior.jpg",
                    },
                    {
                        id: 102,
                        type: "progress",
                        url: "/images/lego-millennium-falcon-exterior.jpg",
                    },
                ],
            },
            {
                id: 2,
                title: "Cockpit Assembly",
                description:
                    "Building the cockpit and connecting to the main frame",
                completed: true,
                images: [
                    {
                        id: 104,
                        type: "reference",
                        url: "/images/millennium-falcon-cockpit.png",
                    },
                    {
                        id: 105,
                        type: "progress",
                        url: "/images/lego-millennium-falcon-cockpit.png",
                    },
                ],
            },
        ],
    },
    4: {
        description: "A magnificent recreation of the Ancient Roman Colosseum, featuring authentic architectural details and historically accurate construction techniques. This 9,036-piece build is our most ambitious historical project.",
        progress: 15,
        status: "Just Started",
        stats: {
            totalPieces: 9036,
            completedPieces: 1356,
            totalSteps: 32,
            completedSteps: 5
        },
        steps: [
            {
                id: 1,
                title: "Exterior",
                description: "Laying out the base ring and support structure",
                completed: true,
                images: [
                    {
                        id: 501,
                        type: "reference",
                        url: "/images/roman-colosseum-exterior.jpg",
                    },
                    {
                        id: 502,
                        type: "progress",
                        url: "/images/colosseum.jpg",
                    }
                ]
            },
            {
                id: 2,
                title: "Interior",
                description: "Building the ground floor archways and columns",
                completed: false,
                images: [
                    {
                        id: 503,
                        type: "reference",
                        url: "/images/roman-colosseum-interior.jpg",
                    },
                    {
                        id: 504,
                        type: "progress",
                        url: "/images/lego-roman-colosseum-interior.png",
                    }
                ]
            }
        ]
    },
    6: {
        description: "Hogwarts School of Witchcraft and Wizardry in all its magical glory. This 6,020-piece castle features moving staircases, detailed classrooms, and hidden chambers.",
        progress: 92,
        status: "Final Details",
        stats: {
            totalPieces: 6020,
            completedPieces: 5538,
            totalSteps: 26,
            completedSteps: 24
        },
        steps: [
            {
                id: 1,
                title: "Exterior",
                description: "Construction of the iconic Great Hall with floating candles",
                completed: true,
                images: [
                    {
                        id: 601,
                        type: "reference",
                        url: "/images/hogwarts-castle-exterior.jpg",
                    },
                    {
                        id: 602,
                        type: "progress",
                        url: "/images/hogwarts-castle.jpg",
                    }
                ]
            },
            {
                id: 2,
                title: "Great Hall",
                description: "Assembly of the magical moving staircase mechanism",
                completed: true,
                images: [
                    {
                        id: 604,
                        type: "reference",
                        url: "/images/hogwarts-great-hall.jpg",
                    },
                    {
                        id: 605,
                        type: "progress",
                        url: "/images/lego-hogwarts-great-hall.png",
                    }
                ]
            },
        ]
    },
    7: {
        description: "A detailed recreation of the iconic Jurassic Park entrance gates, complete with working lights and authentic weathering effects. Features jungle environment and custom dinosaur sculptures.",
        progress: 55,
        status: "In Progress",
        stats: {
            totalPieces: 3245,
            completedPieces: 1785,
            totalSteps: 16,
            completedSteps: 9
        },
        steps: [
            {
                id: 1,
                title: "Gate Foundation",
                description: "Building the base structure and terrain",
                completed: true,
                images: [
                    {
                        id: 701,
                        type: "reference",
                        url: "/api/placeholder/400/300?text=Gates+Reference",
                    },
                    {
                        id: 702,
                        type: "progress",
                        url: "/api/placeholder/400/300?text=Foundation+Complete",
                    }
                ]
            },
            {
                id: 2,
                title: "Torch Mechanisms",
                description: "Installing LED lighting systems for the torches",
                completed: true,
                images: [
                    {
                        id: 703,
                        type: "progress",
                        url: "/api/placeholder/400/300?text=LED+Installation",
                    }
                ]
            }
        ]
    },
    8: {
        description: "A sprawling nighttime cityscape of Gotham City, featuring Wayne Tower, GCPD, and other iconic buildings. Includes working LED lighting system.",
        progress: 78,
        status: "Near Complete",
        stats: {
            totalPieces: 4892,
            completedPieces: 3815,
            totalSteps: 20,
            completedSteps: 16
        },
        steps: [
            {
                id: 1,
                title: "City Grid Layout",
                description: "Setting up the street layout and building foundations",
                completed: true,
                images: [
                    {
                        id: 801,
                        type: "reference",
                        url: "/api/placeholder/400/300?text=Gotham+Layout",
                    },
                    {
                        id: 802,
                        type: "progress",
                        url: "/api/placeholder/400/300?text=Streets+Complete",
                    }
                ]
            },
            {
                id: 2,
                title: "Wayne Tower",
                description: "Constructing the centerpiece Wayne Enterprises building",
                completed: true,
                images: [
                    {
                        id: 803,
                        type: "reference",
                        url: "/api/placeholder/400/300?text=Wayne+Tower+Reference",
                    },
                    {
                        id: 804,
                        type: "progress",
                        url: "/api/placeholder/400/300?text=Tower+Progress",
                    }
                ]
            }
        ]
    },
    9: {
        description: "Detailed recreation of the USS Enterprise NCC-1701 from Star Trek, featuring detailed engineering section and removable hull panels to show interior details.",
        progress: 25,
        status: "Early Stages",
        stats: {
            totalPieces: 5673,
            completedPieces: 1418,
            totalSteps: 24,
            completedSteps: 6
        },
        steps: [
            {
                id: 1,
                title: "Engineering Hull",
                description: "Main engineering section and warp core assembly",
                completed: true,
                images: [
                    {
                        id: 901,
                        type: "reference",
                        url: "/api/placeholder/400/300?text=Engineering+Reference",
                    },
                    {
                        id: 902,
                        type: "progress",
                        url: "/api/placeholder/400/300?text=Warp+Core+Build",
                    }
                ]
            },
            {
                id: 2,
                title: "Saucer Section Frame",
                description: "Primary hull internal support structure",
                completed: false,
                images: [
                    {
                        id: 903,
                        type: "reference",
                        url: "/api/placeholder/400/300?text=Saucer+Reference",
                    }
                ]
            }
        ]
    },
    10: {
        description: "Modern interpretation of Stark Industries Headquarters with Tony Stark's workshop, arc reactor testing facility, and Iron Man suit gallery.",
        progress: 40,
        status: "In Progress",
        stats: {
            totalPieces: 4267,
            completedPieces: 1706,
            totalSteps: 19,
            completedSteps: 8
        },
        steps: [
            {
                id: 1,
                title: "Main Lobby",
                description: "Grand entrance hall with Arc Reactor display",
                completed: true,
                images: [
                    {
                        id: 1001,
                        type: "reference",
                        url: "/api/placeholder/400/300?text=Lobby+Reference",
                    },
                    {
                        id: 1002,
                        type: "progress",
                        url: "/api/placeholder/400/300?text=Lobby+Build",
                    }
                ]
            },
            {
                id: 2,
                title: "Workshop Level",
                description: "Tony's personal workshop and R&D facility",
                completed: false,
                images: [
                    {
                        id: 1003,
                        type: "reference",
                        url: "/api/placeholder/400/300?text=Workshop+Reference",
                    },
                    {
                        id: 1004,
                        type: "progress",
                        url: "/api/placeholder/400/300?text=Workshop+Layout",
                    }
                ]
            }
        ]
    }
};
