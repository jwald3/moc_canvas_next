import { Search } from "lucide-react";
import React from "react";
import { useProjectContext } from "@/contexts/ProjectContext";
import { useUser } from "@clerk/nextjs";
import SignInPromptCard from "../signInPromptCard";

const NoMyProjectsCard = () => {
    const { activeTags, searchQuery } = useProjectContext();
    const { isSignedIn } = useUser();

    if (!isSignedIn) {
        return (
            <SignInPromptCard
                title="Sign in to see your projects"
                description="Create an account or sign in to start building and managing your own projects."
            />
        );
    }

    return (
        <div className="bg-white rounded-lg p-6 shadow-sm text-center border border-gray-200 mb-6">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Search size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
                No projects found
            </h3>
            <p className="text-gray-500 mb-4">
                {activeTags.length > 0 || searchQuery
                    ? "Try adjusting your filters or search terms."
                    : "Start creating projects to see them here."}
            </p>
        </div>
    );
};

export default NoMyProjectsCard;
