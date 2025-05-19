import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const MyProjectsSeeAllControl = () => {
    return (
        <Link
            href="/projects/all?view=my"
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

export default MyProjectsSeeAllControl;
