import React, { useEffect } from "react";
import { Search, X } from "lucide-react";
import SearchModeSelector, { SearchMode } from "./searchModeSelector";
import ColorSearchPicker from "./colorSearchPicker";
import { useExploreProjectsContext } from "@/contexts/ExploreProjectsContext";

interface SearchFilters {
    colorIds?: number[];
}

interface ExplorePageSearchProps {
    onSearch: (query: string, mode: SearchMode, filters?: SearchFilters) => void;
}

const ExplorePageSearch = ({ onSearch }: ExplorePageSearchProps) => {
    const {
        searchQuery,
        setSearchQuery,
        searchMode,
        selectedColors,
        setSelectedColors,
        clearSearch,
        handleModeChange,
    } = useExploreProjectsContext();

    const [showColorPicker, setShowColorPicker] = React.useState(false);

    // Update color picker visibility when mode changes
    useEffect(() => {
        setShowColorPicker(searchMode === 'color');
    }, [searchMode]);

    const handleSearch = () => {
        if (searchMode === 'color') {
            onSearch('', searchMode, { colorIds: selectedColors });
        } else {
            onSearch(searchQuery, searchMode);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const getPlaceholder = () => {
        switch (searchMode) {
            case 'color':
                return 'Select colors below to find matching projects...';
            case 'theme':
                return 'Search themes...';
            case 'tag':
                return 'Search tags...';
            default:
                return 'Search projects by name or description...';
        }
    };

    const getSearchButtonText = () => {
        switch (searchMode) {
            case 'color':
                return selectedColors.length > 0 ? `Search (${selectedColors.length} colors)` : 'Select Colors';
            default:
                return 'Search';
        }
    };

    return (
        <div className="space-y-4">
            <SearchModeSelector 
                currentMode={searchMode} 
                onModeChange={handleModeChange}
            />

            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={18} className="text-gray-400" />
                </div>
                <input
                    type="text"
                    placeholder={getPlaceholder()}
                    className="w-full pl-10 pr-32 py-2.5 border-2 border-[#da5249] rounded-full focus:outline-none focus:ring-2 focus:ring-[#da5249] focus:border-[#da5249] bg-white shadow-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={searchMode === 'color'}
                />
                <div className="absolute inset-y-0 right-0 flex items-center gap-2 pr-3">
                    {(searchQuery || selectedColors.length > 0) && (
                        <button
                            className="text-gray-400 hover:text-gray-600"
                            onClick={clearSearch}
                        >
                            <X size={18} />
                        </button>
                    )}
                    <button
                        onClick={handleSearch}
                        className="bg-[#da5249] text-white px-3 py-1 rounded-full text-sm hover:bg-[#c44a42] transition-colors whitespace-nowrap"
                        disabled={searchMode === 'color' && selectedColors.length === 0}
                    >
                        {getSearchButtonText()}
                    </button>
                </div>
            </div>

            {showColorPicker && (
                <ColorSearchPicker
                    selectedColors={selectedColors}
                    onColorsChange={setSelectedColors}
                    maxColors={5}
                />
            )}
        </div>
    );
};

export default ExplorePageSearch;
