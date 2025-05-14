"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Search, 
  ChevronRight, 
  ChevronLeft, 
  Star, 
  TrendingUp, 
  Calendar, 
  Gift, 
  Users, 
  BookOpen, 
  Trophy, 
  Plus, 
  Bell, 
  Menu, 
  X 
} from 'lucide-react';
import { useRef } from 'react';
import AppImage from "@/components/ui/images/AppImage";
import AvatarImage from "@/components/ui/images/AvatarImage";
import BannerImage from "@/components/ui/images/BannerImage";
import HeroBanner from "@/components/ui/images/HeroBanner";
import ThumbnailImage from "@/components/ui/images/ThumbnailImage";
import ProjectPreviewCard from "@/components/ui/projects/ProjectPreviewCard";
import ProjectList from "@/components/ui/projects/ProjectList";

// Types
interface FeaturedBuild {
  id: number;
  name: string;
  creator: string;
  image: string;
  likes: number;
  views: number;
  tags: string[];
  pieces: number;
  progress: number;
}

interface NewsItem {
  id: number;
  title: string;
  date: string;
  image: string;
  excerpt: string;
  commentCount: number;
  category: string;
}

interface CommunityHighlight {
  id: number;
  name: string;
  creator: string;
  image: string;
  likes: number;
  tags: string[];
}

interface PopularTheme {
  name: string;
  count: string;
  color: string;
  icon: React.ReactNode;
}

