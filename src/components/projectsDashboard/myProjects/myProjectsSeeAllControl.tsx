import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useUser } from "@clerk/nextjs";

const MyProjectsSeeAllControl = () => {
    const { isSignedIn } = useUser();

    // Don't render if user is not signed in
    if (!isSignedIn) {
        return null;
    }

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
