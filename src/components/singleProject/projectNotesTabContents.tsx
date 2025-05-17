import React from "react";

const projectNotesTabContents = () => {
    return (
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <h3 className="text-lg font-medium mb-4">Project Notes</h3>
            <div className="space-y-4 mb-6">
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                    <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">
                            Important Parts Inventory
                        </h4>
                        <span className="text-xs text-gray-500">
                            May 2, 2025
                        </span>
                    </div>
                    <p className="text-sm text-gray-700">
                        Several small gray pieces (1x2 plates) were missing from
                        the original kit. Found suitable replacements in the
                        spare parts bin.
                    </p>
                </div>

                <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4 rounded-r-lg">
                    <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">Cockpit Assembly Tips</h4>
                        <span className="text-xs text-gray-500">
                            May 4, 2025
                        </span>
                    </div>
                    <p className="text-sm text-gray-700">
                        The instructions for the cockpit control panel can be a
                        bit confusing. Make sure to orient the printed tiles
                        correctly before attaching.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default projectNotesTabContents;
