import React, { useState, useEffect } from 'react';
import colors from '@/lib/colors';

interface ColorSearchSuggestionsProps {
    searchQuery: string;
    onColorSelect: (colorName: string) => void;
}

const ColorSearchSuggestions = ({ searchQuery, onColorSelect }: ColorSearchSuggestionsProps) => {
    const [suggestions, setSuggestions] = useState<typeof colors>([]);

    useEffect(() => {
        if (searchQuery.length < 2) {
            setSuggestions([]);
            return;
        }

        const lowerQuery = searchQuery.toLowerCase();
        const matchingColors = colors.filter(color => 
            color.bricklinkColorName.toLowerCase().includes(lowerQuery) ||
            color.semanticThemes.some(theme => 
                theme.toLowerCase().includes(lowerQuery)
            )
        ).slice(0, 5); // Limit to 5 suggestions

        setSuggestions(matchingColors);
    }, [searchQuery]);

    if (suggestions.length === 0) return null;

    return (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
            <div className="p-2">
                <div className="text-xs text-gray-500 mb-2">Color suggestions:</div>
                {suggestions.map((color) => (
                    <button
                        key={color.bricklinkColorId}
                        onClick={() => onColorSelect(color.bricklinkColorName)}
                        className="w-full flex items-center gap-3 p-2 hover:bg-gray-50 rounded text-left"
                    >
                        <div 
                            className="w-4 h-4 rounded border border-gray-300"
                            style={{ backgroundColor: color.hexCode }}
                        />
                        <span className="text-sm">{color.bricklinkColorName}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ColorSearchSuggestions; 