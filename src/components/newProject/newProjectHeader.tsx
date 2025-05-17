import React from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Save } from "lucide-react";
import { useNewProjectContext } from "@/contexts/NewProjectContext";

const newProjectHeader = () => {
    const router = useRouter();

    const { isSubmitting, handleSubmit } = useNewProjectContext();

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
                            Create New LEGO Project
                        </h1>
                    </div>
                    <div>
                        <button
                            className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white px-4 py-2 rounded-full font-medium transition-colors shadow-md flex items-center"
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <Save size={18} className="mr-2" />
                                    Create Project
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default newProjectHeader;
