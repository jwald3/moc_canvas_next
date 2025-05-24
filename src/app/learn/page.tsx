"use client";

import React from "react";
import { Lightbulb } from "lucide-react";

const LearnPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-3xl mx-auto px-4">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="border-b border-gray-100 px-6 py-4">
                        <h1 className="text-2xl font-bold text-gray-900">
                            Essential LEGO Building Tips
                        </h1>
                    </div>
                    
                    <div className="p-6 space-y-6">
                        {buildingTips.map((tip) => (
                            <div key={tip.title} className="flex gap-4">
                                <div className="w-8 h-8 bg-red-100 rounded-lg flex-shrink-0 flex items-center justify-center">
                                    <Lightbulb className="w-5 h-5 text-red-600" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-900 mb-1">
                                        {tip.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm">
                                        {tip.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const buildingTips = [
    {
        title: "Plan Your Build",
        description: "Before starting, gather all required pieces and create a rough outline of your build. This helps avoid frustration and ensures you have everything needed.",
    },
    {
        title: "Build a Strong Foundation",
        description: "Always start with a solid base plate or foundation. This provides stability and helps prevent your model from falling apart during construction.",
    },
    {
        title: "Use SNOT Techniques",
        description: "Studs Not On Top (SNOT) building allows you to create more detailed and realistic models by attaching bricks in different orientations.",
    },
    {
        title: "Mind the Clutch Power",
        description: "Don't force pieces together too tightly. LEGO bricks are designed with specific clutch power, and forcing them can damage the pieces.",
    },
    {
        title: "Create Visual Interest",
        description: "Mix different brick sizes and shapes to add texture and detail to your builds. This helps break up large flat surfaces and adds realism.",
    }
];

export default LearnPage; 