'use client';

import React, { useState } from 'react';
import { ChevronLeft, Plus, Image, Users, Bookmark, Share2, Square, CheckSquare, Clock, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Types
interface ProjectImage {
  id: number;
  type: 'reference' | 'progress';
  url: string;
}

interface BuildStep {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  images: ProjectImage[];
}

interface ProjectStats {
  totalPieces: number;
  completedPieces: number;
  totalSteps: number;
  completedSteps: number;
}

interface Project {
  name: string;
  description: string;
  progress: number;
  status: string;
  tags: string[];
  stats: ProjectStats;
  steps: BuildStep[];
}

const ProjectDetailsPage = () => {
  // State
  const [activeTab, setActiveTab] = useState('progress');
  const router = useRouter();
  
  // Mock project data
  const project: Project = {
    name: "LEGO Star Wars UCS Millennium Falcon",
    description: "Building the iconic UCS Millennium Falcon (set #75192). This 7,541-piece build is expected to take about 3 months working on weekends.",
    progress: 65,
    status: "In Progress",
    tags: ["Star Wars", "UCS", "Spaceship", "Advanced"],
    stats: {
      totalPieces: 7541,
      completedPieces: 4902,
      totalSteps: 28,
      completedSteps: 18
    },
    steps: [
      {
        id: 1,
        title: "Base Structure",
        description: "Assembling the foundation and main support beams",
        completed: true,
        images: [
          {
            id: 101,
            type: "reference",
            url: "/api/placeholder/400/300?text=Reference+Base"
          },
          {
            id: 102,
            type: "progress",
            url: "/api/placeholder/400/300?text=My+Base+Structure"
          },
          {
            id: 103,
            type: "progress",
            url: "/api/placeholder/400/300?text=Base+Detail+View"
          }
        ]
      },
      {
        id: 2,
        title: "Cockpit Assembly",
        description: "Building the cockpit and connecting to the main frame",
        completed: true,
        images: [
          {
            id: 104,
            type: "reference",
            url: "/api/placeholder/400/300?text=Reference+Cockpit"
          },
          {
            id: 105,
            type: "progress",
            url: "/api/placeholder/400/300?text=My+Cockpit+Frame"
          },
          {
            id: 106,
            type: "progress",
            url: "/api/placeholder/400/300?text=Cockpit+Detail"
          },
          {
            id: 107,
            type: "progress",
            url: "/api/placeholder/400/300?text=Cockpit+Installed"
          }
        ]
      },
      {
        id: 3,
        title: "Engine Assembly",
        description: "Adding the hyperdrive and engines to the rear section",
        completed: false,
        images: [
          {
            id: 108,
            type: "reference",
            url: "/api/placeholder/400/300?text=Reference+Engine"
          },
          {
            id: 109,
            type: "progress",
            url: "/api/placeholder/400/300?text=Engine+Parts+Sorted"
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button 
                className="mr-3 p-2 rounded-full hover:bg-gray-100"
                onClick={() => router.back()}
              >
                <ChevronLeft size={20} className="text-gray-700" />
              </button>
              <h1 className="text-xl font-bold text-gray-800">{project.name}</h1>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Bookmark size={20} className="text-gray-700" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Share2 size={20} className="text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Project Hero */}
      <div className="max-w-7xl mx-auto px-4 pt-6 pb-4">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
          {/* Project Hero Image */}
          <div className="w-full h-64 relative bg-gray-200">
            {project.steps[0]?.images[0] && (
              <img 
                src={project.steps[0].images[0].url} 
                alt={project.name}
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="flex justify-between items-end">
                <div>
                  <h1 className="text-2xl font-bold text-white mb-2">{project.name}</h1>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {project.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="bg-black/40 text-white text-xs px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {project.status}
                </div>
              </div>
            </div>
          </div>
          
          {/* Project Info */}
          <div className="p-4">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              {/* Description */}
              <div className="flex-1">
                <p className="text-gray-600 mb-4">
                  {project.description}
                </p>
              </div>
              
              {/* Stats */}
              <div className="flex flex-col sm:items-end gap-4">
                {/* Stats Information */}
                <div className="w-full sm:w-64">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{project.stats.completedSteps} of {project.stats.totalSteps} steps complete</span>
                    <span>{project.stats.completedPieces} pieces used</span>
                  </div>
                </div>
                
                {/* Collaborators */}
                <div className="flex flex-col">
                  <div className="flex items-center mb-2">
                    <Users size={16} className="text-gray-500 mr-2" />
                    <span className="text-sm text-gray-700 font-medium">People</span>
                  </div>
                  <button className="text-xs text-indigo-600 font-medium">
                    + Add People
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-6 overflow-x-auto">
            <button
              className={`pb-4 px-1 whitespace-nowrap ${activeTab === 'progress' 
                ? 'border-b-2 border-indigo-600 text-indigo-600' 
                : 'text-gray-500 hover:text-gray-700'
              } font-medium`}
              onClick={() => setActiveTab('progress')}
            >
              Build Progress
            </button>
            <button
              className={`pb-4 px-1 whitespace-nowrap ${activeTab === 'gallery' 
                ? 'border-b-2 border-indigo-600 text-indigo-600' 
                : 'text-gray-500 hover:text-gray-700'
              } font-medium`}
              onClick={() => setActiveTab('gallery')}
            >
              Gallery
            </button>
            <button
              className={`pb-4 px-1 whitespace-nowrap ${activeTab === 'parts' 
                ? 'border-b-2 border-indigo-600 text-indigo-600' 
                : 'text-gray-500 hover:text-gray-700'
              } font-medium`}
              onClick={() => setActiveTab('parts')}
            >
              Parts
            </button>
            <button
              className={`pb-4 px-1 whitespace-nowrap ${activeTab === 'notes' 
                ? 'border-b-2 border-indigo-600 text-indigo-600' 
                : 'text-gray-500 hover:text-gray-700'
              } font-medium`}
              onClick={() => setActiveTab('notes')}
            >
              Notes
            </button>
          </nav>
        </div>
        
        {/* Progress Tab Content */}
        {activeTab === 'progress' && (
          <div className="space-y-6 pb-12">
            {project.steps.map((step) => (
              <div 
                key={step.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                {/* Step Header */}
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start">
                      <button className="mt-1 mr-3">
                        {step.completed ? (
                          <CheckSquare size={20} className="text-indigo-600" />
                        ) : (
                          <Square size={20} className="text-gray-400" />
                        )}
                      </button>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-1">{step.title}</h3>
                        <p className="text-sm text-gray-500">{step.description}</p>
                        {step.completed && (
                          <div className="flex items-center text-xs text-gray-500 mt-1">
                            <Clock size={12} className="mr-1" />
                            Completed
                          </div>
                        )}
                      </div>
                    </div>
                    <button className="p-1 rounded hover:bg-gray-100">
                      <Image size={18} className="text-gray-700" />
                    </button>
                  </div>
                </div>
                
                {/* Images */}
                {step.images.length > 0 && (
                  <div className="p-4 border-b border-gray-100">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Images</h4>
                    
                    {/* Side-by-side comparison */}
                    {step.images.some(img => img.type === 'reference') &&
                      step.images.some(img => img.type === 'progress') && (
                      <div className="mb-4">
                        <h5 className="text-xs uppercase text-gray-500 mb-2">Reference vs. My Build</h5>
                        
                        {/* Desktop view - side by side */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="relative rounded-lg overflow-hidden bg-gray-100">
                              {step.images.find(img => img.type === 'reference') && (
                                <img 
                                  src={step.images.find(img => img.type === 'reference')!.url}
                                  alt="Reference"
                                  className="w-full aspect-video object-cover"
                                />
                              )}
                              <div className="absolute top-0 left-0 bg-indigo-600 text-white px-2 py-1 text-xs">
                                Reference
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="relative rounded-lg overflow-hidden bg-gray-100">
                              {step.images.find(img => img.type === 'progress') && (
                                <img 
                                  src={step.images.find(img => img.type === 'progress')!.url}
                                  alt="My Build"
                                  className="w-full aspect-video object-cover"
                                />
                              )}
                              <div className="absolute top-0 left-0 bg-green-600 text-white px-2 py-1 text-xs">
                                My Build
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Additional progress photos */}
                    {step.images.filter(img => img.type === 'progress').length > 1 && (
                      <div className="mt-4">
                        <h5 className="text-xs uppercase text-gray-500 mb-2">Additional Build Photos</h5>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {step.images
                            .filter(img => img.type === 'progress')
                            .slice(1) // Skip the first one used in the comparison
                            .map(image => (
                              <div key={image.id} className="relative rounded-lg overflow-hidden bg-gray-100">
                                <img 
                                  src={image.url} 
                                  alt="Build progress"
                                  className="w-full aspect-square object-cover"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 text-xs">
                                  {image.url.split('?text=')[1].replace(/\+/g, ' ')}
                                </div>
                              </div>
                            ))
                          }
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        
        {/* Gallery Tab Content */}
        {activeTab === 'gallery' && (
          <div className="space-y-6 pb-12">
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h3 className="text-lg font-medium mb-4">Image Gallery</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {project.steps.flatMap(step => step.images).map(image => (
                  <div 
                    key={image.id} 
                    className="relative rounded-lg overflow-hidden"
                  >
                    <img 
                      src={image.url} 
                      alt="Project image"
                      className="w-full aspect-square object-cover"
                    />
                    <div className="absolute top-0 left-0 bg-black/60 text-white px-2 py-1 text-xs">
                      {image.type === 'reference' ? 'Reference' : 'My Build'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Parts Tab Content */}
        {activeTab === 'parts' && (
          <div className="space-y-6 pb-12">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">Inventory & Parts</h3>
                    <p className="text-sm text-gray-500">Track pieces and inventory for your build</p>
                  </div>
                  <button className="bg-indigo-600 text-white px-3 py-1.5 rounded text-sm font-medium">
                    Add Parts
                  </button>
                </div>
              </div>
              
              {/* Stats section */}
              <div className="p-4 bg-indigo-50 border-b border-indigo-100">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <p className="text-xs text-gray-500 mb-1">Total Pieces</p>
                    <p className="text-xl font-semibold">{project.stats.totalPieces}</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <p className="text-xs text-gray-500 mb-1">Confirmed Found</p>
                    <p className="text-xl font-semibold">{project.stats.completedPieces}</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <p className="text-xs text-gray-500 mb-1">Missing</p>
                    <p className="text-xl font-semibold text-amber-600">12</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <p className="text-xs text-gray-500 mb-1">Extras</p>
                    <p className="text-xl font-semibold text-green-600">24</p>
                  </div>
                </div>
              </div>
              
              {/* Parts filter */}
              <div className="p-4 border-b border-gray-100">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search parts..."
                    className="w-full pl-9 pr-3 py-2 rounded-md border border-gray-300"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <Search size={16} className="text-gray-400" />
                  </div>
                </div>
              </div>
              
              {/* Parts list */}
              <div className="p-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <div key={num} className="text-center">
                      <div className="h-16 w-16 mx-auto bg-gray-100 rounded flex items-center justify-center">
                        <img src={`/api/placeholder/64/64?text=${num}x${num+1}`} alt="Part" className="h-12 w-12" />
                      </div>
                      <p className="text-xs mt-1">{num}x{num+1} Brick</p>
                      <p className="text-xs text-gray-500">x{num*4}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Notes Tab Content */}
        {activeTab === 'notes' && (
          <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <h3 className="text-lg font-medium mb-4">Project Notes</h3>
            <div className="space-y-4 mb-6">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">Important Parts Inventory</h4>
                  <span className="text-xs text-gray-500">May 2, 2025</span>
                </div>
                <p className="text-sm text-gray-700">
                  Several small gray pieces (1x2 plates) were missing from the original kit. Found suitable replacements in the spare parts bin.
                </p>
              </div>
              
              <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4 rounded-r-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">Cockpit Assembly Tips</h4>
                  <span className="text-xs text-gray-500">May 4, 2025</span>
                </div>
                <p className="text-sm text-gray-700">
                  The instructions for the cockpit control panel can be a bit confusing. Make sure to orient the printed tiles correctly before attaching.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Add Step Button - Fixed at bottom */}
      <div className="fixed bottom-6 right-6">
        <button
          className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-4 shadow-lg flex items-center justify-center"
        >
          <Plus size={24} />
        </button>
      </div>
    </div>
  );
};

export default ProjectDetailsPage; 