import { Plus } from 'lucide-react'
import React from "react";
import { useRouter } from 'next/navigation';

const NewProjectCard = () => {
    const router = useRouter();
    return (
        <div
            onClick={() => router.push("/projects/new")}
            className="cursor-pointer w-full md:w-1/2 lg:w-1/3 border-2 border-dashed border-[#da5249] rounded-xl py-12 my-8 hover:border-[#da5249] transition-all duration-300 group bg-white hover:bg-[#da5249] card-shadow-hover hover:scale-[1.02]"
        >
            <div className="flex flex-col items-center justify-center gap-4">
                <div className="bg-card-gradient rounded-full p-4 group-hover:bg-gradient-hover transition-all duration-300">
                    <Plus size={24} className="text-white" />
                </div>
                <span className="text-[#da5249] font-medium text-lg group-hover:text-white transition-colors duration-300">
                    Create New Project
                </span>
            </div>
        </div>
    );
};

export default NewProjectCard;
