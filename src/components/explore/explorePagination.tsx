import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ExplorePaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const ExplorePagination = ({ currentPage, totalPages, onPageChange }: ExplorePaginationProps) => {
    if (totalPages <= 1) return null;

    const renderPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;

        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => onPageChange(i)}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                        currentPage === i
                            ? 'bg-[#da5249] text-white'
                            : 'text-gray-600 hover:bg-gray-100'
                    }`}
                >
                    {i}
                </button>
            );
        }

        return pages;
    };

    return (
        <div className="flex items-center justify-center gap-2 mt-8">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-1 rounded-md ${
                    currentPage === 1
                        ? 'text-gray-300'
                        : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
                <ChevronLeft size={20} />
            </button>
            {renderPageNumbers()}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-1 rounded-md ${
                    currentPage === totalPages
                        ? 'text-gray-300'
                        : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
                <ChevronRight size={20} />
            </button>
        </div>
    );
};

export default ExplorePagination; 