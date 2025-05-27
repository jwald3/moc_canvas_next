import React from 'react';
import { Search, Palette, Tag, LayoutGrid } from 'lucide-react';

export type SearchMode = 'all' | 'color' | 'theme' | 'tag';

interface SearchModeSelectorProps {
    currentMode: SearchMode;
    onModeChange: (mode: SearchMode) => void;
}

const SearchModeSelector = ({ currentMode, onModeChange }: SearchModeSelectorProps) => {
    const modes = [
        { id: 'all' as SearchMode, label: 'All', icon: Search, description: 'Search everything' },
        { id: 'color' as SearchMode, label: 'Colors', icon: Palette, description: 'Find by colors' },
        { id: 'theme' as SearchMode, label: 'Themes', icon: LayoutGrid, description: 'Browse themes' },
        { id: 'tag' as SearchMode, label: 'Tags', icon: Tag, description: 'Filter by tags' },
    ];

    return (
        <div className="mb-4">
            <div className="flex flex-wrap gap-2">
                {modes.map((mode) => {
                    const Icon = mode.icon;
                    const isActive = currentMode === mode.id;
                    
                    return (
                        <button
                            key={mode.id}
                            onClick={() => onModeChange(mode.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                                isActive
                                    ? 'bg-[#da5249] text-white border-[#da5249] shadow-md'
                                    : 'bg-white text-gray-700 border-gray-200 hover:border-[#da5249] hover:text-[#da5249]'
                            }`}
                            title={mode.description}
                        >
                            <Icon size={16} />
                            <span className="text-sm font-medium">{mode.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default SearchModeSelector; 