"use client";
import React from 'react';

interface SearchBarProps {
  platform: string;
  setPlatform: (p: string) => void;
  categoryInput: string;
  setCategoryInput: (c: string) => void;
  selectedCategories: string[];
  setSelectedCategories: (c: string[]) => void;
  showPlatformDropdown: boolean;
  setShowPlatformDropdown: (b: boolean) => void;
  showCategoryDropdown: boolean;
  setShowCategoryDropdown: (b: boolean) => void;
  filteredCategories: string[];
  handleCategorySelect: (cat: string) => void;
  handleCategoryRemove: (cat: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  PLATFORMS: { label: string; value: string }[];
  POPULAR_CATEGORIES: string[];
}

const SearchBar: React.FC<SearchBarProps> = ({
  platform,
  setPlatform,
  categoryInput,
  setCategoryInput,
  selectedCategories,
  setSelectedCategories,
  showPlatformDropdown,
  setShowPlatformDropdown,
  showCategoryDropdown,
  setShowCategoryDropdown,
  filteredCategories,
  handleCategorySelect,
  handleCategoryRemove,
  handleSearch,
  PLATFORMS,
  POPULAR_CATEGORIES,
}) => (
  <form className="w-full max-w-3xl mx-auto mb-10" onSubmit={handleSearch}>
    <div className="flex flex-col md:flex-row items-center bg-white rounded-2xl shadow-lg px-4 py-4 gap-4 md:gap-0 relative">
      {/* Platform Filter */}
      <div className="filter-section platform-filter-section relative w-full md:w-1/4">
        <div className="filter-title text-xs font-semibold text-gray-500 mb-1">Platform</div>
        <div
          className="js-filter-placeholder filter-placeholder border border-gray-200 rounded-lg px-3 py-2 cursor-pointer flex items-center justify-between bg-gray-50"
          onClick={() => setShowPlatformDropdown(!showPlatformDropdown)}
          tabIndex={0}
          onBlur={() => setTimeout(() => setShowPlatformDropdown(false), 100)}
        >
          <span>{PLATFORMS.find(p => p.value === platform)?.label || 'Choose a platform'}</span>
          <svg className="w-4 h-4 ml-2 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
        </div>
        {showPlatformDropdown && (
          <div className="filter-dropdown-holder platform-dropdown-holder absolute left-0 right-0 bg-white border border-gray-200 rounded-lg mt-1 z-20 shadow-lg">
            {PLATFORMS.map(p => (
              <div
                key={p.value}
                className={`filter-dropdown-option px-4 py-2 cursor-pointer hover:bg-gray-100 ${platform === p.value ? 'bg-gray-100 font-semibold' : ''}`}
                onClick={() => { setPlatform(p.value); setShowPlatformDropdown(false); }}
              >
                {p.label}
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Divider */}
      <div className="hidden md:block w-px h-10 bg-gray-200 mx-4" />
      {/* Category Filter */}
      <div className="filter-section category-filter-section relative w-full md:w-2/4">
        <div className="filter-title text-xs font-semibold text-gray-500 mb-1 flex items-center justify-between">
          <span>Category</span>
          {selectedCategories.length > 0 && (
            <button type="button" className="clear-input-btn text-xs text-gray-400 hover:text-gray-600" onClick={() => setSelectedCategories([])}>
              Clear
            </button>
          )}
        </div>
        <div className="filter-placeholder flex flex-wrap items-center border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 min-h-[42px]" onClick={() => setShowCategoryDropdown(true)}>
          {selectedCategories.map(cat => (
            <span key={cat} className="bg-pink-100 text-pink-700 rounded-full px-3 py-1 text-xs font-semibold mr-2 mb-1 flex items-center">
              {cat}
              <button type="button" className="ml-1 text-pink-500 hover:text-pink-700" onClick={e => { e.stopPropagation(); handleCategoryRemove(cat); }}>&times;</button>
            </span>
          ))}
          <input
            className="filter-search-input flex-1 bg-transparent outline-none text-sm min-w-[120px]"
            name="c"
            type="text"
            placeholder="Enter keywords, niches or categories"
            value={categoryInput}
            onChange={e => { setCategoryInput(e.target.value); setShowCategoryDropdown(true); }}
            onFocus={() => setShowCategoryDropdown(true)}
          />
        </div>
        {showCategoryDropdown && (
          <div className="filter-dropdown-holder category-dropdown-holder absolute left-0 right-0 bg-white border border-gray-200 rounded-lg mt-1 z-20 shadow-lg max-h-56 overflow-y-auto">
            <div className="filter-search-input-pop-title px-4 pt-2 pb-1 text-xs text-gray-400">Popular</div>
            <div className="filter-search-input-pop-holder flex flex-wrap px-2 pb-2">
              {filteredCategories.length === 0 && (
                <div className="text-gray-400 px-4 py-2 w-full text-center text-sm">No categories found</div>
              )}
              {filteredCategories.map(cat => (
                <div
                  key={cat}
                  className="filter-search-input-pop-option cursor-pointer bg-gray-100 hover:bg-pink-100 text-gray-700 rounded-full px-3 py-1 text-xs font-medium m-1"
                  onClick={() => handleCategorySelect(cat)}
                >
                  {cat}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Divider */}
      <div className="hidden md:block w-px h-10 bg-gray-200 mx-4" />
      {/* Search Button */}
      <button type="submit" className="search-btn ml-0 md:ml-4 p-3 rounded-full bg-pink-500 hover:bg-pink-600 transition text-white flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
        </svg>
      </button>
    </div>
  </form>
);

export default SearchBar;
