import { prisma } from "@/lib/prisma";
import ExploreThemes from "./ExploreThemes";

const ExploreThemesServer = async () => {
    const themes = await prisma.handSpunTheme.findMany({
        include: {
            projects: true,
        },
    });

    const popularThemes = themes.sort((a, b) => b.projects.length - a.projects.length).slice(0, 3);

    return <ExploreThemes themes={popularThemes} />;
};

export default ExploreThemesServer; 