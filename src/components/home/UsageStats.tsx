import React from "react";

const UsageStats = () => {
    return (
        <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                    10K+
                </div>
                <div className="text-sm text-gray-600">Active Builders</div>
            </div>
            <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                    50K+
                </div>
                <div className="text-sm text-gray-600">Projects Created</div>
            </div>
            <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                    100K+
                </div>
                <div className="text-sm text-gray-600">Parts Tracked</div>
            </div>
        </div>
    );
};

export default UsageStats;
