import React from "react";
import Image from "next/image";
import { ArrowRight, User } from "lucide-react";
import { ProjectObject } from "@/types/hand_spun_datatypes";

interface FeaturedBuildCardProps {
    build: ProjectObject;
    handleViewBuild: (id: string) => void;
}

const FeaturedBuildCard = ({ build, handleViewBuild }: FeaturedBuildCardProps) => {
    return (
        <div 
            onClick={() => handleViewBuild(build.id)}
            className="group cursor-pointer bg-white rounded-2xl overflow-hidden border-2 border-slate-100 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
            <div className="relative aspect-[4/3] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#ffd700]/20 via-[#da5249]/20 to-[#4a9eff]/20 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                <Image
                    src={build?.mainImage?.url || "https://k4dys96b1y.ufs.sh/f/hEcHYuoY4CW6R4yHIFUVXuE3ZH0COAIBJyGoUNcV1jbzRWql"}
                    alt={build?.title || ""}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
            </div>
            
            <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h3 className="font-bold text-slate-800 mb-2 group-hover:text-[#da5249] transition-colors">
                            {build?.title || ""}
                        </h3>
                        <div className="flex items-center gap-2 text-slate-600 text-sm">
                            <User size={14} />
                            <span>{build?.owner || ""}</span>
                        </div>
                    </div>
                    <div className="bg-slate-100 group-hover:bg-[#da5249] rounded-lg p-2 transition-colors">
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeaturedBuildCard;
