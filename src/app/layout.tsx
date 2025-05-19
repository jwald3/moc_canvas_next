import type { Metadata } from "next";
import {
    ClerkProvider,
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import { Github, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";
import "./globals.css";
import Image from "next/image";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "MOC Canvas",
    description: "Design and share your LEGO MOCs",
    metadataBase: new URL(
        process.env.NEXT_PUBLIC_APP_URL || 
        (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")
    ),
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body
                    className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-theme-gradient`}
                >
                    <header className="sticky top-0 z-50 bg-gradient-to-b from-white to-gray-50 border-b border-gray-200">
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#E53E3E1A_1px,transparent_1px),linear-gradient(to_bottom,#E53E3E1A_1px,transparent_1px)] bg-[size:24px_24px]" />
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                            <div className="flex justify-between items-center h-16">
                                <Link 
                                    href="/" 
                                    className="flex items-center space-x-3 group relative"
                                >
                                    <div className="w-10 h-10 bg-white rounded-lg shadow-sm p-0.5 ring-1 ring-gray-200 flex items-center justify-center">
                                        <Image
                                            src="/images/logo.png"
                                            width={32}
                                            height={32}
                                            alt="MOC Canvas Logo"
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    <span className="text-2xl font-bold text-gray-900 group-hover:text-[#E53E3E] transition-colors">
                                        MOC Canvas
                                    </span>
                                </Link>

                                <nav className="hidden md:flex items-center bg-white/50 backdrop-blur-sm rounded-lg ring-1 ring-gray-200 p-1 mx-4">
                                    <Link 
                                        href="/projects" 
                                        className="px-4 py-2 rounded-md text-gray-700 hover:text-[#E53E3E] hover:bg-red-50 font-medium transition-all relative group flex items-center space-x-2"
                                    >
                                        <svg 
                                            className="w-4 h-4" 
                                            fill="none" 
                                            stroke="currentColor" 
                                            viewBox="0 0 24 24"
                                        >
                                            <path 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round" 
                                                strokeWidth={2} 
                                                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" 
                                            />
                                        </svg>
                                        <span>Projects</span>
                                    </Link>
                                    <Link 
                                        href="/explore" 
                                        className="px-4 py-2 rounded-md text-gray-700 hover:text-[#E53E3E] hover:bg-red-50 font-medium transition-all relative group flex items-center space-x-2"
                                    >
                                        <svg 
                                            className="w-4 h-4" 
                                            fill="none" 
                                            stroke="currentColor" 
                                            viewBox="0 0 24 24"
                                        >
                                            <path 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round" 
                                                strokeWidth={2} 
                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                                            />
                                        </svg>
                                        <span>Explore</span>
                                    </Link>
                                    <Link 
                                        href="/community" 
                                        className="px-4 py-2 rounded-md text-gray-700 hover:text-[#E53E3E] hover:bg-red-50 font-medium transition-all relative group flex items-center space-x-2"
                                    >
                                        <svg 
                                            className="w-4 h-4" 
                                            fill="none" 
                                            stroke="currentColor" 
                                            viewBox="0 0 24 24"
                                        >
                                            <path 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round" 
                                                strokeWidth={2} 
                                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" 
                                            />
                                        </svg>
                                        <span>Community</span>
                                    </Link>
                                    <Link 
                                        href="/learn" 
                                        className="px-4 py-2 rounded-md text-gray-700 hover:text-[#E53E3E] hover:bg-red-50 font-medium transition-all relative group flex items-center space-x-2"
                                    >
                                        <svg 
                                            className="w-4 h-4" 
                                            fill="none" 
                                            stroke="currentColor" 
                                            viewBox="0 0 24 24"
                                        >
                                            <path 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round" 
                                                strokeWidth={2} 
                                                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" 
                                            />
                                        </svg>
                                        <span>Learn</span>
                                    </Link>
                                </nav>

                                <div className="flex items-center space-x-2">
                                    <SignedOut>
                                        <SignInButton mode="modal">
                                            <button className="px-4 py-2 rounded-md text-gray-700 hover:text-[#E53E3E] hover:bg-red-50 font-medium transition-all">
                                                Sign in
                                            </button>
                                        </SignInButton>
                                        <SignUpButton mode="modal">
                                            <button className="px-4 py-2 rounded-md bg-[#E53E3E] text-white hover:bg-[#C53030] font-medium transition-all shadow-sm hover:shadow ring-1 ring-red-500/50">
                                                Sign up
                                            </button>
                                        </SignUpButton>
                                    </SignedOut>
                                    <SignedIn>
                                        <UserButton 
                                            afterSignOutUrl="/"
                                            appearance={{
                                                elements: {
                                                    avatarBox: "w-8 h-8",
                                                    userButtonPopoverCard: "!bg-white !shadow-lg",
                                                    userButtonPopoverFooter: "!border-gray-100",
                                                    userButtonPopoverActionButton: "!text-gray-700 hover:!text-[#E53E3E] hover:!bg-red-50 !rounded-md !font-medium",
                                                    userButtonPopoverActionButtonIcon: "!text-gray-400",
                                                    userPreviewMainIdentifier: "!text-gray-900",
                                                    userPreviewSecondaryIdentifier: "!text-gray-500",
                                                }
                                            }}
                                        />
                                    </SignedIn>
                                </div>
                            </div>
                        </div>
                    </header>

                    <main className="flex-grow">
                        {children}
                    </main>

                    <footer className="bg-white/80 backdrop-blur-sm border-t border-[#da5249]/10">
                        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                                <div className="space-y-4">
                                    <h3 className="text-sm font-bold text-[#da5249] uppercase tracking-wider">
                                        Company
                                    </h3>
                                    <ul className="space-y-2">
                                        <li>
                                            <Link href="/about" className="text-gray-600 hover:text-[#da5249]">
                                                About Us
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/careers" className="text-gray-600 hover:text-[#da5249]">
                                                Careers
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/blog" className="text-gray-600 hover:text-[#da5249]">
                                                Blog
                                            </Link>
                                        </li>
                                    </ul>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-sm font-bold text-[#da5249] uppercase tracking-wider">
                                        Resources
                                    </h3>
                                    <ul className="space-y-2">
                                        <li>
                                            <Link href="/docs" className="text-gray-600 hover:text-[#da5249]">
                                                Documentation
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/tutorials" className="text-gray-600 hover:text-[#da5249]">
                                                Tutorials
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/support" className="text-gray-600 hover:text-[#da5249]">
                                                Support
                                            </Link>
                                        </li>
                                    </ul>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-sm font-bold text-[#da5249] uppercase tracking-wider">
                                        Legal
                                    </h3>
                                    <ul className="space-y-2">
                                        <li>
                                            <Link href="/privacy" className="text-gray-600 hover:text-[#da5249]">
                                                Privacy Policy
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/terms" className="text-gray-600 hover:text-[#da5249]">
                                                Terms of Service
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/cookies" className="text-gray-600 hover:text-[#da5249]">
                                                Cookie Policy
                                            </Link>
                                        </li>
                                    </ul>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-sm font-bold text-[#da5249] uppercase tracking-wider">
                                        Connect
                                    </h3>
                                    <div className="flex space-x-6">
                                        <a href="https://github.com" className="text-gray-400 hover:text-[#da5249] transition-colors">
                                            <Github className="h-6 w-6" />
                                        </a>
                                        <a href="https://twitter.com" className="text-gray-400 hover:text-[#da5249] transition-colors">
                                            <Twitter className="h-6 w-6" />
                                        </a>
                                        <a href="https://linkedin.com" className="text-gray-400 hover:text-[#da5249] transition-colors">
                                            <Linkedin className="h-6 w-6" />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 pt-8 border-t border-[#da5249]/10">
                                <p className="text-sm text-gray-400 text-center">
                                    © {new Date().getFullYear()} MOC Canvas. All rights reserved.
                                </p>
                            </div>
                        </div>
                    </footer>
                </body>
            </html>
        </ClerkProvider>
    );
}
