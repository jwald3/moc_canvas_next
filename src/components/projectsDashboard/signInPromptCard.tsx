import { User } from "lucide-react";
import React from "react";

interface SignInPromptCardProps {
    title: string;
    description: string;
}

const SignInPromptCard = ({ title, description }: SignInPromptCardProps) => {
    return (
        <div className="bg-white rounded-lg p-6 shadow-sm text-center border border-gray-200 mb-6">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <User size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
                {title}
            </h3>
            <p className="text-gray-500 mb-4">
                {description}
            </p>
        </div>
    );
};

export default SignInPromptCard; 