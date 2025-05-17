import { Search } from "lucide-react";
import React from "react";
import Image from "next/image";

const ProjectPartsTabContents = () => {
    return (
        <div className="space-y-6 pb-12">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-1">
                                Inventory & Parts
                            </h3>
                            <p className="text-sm text-gray-500">
                                Track pieces and inventory for your build
                            </p>
                        </div>
                        <button className="bg-indigo-600 text-white px-3 py-1.5 rounded text-sm font-medium">
                            Add Parts
                        </button>
                    </div>
                </div>

                {/* Stats section */}
                <div className="p-4 bg-indigo-50 border-b border-indigo-100">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-white rounded-lg p-3 shadow-sm">
                            <p className="text-xs text-gray-500 mb-1">
                                Total Pieces
                            </p>
                            <p className="text-xl font-semibold">
                                1000
                            </p>
                        </div>
                        <div className="bg-white rounded-lg p-3 shadow-sm">
                            <p className="text-xs text-gray-500 mb-1">
                                Confirmed Found
                            </p>
                            <p className="text-xl font-semibold">
                                1000
                            </p>
                        </div>
                        <div className="bg-white rounded-lg p-3 shadow-sm">
                            <p className="text-xs text-gray-500 mb-1">
                                Missing
                            </p>
                            <p className="text-xl font-semibold text-amber-600">
                                12
                            </p>
                        </div>
                        <div className="bg-white rounded-lg p-3 shadow-sm">
                            <p className="text-xs text-gray-500 mb-1">Extras</p>
                            <p className="text-xl font-semibold text-green-600">
                                24
                            </p>
                        </div>
                    </div>
                </div>

                {/* Parts filter */}
                <div className="p-4 border-b border-gray-100">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search parts..."
                            className="w-full pl-9 pr-3 py-2 rounded-md border border-gray-300"
                        />
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <Search size={16} className="text-gray-400" />
                        </div>
                    </div>
                </div>

                {/* Parts list */}
                <div className="p-4">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                            <div key={num} className="text-center">
                                <div className="h-16 w-16 mx-auto bg-gray-100 rounded flex items-center justify-center">
                                    <Image
                                        src={`/api/placeholder/64/64?text=${num}x${
                                            num + 1
                                        }`}
                                        alt="Part"
                                        width={48}
                                        height={48}
                                    />
                                </div>
                                <p className="text-xs mt-1">
                                    {num}x{num + 1} Brick
                                </p>
                                <p className="text-xs text-gray-500">
                                    x{num * 4}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectPartsTabContents;
