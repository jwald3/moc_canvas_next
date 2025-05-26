import type { 
    ProjectObject,
    ProjectThemeObject,
    ProjectStatus
} from '@/types/hand_spun_datatypes';

// Helper function to generate a GUID
function generateGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Themes
export const themes: ProjectThemeObject[] = [
    {
        id: generateGuid(),
        name: "Star Wars",
        description: "From a galaxy far, far away - Star Wars LEGO® builds"
    },
    {
        id: generateGuid(),
        name: "Architecture",
        description: "Famous landmarks and architectural wonders"
    },
    {
        id: generateGuid(),
        name: "Marvel",
        description: "Superhero builds from the Marvel universe"
    }
];

// Projects
export const projects: ProjectObject[] = [
    {
        // id: generateGuid(),
        id: "796a9a39-d8d1-4726-85b8-4555ce154c47",
        title: "Imperial Star Destroyer",
        description: "A massive 4,784-piece Imperial Star Destroyer build featuring detailed surface paneling, intricate technical sections, and a display stand.",
        tags: ["Star Wars", "Spaceships", "Custom Build", "Large Scale", "Build", "Sci-Fi"],
        mainImage: {
            id: generateGuid(),
            projectId: generateGuid(),
            url: "/images/star-destroyer.jpg",
        },
        theme: themes[0], // Star Wars theme
        createdAt: new Date("2025-05-11T15:30:00Z"),
        updatedAt: new Date("2025-05-11T15:30:00Z"),
        status: "IN_PROGRESS" as ProjectStatus,
        owner: null,
        avatar: null,
        steps: [
            {
                id: generateGuid(),
                projectId: generateGuid(),
                title: "Bridge Assembly",
                description: "Building the bridge section of the Star Destroyer",
                order: 1,
                images: [
                    {
                        id: generateGuid(),
                        buildStepId: generateGuid(),
                        order: 1,
                        caption: "Reference image of Star Destroyer bridge",
                        url: "/images/star-destroyer-bridge.jpg",
                        type: "reference" as const
                    },
                    {
                        id: generateGuid(),
                        buildStepId: generateGuid(),
                        order: 2,
                        caption: "Progress on bridge construction",
                        url: "/images/lego-star-destroyer-bridge.png",
                        type: "progress" as const
                    }
                ]
            }
        ],
        stats: {
            id: generateGuid(),
            projectId: generateGuid(),
            views: 1250,
            likes: 342,
            comments: 45,
            shares: 67,
            public: true
        }
    },
    {
        id: generateGuid(),
        title: "Taj Mahal Recreation",
        description: "Recreation of the iconic Taj Mahal featuring intricate architectural details, ornate domes, and decorative elements. This 5,923-piece set is a challenging but rewarding build.",
        tags: ["Architecture", "Landmarks", "Historical"],
        mainImage: {
            id: generateGuid(),
            projectId: generateGuid(),
            url: "/images/taj-mahal.jpg",
        },
        theme: themes[1], // Architecture theme
        createdAt: new Date("2025-05-03T09:45:00Z"),
        updatedAt: new Date("2025-05-03T09:45:00Z"),
        status: "IN_PROGRESS" as ProjectStatus,
        owner: "Sarah Johnson",
        avatar: "/api/placeholder/50/50",
        steps: [
            {
                id: generateGuid(),
                projectId: generateGuid(),
                title: "Main Dome Construction",
                description: "Building the central dome and surrounding minarets",
                order: 1,
                images: [
                    {
                        id: generateGuid(),
                        buildStepId: generateGuid(),
                        order: 1,
                        caption: "Reference image of Taj Mahal dome",
                        url: "/images/taj-mahal-dome.jpg"
                    },
                    {
                        id: generateGuid(),
                        buildStepId: generateGuid(),
                        order: 2,
                        caption: "Progress on dome assembly",
                        url: "/images/lego-taj-mahal-dome.jpg"
                    }
                ]
            }
        ],
        stats: {
            id: generateGuid(),
            projectId: generateGuid(),
            views: 892,
            likes: 245,
            comments: 32,
            shares: 41,
            public: true
        }
    },
    {
        id: generateGuid(),
        title: "Avengers Tower",
        description: "Custom-designed Avengers Tower featuring multiple floors, landing pad, and detailed interior with labs and living quarters.",
        tags: ["Marvel", "Superheroes", "Buildings"],
        mainImage: {
            id: generateGuid(),
            projectId: generateGuid(),
            url: "/images/avengers-tower.jpg",
        },
        theme: themes[2], // Marvel theme
        createdAt: new Date("2025-04-10T11:20:00Z"),
        updatedAt: new Date("2025-04-10T11:20:00Z"),
        status: "IN_PROGRESS" as ProjectStatus,
        owner: "Tony Stark",
        avatar: "/api/placeholder/50/50",
        steps: [
            {
                id: generateGuid(),
                projectId: generateGuid(),
                title: "Base Structure",
                description: "Building the foundation and main support structure",
                order: 1,
                images: [
                    {
                        id: generateGuid(),
                        buildStepId: generateGuid(),
                        order: 1,
                        caption: "Reference image of Avengers Tower",
                        url: "/images/avengers-tower-exterior.jpg"
                    },
                    {
                        id: generateGuid(),
                        buildStepId: generateGuid(),
                        order: 2,
                        caption: "Progress on base construction",
                        url: "/images/lego-avengers-tower-exterior.jpg"
                    }
                ]
            }
        ],
        stats: {
            id: generateGuid(),
            projectId: generateGuid(),
            views: 1567,
            likes: 423,
            comments: 89,
            shares: 112,
            public: true
        }
    },
    {
        id: generateGuid(),
        title: "Ancient Roman Colosseum",
        description: "A magnificent recreation of the Ancient Roman Colosseum, featuring authentic architectural details and historically accurate construction techniques. This 9,036-piece build is our most ambitious historical project.",
        tags: ["Architecture", "Historical", "Large Scale"],
        mainImage: {
            id: generateGuid(),
            projectId: generateGuid(),
            url: "/images/colosseum.jpg",
        },
        theme: themes[1], // Architecture theme
        createdAt: new Date("2025-04-04T16:15:00Z"),
        updatedAt: new Date("2025-04-04T16:15:00Z"),
        status: "IN_PROGRESS" as ProjectStatus,
        owner: "Marcus Augustus",
        avatar: "/api/placeholder/50/50",
        steps: [
            {
                id: generateGuid(),
                projectId: generateGuid(),
                title: "Base Structure",
                description: "Laying out the base ring and support structure",
                order: 1,
                images: [
                    {
                        id: generateGuid(),
                        buildStepId: generateGuid(),
                        order: 1,
                        caption: "Reference image of Roman Colosseum",
                        url: "/images/roman-colosseum-exterior.jpg"
                    },
                    {
                        id: generateGuid(),
                        buildStepId: generateGuid(),
                        order: 2,
                        caption: "Progress on base construction",
                        url: "/images/colosseum.jpg"
                    }
                ]
            }
        ],
        stats: {
            id: generateGuid(),
            projectId: generateGuid(),
            views: 2341,
            likes: 567,
            comments: 89,
            shares: 123,
            public: true
        }
    },
    {
        id: generateGuid(),
        title: "Millennium Falcon MOC",
        description: "Building the iconic UCS Millennium Falcon (set #75192). This 7,541-piece build is expected to take about 3 months working on weekends.",
        tags: ["Star Wars", "Spaceships", "Modified"],
        mainImage: {
            id: generateGuid(),
            projectId: generateGuid(),
            url: "/images/millennium-falcon.jpg",
        },
        theme: themes[0], // Star Wars theme
        createdAt: new Date("2025-02-25T14:30:00Z"),
        updatedAt: new Date("2025-02-25T14:30:00Z"),
        status: "IN_PROGRESS" as ProjectStatus,
        owner: "Han Solo",
        avatar: "/api/placeholder/50/50",
        steps: [
            {
                id: generateGuid(),
                projectId: generateGuid(),
                title: "Cockpit Assembly",
                description: "Building the cockpit and connecting to the main frame",
                order: 1,
                images: [
                    {
                        id: generateGuid(),
                        buildStepId: generateGuid(),
                        order: 1,
                        caption: "Reference image of Millennium Falcon cockpit",
                        url: "/images/millennium-falcon-cockpit.png"
                    },
                    {
                        id: generateGuid(),
                        buildStepId: generateGuid(),
                        order: 2,
                        caption: "Progress on cockpit assembly",
                        url: "/images/lego-millennium-falcon-cockpit.png"
                    }
                ]
            }
        ],
        stats: {
            id: generateGuid(),
            projectId: generateGuid(),
            views: 3456,
            likes: 892,
            comments: 156,
            shares: 234,
            public: true
        }
    },
    {
        id: generateGuid(),
        title: "Hogwarts Castle",
        description: "Hogwarts School of Witchcraft and Wizardry in all its magical glory. This 6,020-piece castle features moving staircases, detailed classrooms, and hidden chambers.",
        tags: ["Harry Potter", "Fantasy", "Architecture"],
        mainImage: {
            id: generateGuid(),
            projectId: generateGuid(),
            url: "/images/hogwarts-castle.jpg",
        },
        theme: themes[1], // Architecture theme
        createdAt: new Date("2023-02-17T10:00:00Z"),
        updatedAt: new Date("2023-02-17T10:00:00Z"),
        status: "IN_PROGRESS" as ProjectStatus,
        owner: "Albus Dumbledore",
        avatar: "/api/placeholder/50/50",
        steps: [
            {
                id: generateGuid(),
                projectId: generateGuid(),
                title: "Great Hall",
                description: "Construction of the iconic Great Hall with floating candles",
                order: 1,
                images: [
                    {
                        id: generateGuid(),
                        buildStepId: generateGuid(),
                        order: 1,
                        caption: "Reference image of Hogwarts Great Hall",
                        url: "/images/hogwarts-great-hall.jpg"
                    },
                    {
                        id: generateGuid(),
                        buildStepId: generateGuid(),
                        order: 2,
                        caption: "Progress on Great Hall construction",
                        url: "/images/lego-hogwarts-great-hall.png"
                    }
                ]
            }
        ],
        stats: {
            id: generateGuid(),
            projectId: generateGuid(),
            views: 4567,
            likes: 1234,
            comments: 321,
            shares: 167,
            public: true
        }
    },
    {
        id: generateGuid(),
        title: "Jurassic Park Gates",
        description: "A detailed recreation of the iconic Jurassic Park entrance gates, complete with working lights and authentic weathering effects. Features jungle environment and custom dinosaur sculptures.",
        tags: ["Movies", "Diorama", "Scenery"],
        mainImage: {
            id: generateGuid(),
            projectId: generateGuid(),
            url: "/images/jurassic-park-gates.jpg",
        },
        theme: themes[1], // Architecture theme
        createdAt: new Date("2025-04-16T08:20:00Z"),
        updatedAt: new Date("2025-04-16T08:20:00Z"),
        status: "IN_PROGRESS" as ProjectStatus,
        owner: "Sarah Johnson",
        avatar: "/api/placeholder/50/50",
        steps: [
            {
                id: generateGuid(),
                projectId: generateGuid(),
                title: "Gate Foundation",
                description: "Building the base structure and terrain",
                order: 1,
                images: [
                    {
                        id: generateGuid(),
                        buildStepId: generateGuid(),
                        order: 1,
                        caption: "Reference image of Jurassic Park Gates",
                        url: "/api/placeholder/400/300?text=Gates+Reference"
                    },
                    {
                        id: generateGuid(),
                        buildStepId: generateGuid(),
                        order: 2,
                        caption: "Progress on foundation construction",
                        url: "/api/placeholder/400/300?text=Foundation+Complete"
                    }
                ]
            }
        ],
        stats: {
            id: generateGuid(),
            projectId: generateGuid(),
            views: 1876,
            likes: 432,
            comments: 67,
            shares: 89,
            public: true
        }
    },
    {
        id: generateGuid(),
        title: "Gotham City Skyline",
        description: "A sprawling nighttime cityscape of Gotham City, featuring Wayne Tower, GCPD, and other iconic buildings. Includes working LED lighting system.",
        tags: ["Batman", "DC Comics", "Architecture"],
        mainImage: {
            id: generateGuid(),
            projectId: generateGuid(),
            url: "/images/gotham-skyline.jpg",
        },
        theme: themes[1], // Architecture theme
        createdAt: new Date("2025-02-17T11:15:00Z"),
        updatedAt: new Date("2025-02-17T11:15:00Z"),
        status: "IN_PROGRESS" as ProjectStatus,
        owner: "David Kim",
        avatar: "/api/placeholder/50/50",
        steps: [
            {
                id: generateGuid(),
                projectId: generateGuid(),
                title: "Wayne Tower",
                description: "Constructing the centerpiece Wayne Enterprises building",
                order: 1,
                images: [
                    {
                        id: generateGuid(),
                        buildStepId: generateGuid(),
                        order: 1,
                        caption: "Reference image of Wayne Tower",
                        url: "/api/placeholder/400/300?text=Wayne+Tower+Reference"
                    },
                    {
                        id: generateGuid(),
                        buildStepId: generateGuid(),
                        order: 2,
                        caption: "Progress on tower construction",
                        url: "/api/placeholder/400/300?text=Tower+Progress"
                    }
                ]
            }
        ],
        stats: {
            id: generateGuid(),
            projectId: generateGuid(),
            views: 2345,
            likes: 567,
            comments: 98,
            shares: 145,
            public: true
        }
    },
    {
        id: generateGuid(),
        title: "USS Enterprise NCC-1701",
        description: "Detailed recreation of the USS Enterprise NCC-1701 from Star Trek, featuring detailed engineering section and removable hull panels to show interior details.",
        tags: ["Star Trek", "Spaceships", "Sci-Fi"],
        mainImage: {
            id: generateGuid(),
            projectId: generateGuid(),
            url: "/images/enterprise.jpg",
        },
        theme: themes[0], // Star Wars theme (closest we have for sci-fi)
        createdAt: new Date("2025-04-04T09:30:00Z"),
        updatedAt: new Date("2025-04-04T09:30:00Z"),
        status: "IN_PROGRESS" as ProjectStatus,
        owner: "Elena Rodriguez",
        avatar: "/api/placeholder/50/50",
        steps: [
            {
                id: generateGuid(),
                projectId: generateGuid(),
                title: "Engineering Hull",
                description: "Main engineering section and warp core assembly",
                order: 1,
                images: [
                    {
                        id: generateGuid(),
                        buildStepId: generateGuid(),
                        order: 1,
                        caption: "Reference image of Engineering section",
                        url: "/api/placeholder/400/300?text=Engineering+Reference"
                    },
                    {
                        id: generateGuid(),
                        buildStepId: generateGuid(),
                        order: 2,
                        caption: "Progress on warp core construction",
                        url: "/api/placeholder/400/300?text=Warp+Core+Build"
                    }
                ]
            }
        ],
        stats: {
            id: generateGuid(),
            projectId: generateGuid(),
            views: 3456,
            likes: 789,
            comments: 234,
            shares: 167,
            public: true
        }
    },
    {
        id: generateGuid(),
        title: "Stark Industries HQ",
        description: "Modern interpretation of Stark Industries Headquarters with Tony Stark's workshop, arc reactor testing facility, and Iron Man suit gallery.",
        tags: ["Marvel", "Architecture", "Custom Design"],
        mainImage: {
            id: generateGuid(),
            projectId: generateGuid(),
            url: "/images/stark-industries.jpg",
        },
        theme: themes[2], // Marvel theme
        createdAt: new Date("2025-04-10T13:45:00Z"),
        updatedAt: new Date("2025-04-10T13:45:00Z"),
        status: "IN_PROGRESS" as ProjectStatus,
        owner: "Michael Chen",
        avatar: "/api/placeholder/50/50",
        steps: [
            {
                id: generateGuid(),
                projectId: generateGuid(),
                title: "Main Lobby",
                description: "Grand entrance hall with Arc Reactor display",
                order: 1,
                images: [
                    {
                        id: generateGuid(),
                        buildStepId: generateGuid(),
                        order: 1,
                        caption: "Reference image of Stark Industries lobby",
                        url: "/api/placeholder/400/300?text=Lobby+Reference"
                    },
                    {
                        id: generateGuid(),
                        buildStepId: generateGuid(),
                        order: 2,
                        caption: "Progress on lobby construction",
                        url: "/api/placeholder/400/300?text=Lobby+Build"
                    }
                ]
            }
        ],
        stats: {
            id: generateGuid(),
            projectId: generateGuid(),
            views: 1987,
            likes: 456,
            comments: 78,
            shares: 92,
            public: true
        }
    }
].map(project => {
    // Generate IDs once
    const projectId = project.id || generateGuid(); // Preserve existing ID if present
    const stepIds = project.steps?.map(() => generateGuid()) || [];

    return {
        ...project,
        id: projectId, // Use existing ID if present
        notes: [], // Add this line to include empty notes array
        mainImage: {
            ...project.mainImage,
            id: generateGuid(),
        },
        steps: project.steps?.map((step, index) => {
            const stepId = stepIds[index];
            return {
                ...step,
                id: stepId,
                projectId: projectId,  // Reference parent project
                images: step.images.map(image => ({
                    ...image,
                    id: generateGuid(),
                    buildStepId: stepId  // Reference parent step
                }))
            };
        }),
        stats: {
            ...project.stats,
            id: generateGuid(),
            projectId: projectId  // Reference parent project
        }
    };
}); 