'use client';

import React, { useState } from 'react';
import { ChevronLeft, Plus, Image, Tag, Hash, Calendar, Clock, Trash2, X, Upload, Save, Info } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Define types for our state
interface BuildSection {
  id: number;
  sectionTitle: string;
  description: string;
  sectionType: string;
  images: ImageType[];
}

interface ImageType {
  id: number;
  url: string;
  title: string;
}

interface StatusOption {
  value: string;
  color: string;
}

// Status options
const statusOptions: StatusOption[] = [
  { value: 'Planning', color: 'bg-purple-100 text-purple-800' },
  { value: 'In Progress', color: 'bg-blue-100 text-blue-800' },
  { value: 'On Hold', color: 'bg-amber-100 text-amber-800' },
  { value: 'Completed', color: 'bg-green-100 text-green-800' }
];

// Mock tag suggestions
const tagSuggestions = [
  'Star Wars', 'UCS', 'Technic', 'City', 'Creator', 'Architecture', 
  'Ideas', 'MOC', 'Microscale', 'Space', 'Castle', 'Harry Potter',
  'Modular', 'Vehicle', 'Building', 'Minifigure', 'Seasonal'
];

const NewProjectPage = () => {
  const router = useRouter();
  
  // State with proper typing
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('Planning');
  const [setNumber, setSetNumber] = useState('');
  const [totalPieces, setTotalPieces] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [showTagSuggestions, setShowTagSuggestions] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [images, setImages] = useState<ImageType[]>([]);
  const [imagePreview, setImagePreview] = useState<ImageType | null>(null);
  const [imageTitle, setImageTitle] = useState('');
  const [buildSections, setBuildSections] = useState<BuildSection[]>([
    { id: 1, sectionTitle: '', description: '', sectionType: 'Overview', images: [] }
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle tag input
  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTagInput(value);
    setShowTagSuggestions(value.length > 0);
  };

  // Add tag
  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag) && tag.length <= 30) {
      setTags([...tags, tag]);
      setTagInput('');
      setShowTagSuggestions(false);
    } else if (tag.length > 30) {
      alert('Tag must be 30 characters or less');
    }
  };

  // Remove tag
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  // Handle key press in tag input
  const handleTagKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput) {
      e.preventDefault();
      addTag(tagInput);
    }
  };

  // Mock image upload
  const handleImageUpload = () => {
    if (imageTitle) {
      const newImageUrl = `/api/placeholder/800/600?text=${encodeURIComponent(imageTitle)}`;
      const newImage: ImageType = {
        id: Date.now(),
        url: newImageUrl,
        title: imageTitle
      };

      if (imagePreview) {
        setImages([...images, newImage]);
      } else {
        setImagePreview(newImage);
      }

      setImageTitle('');
      setShowImageUpload(false);
    }
  };

  // Add image to section
  const addImageToSection = (sectionId: number) => {
    setBuildSections(buildSections.map(section => {
      if (section.id === sectionId) {
        const newImage: ImageType = {
          id: Date.now(),
          url: `/api/placeholder/400/300?text=${encodeURIComponent(section.sectionTitle || section.sectionType)}`,
          title: section.sectionTitle || section.sectionType
        };
        return {
          ...section,
          images: [...section.images, newImage]
        };
      }
      return section;
    }));
  };

  // Remove section
  const removeSection = (sectionId: number) => {
    if (buildSections.length > 1) {
      setBuildSections(buildSections.filter(section => section.id !== sectionId));
    }
  };

  // Add new section
  const addNewSection = () => {
    const sectionTypes = [
      'Overview', 'Detail Highlight', 'Interior', 'Construction Process', 
      'Custom Feature', 'Minifigures', 'Techniques', 'Modifications'
    ];
    const existingSectionTypes = buildSections.map(section => section.sectionType);
    const availableSectionTypes = sectionTypes.filter(type => !existingSectionTypes.includes(type));
    const nextSectionType = availableSectionTypes.length > 0 ? availableSectionTypes[0] : 'Custom Section';
    
    setBuildSections([
      ...buildSections,
      {
        id: Date.now(),
        sectionTitle: '',
        description: '',
        sectionType: nextSectionType,
        images: []
      }
    ]);
  };

  // Update section field
  const updateSectionField = (sectionId: number, field: keyof BuildSection, value: string) => {
    setBuildSections(buildSections.map(section => {
      if (section.id === sectionId) {
        return { ...section, [field]: value };
      }
      return section;
    }));
  };

  // Remove image
  const removeImage = (imageId: number) => {
    setImages(images.filter(img => img.id !== imageId));
  };

  // Handle form submission
  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);
    
    // Mock submission delay
    setTimeout(() => {
      console.log({
        name: projectName,
        description,
        status: selectedStatus,
        setNumber,
        totalPieces: parseInt(totalPieces) || 0,
        tags,
        mainImage: imagePreview,
        additionalImages: images,
        buildSections: buildSections
      });
      
      setIsSubmitting(false);
      alert('Project created successfully!');
    }, 1500);
  };

  // Handle number input
  const handleNumberInput = (e: React.ChangeEvent<HTMLInputElement>, setter: (value: string) => void) => {
    const value = e.target.value.replace(/\D/g, '');
    setter(value);
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
              <h1 className="text-xl font-bold text-gray-800">Create New LEGO Project</h1>
            </div>
            <div>
              <button 
                className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white px-4 py-2 rounded-full font-medium transition-colors shadow-md flex items-center"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Creating...
                  </>
                ) : (
                  <>
                    <Save size={18} className="mr-2" />
                    Create Project
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main form section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info Card */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="border-b border-gray-100 px-6 py-4">
                <h2 className="text-lg font-medium text-gray-800">Basic Information</h2>
              </div>
              <div className="p-6 space-y-6">
                {/* Project Name */}
                <div>
                  <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 mb-1">
                    Project Name*
                  </label>
                  <input
                    type="text"
                    id="projectName"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                    placeholder="e.g., LEGO Star Wars UCS Millennium Falcon"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    required
                  />
                </div>
                
                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description*
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                    placeholder="Describe your LEGO project, goals, and timeline..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
                
                {/* Set Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="setNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Set Number (optional)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Hash size={16} className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="setNumber"
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                        placeholder="e.g., 75192"
                        value={setNumber}
                        onChange={(e) => handleNumberInput(e, setSetNumber)}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="totalPieces" className="block text-sm font-medium text-gray-700 mb-1">
                      Total Pieces (optional)
                    </label>
                    <input
                      type="text"
                      id="totalPieces"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                      placeholder="e.g., 7541"
                      value={totalPieces}
                      onChange={(e) => handleNumberInput(e, setTotalPieces)}
                    />
                  </div>
                </div>
                
                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Status*
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {statusOptions.map(status => (
                      <button
                        key={status.value}
                        type="button"
                        className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                          selectedStatus === status.value
                            ? `${status.color} ring-2 ring-offset-2 ring-gray-300`
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                        onClick={() => setSelectedStatus(status.value)}
                      >
                        {status.value}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tags (max 30 characters each)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Tag size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                      placeholder="Add tags (e.g., Star Wars, UCS, Spaceship)"
                      value={tagInput}
                      onChange={handleTagInputChange}
                      onKeyPress={handleTagKeyPress}
                      maxLength={30}
                    />
                    {tagInput && showTagSuggestions && (
                      <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200 max-h-60 overflow-y-auto">
                        {tagSuggestions
                          .filter(tag => 
                            tag.toLowerCase().includes(tagInput.toLowerCase()) &&
                            !tags.includes(tag)
                          )
                          .map(tag => (
                            <button
                              key={tag}
                              type="button"
                              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                              onClick={() => addTag(tag)}
                            >
                              {tag}
                            </button>
                          ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Tag chips */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {tags.map(tag => (
                      <div 
                        key={tag}
                        className="flex items-center bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm"
                      >
                        <span>{tag}</span>
                        <button
                          type="button"
                          className="ml-1 text-yellow-700 hover:text-yellow-900"
                          onClick={() => removeTag(tag)}
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                    {tags.length === 0 && (
                      <p className="text-sm text-gray-500 italic">No tags added yet</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Project Images Card */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="border-b border-gray-100 px-6 py-4">
                <h2 className="text-lg font-medium text-gray-800">Project Images</h2>
              </div>
              <div className="p-6">
                {/* Main Project Image */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Main Project Image</h3>
                  
                  {!imagePreview ? (
                    <div 
                      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-yellow-500 transition-colors"
                      onClick={() => setShowImageUpload(true)}
                    >
                      <div className="mx-auto h-12 w-12 text-gray-400">
                        <Image size={48} />
                      </div>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Click to upload your main project image
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          PNG, JPG, GIF up to 5MB
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="relative rounded-lg overflow-hidden border border-gray-200">
                      <img 
                        src={imagePreview.url} 
                        alt={imagePreview.title}
                        className="w-full aspect-video object-cover"
                      />
                      <div className="absolute top-2 right-2 flex space-x-2">
                        <button
                          type="button"
                          className="p-1.5 bg-white rounded-full shadow-md hover:bg-gray-100"
                          onClick={() => setImagePreview(null)}
                        >
                          <Trash2 size={16} className="text-red-500" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Additional Images */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-sm font-medium text-gray-700">Additional Images</h3>
                    <button
                      type="button"
                      className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
                      onClick={() => setShowImageUpload(true)}
                    >
                      <Plus size={16} className="mr-1" /> Add Image
                    </button>
                  </div>
                  
                  {images.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {images.map(image => (
                        <div key={image.id} className="relative rounded-lg overflow-hidden border border-gray-200">
                          <img 
                            src={image.url} 
                            alt={image.title}
                            className="w-full aspect-square object-cover"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button
                              type="button"
                              className="p-1.5 bg-white rounded-full shadow-md hover:bg-gray-100"
                              onClick={() => removeImage(image.id)}
                            >
                              <Trash2 size={16} className="text-red-500" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 italic">No additional images added yet</p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Build Sections Card */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="border-b border-gray-100 px-6 py-4 flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-800">Build Showcase</h2>
                <div className="flex items-center text-xs text-gray-500">
                  <Info size={14} className="mr-1" />
                  Highlight different aspects of your build
                </div>
              </div>
              <div className="p-6 space-y-6">
                {buildSections.map((section, index) => (
                  <div key={section.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium text-gray-800">
                        {section.sectionTitle || section.sectionType || `Section ${index + 1}`}
                      </h3>
                      {buildSections.length > 1 && (
                        <button
                          type="button"
                          className="text-gray-400 hover:text-red-500"
                          onClick={() => removeSection(section.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label htmlFor={`sectionTitle-${section.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                          Section Title
                        </label>
                        <input
                          type="text"
                          id={`sectionTitle-${section.id}`}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                          placeholder="e.g., Cockpit Details, Hidden Features"
                          value={section.sectionTitle}
                          onChange={(e) => updateSectionField(section.id, 'sectionTitle', e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor={`sectionType-${section.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                          Section Type
                        </label>
                        <select
                          id={`sectionType-${section.id}`}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                          value={section.sectionType}
                          onChange={(e) => updateSectionField(section.id, 'sectionType', e.target.value)}
                        >
                          <option value="Overview">Overview</option>
                          <option value="Detail Highlight">Detail Highlight</option>
                          <option value="Interior">Interior</option>
                          <option value="Construction Process">Construction Process</option>
                          <option value="Custom Feature">Custom Feature</option>
                          <option value="Minifigures">Minifigures</option>
                          <option value="Techniques">Building Techniques</option>
                          <option value="Modifications">Modifications</option>
                          <option value="Custom Section">Custom Section</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor={`sectionDescription-${section.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                          Description
                        </label>
                        <textarea
                          id={`sectionDescription-${section.id}`}
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                          placeholder="Describe what's special about this part of your build..."
                          value={section.description}
                          onChange={(e) => updateSectionField(section.id, 'description', e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Photos
                          </label>
                          <button
                            type="button"
                            className="text-xs text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
                            onClick={() => addImageToSection(section.id)}
                          >
                            <Plus size={14} className="mr-1" /> Add Photo
                          </button>
                        </div>
                        
                        {section.images.length > 0 ? (
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {section.images.map((image, imgIndex) => (
                              <div key={image.id} className="relative rounded overflow-hidden border border-gray-200">
                                <img 
                                  src={image.url} 
                                  alt={`${section.sectionTitle || section.sectionType || `Section ${index + 1}`} Image ${imgIndex + 1}`}
                                  className="w-full aspect-square object-cover"
                                />
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs text-gray-500 italic">No images added for this section</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                <button
                  type="button"
                  className="w-full border border-dashed border-yellow-300 hover:border-yellow-500 rounded-lg p-3 flex items-center justify-center text-yellow-600 hover:text-yellow-800 hover:bg-yellow-50 transition-colors"
                  onClick={addNewSection}
                >
                  <Plus size={18} className="mr-2" />
                  Add Another Section
                </button>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Preview Card */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden sticky top-6">
              <div className="border-b border-gray-100 px-6 py-4">
                <h2 className="text-lg font-medium text-gray-800">Project Preview</h2>
              </div>
              <div className="p-6">
                <div className="rounded-lg overflow-hidden border border-gray-200 mb-4">
                  {imagePreview ? (
                    <img 
                      src={imagePreview.url} 
                      alt="Project Preview"
                      className="w-full aspect-video object-cover"
                    />
                  ) : (
                    <div className="w-full aspect-video bg-gray-100 flex items-center justify-center">
                      <div className="text-gray-400">
                        <Image size={48} />
                      </div>
                    </div>
                  )}
                </div>
                
                <h3 className="font-bold text-lg text-gray-800 mb-2">
                  {projectName || 'Project Name'}
                </h3>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {tags.length > 0 ? (
                    tags.map(tag => (
                      <span 
                        key={tag}
                        className="bg-black/40 text-white text-xs px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-gray-500 italic">Tags will appear here</span>
                  )}
                </div>
                
                <div className="mb-4">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    statusOptions.find(s => s.value === selectedStatus)?.color || 'bg-gray-100 text-gray-700'
                  }`}>
                    {selectedStatus}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {description || 'Your project description will appear here...'}
                </p>
                
                <div className="flex flex-col gap-2 text-sm">
                  {setNumber && (
                    <div className="flex items-center">
                      <Hash size={16} className="text-gray-400 mr-2" />
                      <span>Set #{setNumber}</span>
                    </div>
                  )}
                  {totalPieces && (
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-yellow-400 rounded-sm mr-2"></div>
                      <span>{totalPieces} pieces</span>
                    </div>
                  )}
                  <div className="flex items-center">
                    <Clock size={16} className="text-gray-400 mr-2" />
                    <span>Created today</span>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-100 px-6 py-4">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white py-2 rounded-lg font-medium transition-colors"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Creating Project...' : 'Create Project'}
                </button>
              </div>
            </div>
            
            {/* Tips Card */}
            <div className="bg-indigo-50 rounded-xl shadow-sm overflow-hidden">
              <div className="border-b border-indigo-100 px-6 py-4">
                <h2 className="text-lg font-medium text-indigo-800">Tips for Great Showcases</h2>
              </div>
              <div className="p-6">
                <ul className="space-y-3 text-sm text-indigo-800">
                  <li className="flex items-start">
                    <span className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-200 flex items-center justify-center mr-2">1</span>
                    <p>Organize your build into meaningful sections like "Engine Details" or "Custom Features"</p>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-200 flex items-center justify-center mr-2">2</span>
                    <p>Include close-up photos of special building techniques or modifications you've made</p>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-200 flex items-center justify-center mr-2">3</span>
                    <p>Use well-lit photos with clean backgrounds to make your creation stand out</p>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-200 flex items-center justify-center mr-2">4</span>
                    <p>Add descriptions that highlight what makes each section special or challenging</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Image Upload Modal */}
      {showImageUpload && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center px-4">
            <div className="fixed inset-0 bg-black opacity-50 transition-opacity"></div>
            
            <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6 z-10">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Add Image</h3>
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-500"
                  onClick={() => setShowImageUpload(false)}
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="imageTitle" className="block text-sm font-medium text-gray-700 mb-1">
                    Image Title
                  </label>
                  <input
                    type="text"
                    id="imageTitle"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                    placeholder="e.g., Main View"
                    value={imageTitle}
                    onChange={(e) => setImageTitle(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Upload Image
                  </label>
                  <div 
                    className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-yellow-500 transition-colors"
                    onClick={handleImageUpload}
                  >
                    <div className="mx-auto h-12 w-12 text-gray-400">
                      <Upload size={36} />
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        PNG, JPG, GIF up to 5MB
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end pt-4 space-x-3 border-t border-gray-100">
                  <button
                    type="button"
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    onClick={() => setShowImageUpload(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    onClick={handleImageUpload}
                    disabled={!imageTitle}
                  >
                    Add Image
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewProjectPage; 