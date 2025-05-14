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
      image: "/images/millennium-falcon.jpg",
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
      image: "/images/castle-moc.jpg",
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
      image: "/images/diner-moc.jpg",
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
      image: "/images/millennium-falcon.jpg",
      excerpt: "LEGO unveils impressive new Ultimate Collector Series sets including a massive AT-AT and Naboo Starfighter.",
      commentCount: 132,
      category: "News"
    },
    {
      id: 2,
      title: "Summer Brick Convention Dates Announced",
      date: "May 10, 2025",
      image: "/images/lego-con.jpg",
      excerpt: "The annual Summer Brick Convention will be held in Chicago this year. Early bird registration now open!",
      commentCount: 87,
      category: "Events"
    },
    {
      id: 3,
      title: "Building Techniques: Advanced SNOT Methods",
      date: "May 7, 2025",
      image: "/images/snot-tech.jpg",
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
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Popular Themes</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore different LEGO® themes and find your next build inspiration
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {popularThemes.map(theme => (
                <div 
                  key={theme.name}
                  className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer border border-gray-100"
                >
                  <div className={`h-2 bg-gradient-to-r ${theme.color}`} />
                  <div className="p-6">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${theme.color} flex items-center justify-center mb-4`}>
                      <div className="text-white">{theme.icon}</div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-amber-600 transition-colors">
                      {theme.name}
                    </h3>
                    <p className="text-sm text-gray-500">{theme.count}</p>
                    <div className="mt-4 flex justify-end">
                      <ChevronRight 
                        size={16} 
                        className="text-amber-600 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" 
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-br from-amber-500 to-orange-600 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full opacity-10 transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full opacity-10 transform -translate-x-1/2 translate-y-1/2"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h2 className="text-4xl font-bold mb-6">
                Ready to Start Your LEGO® Journey?
              </h2>
              <p className="text-xl mb-8 text-white/90">
                Join our community of builders, track your collection, and share your creations with the world.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="bg-white text-amber-600 hover:bg-gray-50 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5">
                  Create Account
                </button>
                <button className="bg-black/20 hover:bg-black/30 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all">
                  Learn More
                </button>
              </div>
              <div className="mt-12 flex flex-wrap justify-center gap-8 text-white/90">
                <div className="flex items-center gap-2">
                  <Users size={20} />
                  <span>10,000+ Active Users</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy size={20} />
                  <span>50,000+ Projects</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star size={20} />
                  <span>4.9/5 Average Rating</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                  <span className="font-bold text-xl">B</span>
                </div>
                <span className="text-xl font-bold">BrickTracker</span>
              </div>
              <p className="text-gray-400 text-sm">
                The ultimate platform for LEGO® enthusiasts to track, share, and discover amazing builds.
              </p>
            </div>
            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "Testimonials", "FAQ"]
              },
              {
                title: "Resources",
                links: ["Blog", "Documentation", "Help Center", "API"]
              },
              {
                title: "Company",
                links: ["About", "Careers", "Contact", "Press"]
              }
            ].map(section => (
              <div key={section.title}>
                <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map(link => (
                    <li key={link}>
                      <Link 
                        href="#"
                        className="text-gray-400 hover:text-amber-500 transition-colors"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              © 2025 BrickTracker. All rights reserved. Not affiliated with The LEGO Group.
            </div>
            <div className="flex gap-6">
              <Link href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                Terms
              </Link>
              <Link href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                Privacy
              </Link>
              <Link href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                Cookies
              </Link>
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
