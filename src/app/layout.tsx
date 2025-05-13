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
                    <header className="sticky top-0 z-50 bg-orange-50/90 backdrop-blur-sm border-b border-orange-200 shadow-sm">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between items-center h-16">
                                <Link 
                                    href="/" 
                                    className="flex items-center space-x-2 group"
                                >
                                    <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 bg-clip-text text-transparent group-hover:from-orange-600 group-hover:via-orange-700 group-hover:to-orange-600 transition-all">
                                        MOC Canvas
                                    </span>
                                </Link>

                                <nav className="hidden md:flex items-center space-x-8">
                                    <Link 
                                        href="/projects" 
                                        className="text-gray-600 hover:text-orange-600 font-medium transition-colors relative group"
                                    >
                                        Projects
                                        <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                                    </Link>
                                    <Link 
                                        href="/explore" 
                                        className="text-gray-600 hover:text-orange-600 font-medium transition-colors relative group"
                                    >
                                        Explore
                                        <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                                    </Link>
                                    <Link 
                                        href="/community" 
                                        className="text-gray-600 hover:text-orange-600 font-medium transition-colors relative group"
                                    >
                                        Community
                                        <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                                    </Link>
                                </nav>

                                <div className="flex items-center space-x-4">
                                    <SignedOut>
                                        <SignInButton mode="modal">
                                            <button className="text-gray-600 hover:text-orange-600 font-medium transition-colors">
                                                Sign in
                                            </button>
                                        </SignInButton>
                                        <SignUpButton mode="modal">
                                            <button className="bg-card-gradient hover-gradient text-white px-4 py-2 rounded-full transition-all shadow-sm hover:shadow-md font-semibold text-shadow">
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
                                                    userButtonPopoverCard: "!bg-white !border-orange-100",
                                                    userButtonPopoverFooter: "!border-orange-100",
                                                    userButtonPopoverActionButton: "!text-gray-600 hover:!text-orange-600 !font-medium",
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

                    <footer className="bg-white/80 backdrop-blur-sm border-t border-orange-100">
                        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                                <div className="space-y-4">
                                    <h3 className="text-sm font-bold text-orange-600 uppercase tracking-wider">
                                        Company
                                    </h3>
                                    <ul className="space-y-2">
                                        <li>
                                            <Link href="/about" className="text-gray-600 hover:text-orange-600">
                                                About Us
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/careers" className="text-gray-600 hover:text-orange-600">
                                                Careers
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/blog" className="text-gray-600 hover:text-orange-600">
                                                Blog
                                            </Link>
                                        </li>
                                    </ul>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-sm font-bold text-orange-600 uppercase tracking-wider">
                                        Resources
                                    </h3>
                                    <ul className="space-y-2">
                                        <li>
                                            <Link href="/docs" className="text-gray-600 hover:text-orange-600">
                                                Documentation
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/tutorials" className="text-gray-600 hover:text-orange-600">
                                                Tutorials
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/support" className="text-gray-600 hover:text-orange-600">
                                                Support
                                            </Link>
                                        </li>
                                    </ul>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-sm font-bold text-orange-600 uppercase tracking-wider">
                                        Legal
                                    </h3>
                                    <ul className="space-y-2">
                                        <li>
                                            <Link href="/privacy" className="text-gray-600 hover:text-orange-600">
                                                Privacy Policy
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/terms" className="text-gray-600 hover:text-orange-600">
                                                Terms of Service
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/cookies" className="text-gray-600 hover:text-orange-600">
                                                Cookie Policy
                                            </Link>
                                        </li>
                                    </ul>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-sm font-bold text-orange-600 uppercase tracking-wider">
                                        Connect
                                    </h3>
                                    <div className="flex space-x-6">
                                        <a href="https://github.com" className="text-gray-400 hover:text-orange-600 transition-colors">
                                            <Github className="h-6 w-6" />
                                        </a>
                                        <a href="https://twitter.com" className="text-gray-400 hover:text-orange-600 transition-colors">
                                            <Twitter className="h-6 w-6" />
                                        </a>
                                        <a href="https://linkedin.com" className="text-gray-400 hover:text-orange-600 transition-colors">
                                            <Linkedin className="h-6 w-6" />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 pt-8 border-t border-orange-100">
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