const HomePage = () => {
  // State
  const [activeCategory, setActiveCategory] = useState('All');
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  const router = useRouter();

  // Mock featured builds data
  const featuredBuilds: FeaturedBuild[] = [
    {
      id: 1,
      name: "Star Wars UCS Millennium Falcon",
      creator: "BrickMaster2000",
      image: "/api/placeholder/800/500?text=Millennium+Falcon+UCS",
      likes: 2453,
      views: 12840,
      tags: ["Star Wars", "UCS", "Spaceship"],
      pieces: 7541,
      progress: 82
    },
    {
      id: 2,
      name: "Medieval Castle MOC",
      creator: "KnightBuilder",
      image: "/api/placeholder/800/500?text=Medieval+Castle",
      likes: 1987,
      views: 8932,
      tags: ["Castle", "Medieval", "MOC"],
      pieces: 4892,
      progress: 100
    },
    {
      id: 3,
      name: "Modular Downtown Diner",
      creator: "CityCreator",
      image: "/api/placeholder/800/500?text=Downtown+Diner",
      likes: 1645,
      views: 7321,
      tags: ["Modular", "City", "Building"],
      pieces: 2480,
      progress: 65
    }
  ];
  
  // Mock news data
  const newsItems: NewsItem[] = [
    {
      id: 1,
      title: "New Star Wars UCS Sets Revealed!",
      date: "May 4, 2025",
      image: "/api/placeholder/400/300?text=New+Star+Wars+Sets",
      excerpt: "LEGO unveils impressive new Ultimate Collector Series sets including a massive AT-AT and Naboo Starfighter.",
      commentCount: 132,
      category: "News"
    },
    {
      id: 2,
      title: "Summer Brick Convention Dates Announced",
      date: "May 10, 2025",
      image: "/api/placeholder/400/300?text=Brick+Convention",
      excerpt: "The annual Summer Brick Convention will be held in Chicago this year. Early bird registration now open!",
      commentCount: 87,
      category: "Events"
    },
    {
      id: 3,
      title: "Building Techniques: Advanced SNOT Methods",
      date: "May 7, 2025",
      image: "/api/placeholder/400/300?text=SNOT+Techniques",
      excerpt: "Learn expert Studs Not On Top building methods from master builders in this comprehensive guide.",
      commentCount: 64,
      category: "Guides"
    }
  ];
  
  // Mock categories
  const categories = [
    { name: "All", icon: <TrendingUp size={20} /> },
    { name: "Star Wars", icon: <Star size={20} /> },
    { name: "Technic", icon: <Gift size={20} /> },
    { name: "City", icon: <Users size={20} /> },
    { name: "Ideas", icon: <BookOpen size={20} /> },
    { name: "MOCs", icon: <Trophy size={20} /> }
  ];
  
  // Mock community highlight data
  const communityHighlights: CommunityHighlight[] = [
    {
      id: 1,
      name: "Microscale City Skyline",
      creator: "MiniBuilder",
      image: "/api/placeholder/300/300?text=Microscale+City",
      likes: 847,
      tags: ["Microscale", "Architecture", "MOC"]
    },
    {
      id: 2,
      name: "Hogwarts Great Hall Rebuild",
      creator: "WizardFan",
      image: "/api/placeholder/300/300?text=Hogwarts+Great+Hall",
      likes: 1243,
      tags: ["Harry Potter", "MOC", "Castle"]
    },
    {
      id: 3,
      name: "Space Exploration Vehicle",
      creator: "AstroBuilder",
      image: "/api/placeholder/300/300?text=Space+Vehicle",
      likes: 976,
      tags: ["Space", "Vehicle", "Technic"]
    },
    {
      id: 4,
      name: "Japanese Garden Diorama",
      creator: "ZenBricks",
      image: "/api/placeholder/300/300?text=Japanese+Garden",
      likes: 1547,
      tags: ["Diorama", "Landscape", "Architecture"]
    }
  ];
  
  // Popular themes with colorful accents
  const popularThemes: PopularTheme[] = [
    { name: "Star Wars", count: "3.2K builds", color: "from-blue-500 to-purple-600", icon: <Star size={18} /> },
    { name: "Technic", count: "2.7K builds", color: "from-red-500 to-yellow-500", icon: <Gift size={18} /> },
    { name: "City", count: "4.1K builds", color: "from-green-500 to-teal-500", icon: <Users size={18} /> },
    { name: "Super Heroes", count: "1.8K builds", color: "from-yellow-400 to-orange-500", icon: <Trophy size={18} /> },
    { name: "Harry Potter", count: "1.5K builds", color: "from-purple-500 to-indigo-600", icon: <BookOpen size={18} /> },
    { name: "Creator 3-in-1", count: "2.3K builds", color: "from-pink-500 to-rose-600", icon: <Plus size={18} /> },
  ];
  
  // Auto-rotate featured builds
  useEffect(() => {
    const interval = setInterval(() => {
      setFeaturedIndex((prevIndex) => (prevIndex + 1) % featuredBuilds.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [featuredBuilds.length]);
  
  // Navigation handlers
  const navigateFeatured = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setFeaturedIndex((prevIndex) => 
        prevIndex === 0 ? featuredBuilds.length - 1 : prevIndex - 1
      );
    } else {
      setFeaturedIndex((prevIndex) => 
        (prevIndex + 1) % featuredBuilds.length
      );
    }
  };
  
  // Item detail handlers
  const handleViewBuild = (id: number) => {
    router.push(`/projects/${id}`);
  };
  
  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <main>
        {/* Hero Section */}
        <section id="featured" className="relative bg-gradient-to-br from-yellow-50 to-orange-50 pt-4 pb-8 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-300 rounded-full opacity-20 -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-300 rounded-full opacity-20 -ml-40 -mb-40"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Featured Builds</h2>
              <Link href="#" className="text-yellow-600 hover:text-yellow-700 font-medium flex items-center text-sm">
                View All
                <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>

            {/* Featured Carousel */}
            <div className="relative rounded-xl overflow-hidden shadow-lg bg-white">
              {/* Navigation Buttons */}
              <button 
                className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 transition-colors"
                onClick={() => navigateFeatured('prev')}
              >
                <ChevronLeft size={24} />
              </button>
              
              <button 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 transition-colors"
                onClick={() => navigateFeatured('next')}
              >
                <ChevronRight size={24} />
              </button>

              {/* Featured Build */}
              <div className="relative aspect-[16/9] md:aspect-[21/9]">
                <img 
                  src={featuredBuilds[featuredIndex].image} 
                  alt={featuredBuilds[featuredIndex].name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                  {/* ... Featured build content ... */}
                </div>
              </div>
              
              {/* Pagination dots */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {featuredBuilds.map((_, idx) => (
                  <button
                    key={idx}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === featuredIndex ? 'bg-white w-6' : 'bg-white/50'}`}
                    onClick={() => setFeaturedIndex(idx)}
                  />
                ))}
              </div>
            </div>
            
            {/* Build stats - desktop only */}
            <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              {/* ... Build stats content ... */}
            </div>
          </div>
        </section>

        {/* News Section */}
        <section id="news" className="py-8 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Latest Brick News</h2>
              <Link href="#" className="text-yellow-600 hover:text-yellow-700 font-medium flex items-center text-sm">
                All News
                <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {newsItems.map(news => (
                <div key={news.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                  <div className="relative h-48 overflow-hidden">
                    <img src={news.image} alt={news.title} className="w-full h-full object-cover" />
                    <div className="absolute top-3 left-3 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
                      {news.category}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-500">{news.date}</span>
                      <span className="text-sm text-gray-500 flex items-center">
                        <Users size={14} className="mr-1" />
                        {news.commentCount}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{news.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{news.excerpt}</p>
                    <Link href="#" className="text-yellow-600 hover:text-yellow-700 font-medium text-sm flex items-center">
                      Read More
                      <ChevronRight size={16} className="ml-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Nav */}
        <section className="bg-gradient-to-r from-orange-500 to-yellow-500 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex overflow-x-auto pb-2 hide-scrollbar">
              <div className="flex space-x-2">
                {categories.map(category => (
                  <button 
                    key={category.name}
                    className={`flex items-center px-4 py-2 rounded-full whitespace-nowrap ${
                      activeCategory === category.name
                        ? 'bg-white text-yellow-600 shadow-md'
                        : 'bg-yellow-600/20 text-white hover:bg-yellow-600/30'
                    } transition-colors`}
                    onClick={() => handleCategoryClick(category.name)}
                  >
                    <span className="mr-2">{category.icon}</span>
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Community Highlights */}
        <section id="community" className="py-8 bg-gray-50">
          {/* ... Community content from sample_home.tsx ... */}
        </section>

        {/* Popular Themes */}
        <section id="themes" className="py-8 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Popular Themes</h2>
              <Link href="#" className="text-yellow-600 hover:text-yellow-700 font-medium flex items-center text-sm">
                Browse All Themes
                <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {popularThemes.map(theme => (
                <div 
                  key={theme.name}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100 relative group"
                >
                  <div className={`h-4 bg-gradient-to-r ${theme.color}`}></div>
                  <div className="p-4">
                    <div className="flex items-center mb-3">
                      <div className={`w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-br ${theme.color} text-white`}>
                        {theme.icon}
                      </div>
                      <h3 className="ml-2 font-semibold text-gray-800 group-hover:text-yellow-600 transition-colors">
                        {theme.name}
                      </h3>
                    </div>
                    <p className="text-xs text-gray-500">{theme.count}</p>
                    
                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ChevronRight size={16} className="text-yellow-600" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-12 bg-yellow-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to Track Your LEGO Journey?</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              Create your own build log, track your collection, and connect with other brick enthusiasts.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white px-6 py-3 rounded-full font-medium text-lg shadow-md transition-colors">
                Start Your Project
              </button>
              <button className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 px-6 py-3 rounded-full font-medium text-lg shadow-sm transition-colors">
                Browse Inspiration
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-lg font-bold mb-4">BrickTracker</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-300 hover:text-yellow-400 text-sm">About Us</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-yellow-400 text-sm">Contact</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-yellow-400 text-sm">Careers</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-yellow-400 text-sm">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Community</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-300 hover:text-yellow-400 text-sm">Forums</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-yellow-400 text-sm">Events</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-yellow-400 text-sm">Competitions</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-yellow-400 text-sm">Discord</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-300 hover:text-yellow-400 text-sm">Help Center</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-yellow-400 text-sm">Building Guides</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-yellow-400 text-sm">Part Catalog</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-yellow-400 text-sm">Mobile App</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Connect</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-300 hover:text-yellow-400 text-sm">Facebook</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-yellow-400 text-sm">Instagram</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-yellow-400 text-sm">Twitter</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-yellow-400 text-sm">YouTube</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="h-10 w-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center mr-2">
                <span className="font-bold text-white text-xl">B</span>
              </div>
              <span className="text-xl font-bold text-white">BrickTracker</span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2025 BrickTracker. All rights reserved. Not affiliated with The LEGO Group.
            </div>
          </div>
        </div>
      </footer>

      {/* CSS for hiding scrollbars */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
