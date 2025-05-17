import React from "react";
import { Info } from "lucide-react";

const TipsCard = () => {
    return (
        <div className="bg-indigo-50 rounded-xl shadow-sm overflow-hidden">
            <div className="border-b border-indigo-100 px-6 py-4 flex justify-between items-center">
                <h2 className="text-lg font-medium text-indigo-800">
                    Tips for Great Showcases
                </h2>
                <div className="flex items-center text-xs text-gray-500">
                    <Info size={14} className="mr-1" />
                    Keep these in mind as you create
                </div>
            </div>
            <div className="p-6">
                <ul className="space-y-3 text-sm text-indigo-800">
                    <li className="flex items-start">
                        <span className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-200 flex items-center justify-center mr-2">
                            1
                        </span>
                        <p>
                            Organize your build into meaningful sections like
                            &ldquo;Engine Details&rdquo; or &ldquo;Custom Features&rdquo;
                        </p>
                    </li>
                    <li className="flex items-start">
                        <span className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-200 flex items-center justify-center mr-2">
                            2
                        </span>
                        <p>
                            Include close-up photos of special building
                            techniques or modifications you've made
                        </p>
                    </li>
                    <li className="flex items-start">
                        <span className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-200 flex items-center justify-center mr-2">
                            3
                        </span>
                        <p>
                            Use well-lit photos with clean backgrounds to make
                            your creation stand out
                        </p>
                    </li>
                    <li className="flex items-start">
                        <span className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-200 flex items-center justify-center mr-2">
                            4
                        </span>
                        <p>
                            Add descriptions that highlight what makes each
                            section special or challenging
                        </p>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default TipsCard;
