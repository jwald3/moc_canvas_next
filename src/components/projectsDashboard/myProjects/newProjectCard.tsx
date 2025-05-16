import { Plus } from 'lucide-react'
import React from "react";
import { useRouter } from 'next/navigation';

const newProjectCard = () => {
    const router = useRouter();
    return (
        <div
            onClick={() => router.push("/projects/new")}
            className="cursor-pointer w-full md:w-1/2 lg:w-1/3 border-2 border-dashed border-orange-400 rounded-xl py-12 my-8 hover:border-orange-500 transition-all group bg-white hover:bg-orange-50 card-shadow-hover"
        >
            <div className="flex flex-col items-center justify-center gap-4">
                <div className="bg-card-gradient rounded-full p-4 group-hover:bg-gradient-hover transition-all">
                    <Plus size={24} className="text-white" />
                </div>
                <span className="text-orange-700 font-medium text-lg">
                    Create New Project
                </span>
            </div>
        </div>
    );
};

export default newProjectCard;
