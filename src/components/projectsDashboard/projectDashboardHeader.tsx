import React from "react";
import { useRouter } from "next/navigation";

const ProjectDashboardHeader = () => {
    const router = useRouter();

    const handleCreateProject = () => {
        router.push('/projects/new');
    }

    return (
        <div className="relative flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6 mb-8">
            {/* Dynamic background elements */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute -right-16 top-0 w-48 h-48 rounded-full 
                              bg-gradient-to-br from-[#da5249]/20 to-[#da5249]/5 
                              animate-float blur-2xl"></div>
                <div className="absolute left-1/4 -bottom-8 w-32 h-32 rounded-full 
                              bg-gradient-to-tr from-[#da5249]/15 to-[#da5249]/5 
                              animate-float-slow blur-xl"></div>
            </div>

            <div className="w-full sm:w-auto">
                <div className="relative group">
                    <h1 className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] mb-3 
                                 transition-transform group-hover:-translate-x-2">
                        Project Dashboard
                    </h1>
                    <div className="h-1.5 w-1/3 group-hover:w-full bg-[#da5249] 
                                  transition-all duration-500 ease-out rounded-full"></div>
                </div>
                <p className="text-sm sm:text-base text-[#2a2a2a] mt-3 pl-0.5 
                             group-hover:translate-x-2 transition-transform">
                    Manage and track all your projects in one place
                </p>
            </div>

            <button
                className="group w-full sm:w-auto bg-[#da5249] text-white px-8 py-3.5 
                         rounded-full flex items-center justify-center 
                         transition-all duration-300 hover:bg-[#c4483f] 
                         relative overflow-hidden shadow-lg 
                         hover:shadow-[#da5249]/30 hover:shadow-xl
                         hover:translate-y-[-2px] active:translate-y-[1px]"
                onClick={handleCreateProject}
            >
                <span className="relative flex items-center font-medium text-lg">
                    <span className="mr-2 text-2xl transition-transform duration-500 
                                   group-hover:rotate-[360deg] inline-block">+</span>
                    Add New Project
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 
                              -translate-x-[-100%] group-hover:translate-x-[100%] transition-transform 
                              duration-700 ease-out"></div>
            </button>
        </div>
    );
};

export default ProjectDashboardHeader;
