import React, { useState } from 'react';
import { Check, X, ChevronDown, ChevronUp } from 'lucide-react';
import colors from '@/lib/colors';

interface ColorSearchPickerProps {
    selectedColors: number[];
    onColorsChange: (colors: number[]) => void;
    maxColors?: number;
}

const ColorSearchPicker = ({ selectedColors, onColorsChange, maxColors = 5 }: ColorSearchPickerProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);

    const filteredColors = colors.filter(color => 
        color.bricklinkColorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        color.semanticThemes.some(theme => 
            theme.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const handleColorToggle = (colorId: number) => {
        if (selectedColors.includes(colorId)) {
            onColorsChange(selectedColors.filter(id => id !== colorId));
        } else if (selectedColors.length < maxColors) {
            onColorsChange([...selectedColors, colorId]);
        }
    };

    const clearAll = () => {
        onColorsChange([]);
    };

    return (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            {/* Header - Always visible */}
            <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-gray-900">
                        Select Colors ({selectedColors.length}/{maxColors})
                    </h3>
                    <div className="flex items-center gap-2">
                        {selectedColors.length > 0 && (
                            <button
                                onClick={clearAll}
                                className="text-xs text-gray-500 hover:text-red-500 flex items-center gap-1"
                            >
                                <X size={12} />
                                Clear all
                            </button>
                        )}
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="flex items-center gap-1 text-sm text-[#da5249] hover:text-[#c44a42] font-medium"
                        >
                            {isExpanded ? (
                                <>
                                    <ChevronUp size={16} />
                                    Collapse
                                </>
                            ) : (
                                <>
                                    <ChevronDown size={16} />
                                    Expand Color Picker
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Selected colors display - Always visible */}
                {selectedColors.length > 0 && (
                    <div>
                        <div className="text-xs text-gray-500 mb-2">Selected:</div>
                        <div className="flex flex-wrap gap-2">
                            {selectedColors.map(colorId => {
                                const color = colors.find(c => c.bricklinkColorId === colorId);
                                if (!color) return null;
                                
                                return (
                                    <div
                                        key={colorId}
                                        className="flex items-center gap-2 bg-gray-50 rounded-full px-2 py-1"
                                    >
                                        <div
                                            className="w-3 h-3 rounded-full border border-gray-300"
                                            style={{ backgroundColor: color.hexCode }}
                                        />
                                        <span className="text-xs">{color.bricklinkColorName}</span>
                                        <button
                                            onClick={() => handleColorToggle(colorId)}
                                            className="text-gray-400 hover:text-red-500"
                                        >
                                            <X size={12} />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            {/* Collapsible content */}
            <div 
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                <div className="p-4">
                    {/* Search input */}
                    <input
                        type="text"
                        placeholder="Search colors..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-[#da5249] focus:border-[#da5249]"
                    />

                    {/* Color grid */}
                    <div className="max-h-48 overflow-y-auto">
                        <div className="grid grid-cols-8 sm:grid-cols-10 md:grid-cols-12 gap-1">
                            {filteredColors.map((color) => {
                                const isSelected = selectedColors.includes(color.bricklinkColorId);
                                const canSelect = selectedColors.length < maxColors || isSelected;

                                return (
                                    <button
                                        key={color.bricklinkColorId}
                                        onClick={() => canSelect && handleColorToggle(color.bricklinkColorId)}
                                        className={`relative aspect-square rounded border-2 transition-all ${
                                            isSelected 
                                                ? 'border-[#da5249] ring-1 ring-[#da5249]/30' 
                                                : 'border-gray-300 hover:border-gray-400'
                                        } ${!canSelect ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                                        style={{ backgroundColor: color.hexCode }}
                                        title={color.bricklinkColorName}
                                        disabled={!canSelect}
                                    >
                                        {isSelected && (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="bg-[#da5249] text-white rounded-full p-0.5">
                                                    <Check className="w-2 h-2" />
                                                </div>
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {filteredColors.length === 0 && (
                        <div className="text-center py-4 text-gray-500 text-sm">
                            No colors found matching your search.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ColorSearchPicker; 