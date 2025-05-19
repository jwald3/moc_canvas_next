import React from "react";
import {
    ChevronRight,
} from "lucide-react";
import Link from 'next/link';

const SavedProjectsSeeAllControl = () => {
    return (
        <Link
            href="/projects/all?view=saved"
            className="text-[#da5249] hover:text-[#c4483f] font-medium flex items-center group"
        >
            See All
            <ChevronRight
                size={16}
                className="ml-1 transform group-hover:translate-x-0.5 transition-transform"
            />
        </Link>
    );
};

export default SavedProjectsSeeAllControl;
