import React from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Bookmark, Share2 } from "lucide-react";
import { Project } from "@/types/project";

interface SingleProjectHeaderProps {
    project: Project;
}

const singleProjectHeader = ({ project }: SingleProjectHeaderProps) => {
    const router = useRouter();

    return (
        <div className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <button
                            className="mr-3 p-2 rounded-full hover:bg-gray-100"
                            onClick={() => router.back()}
                        >
                            <ChevronLeft size={20} className="text-gray-700" />
                        </button>
                        <h1 className="text-xl font-bold text-gray-800">
                            {project.name}
                        </h1>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button className="p-2 rounded-full hover:bg-gray-100">
                            <Bookmark size={20} className="text-gray-700" />
                        </button>
                        <button className="p-2 rounded-full hover:bg-gray-100">
                            <Share2 size={20} className="text-gray-700" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default singleProjectHeader;
