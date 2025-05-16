import React from "react";
import {
    ChevronRight,
} from "lucide-react";
import Link from 'next/link';

const savedProjectsSeeAllControl = () => {
    return (
        <Link
            href="/projects/all?view=saved"
            className="text-orange-600 hover:text-orange-800 font-medium flex items-center group"
        >
            See All
            <ChevronRight
                size={16}
                className="ml-1 transform group-hover:translate-x-0.5 transition-transform"
            />
        </Link>
    );
};

export default savedProjectsSeeAllControl;
