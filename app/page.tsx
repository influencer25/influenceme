"use client";
import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image';

const PLATFORMS = [
  { label: 'Any', value: '' },
  { label: 'Instagram', value: 'instagram' },
  { label: 'TikTok', value: 'tiktok' },
  { label: 'User Generated Content', value: 'ugc' },
  { label: 'YouTube', value: 'youtube' },
  { label: 'Twitter', value: 'twitter' },
  { label: 'Twitch', value: 'twitch' },
];

const POPULAR_CATEGORIES = [
  'Lifestyle', 'Beauty', 'Fashion', 'Travel', 'Food & Drink', 'Health & Fitness',
  'Family & Children', 'Comedy & Entertainment', 'Art & Photography', 'Music & Dance',
  'Model', 'Animals & Pets', 'Adventure & Outdoors', 'Education', 'Entrepreneur & Business',
  'Athlete & Sports', 'Gaming', 'Technology', 'LGBTQ2+', 'Vegan', 'Healthcare',
  'Automotive', 'Actor', 'Skilled Trades', 'Cannabis', 'Celebrity & Public Figure'
];

// Static demo influencer data
const INFLUENCERS = [
  {
    id: 1,
    name: 'Oleksa',
    location: 'Los Angeles, CA, US',
    platform: 'instagram',
    categories: ['Beauty', 'Model'],
    image: '/images/creator1.jpg',
    rating: 5.0,
    price: 60,
    tags: ['Top Creator', 'Responds Fast'],
    description: 'Skincare Influencer, Ugc Creator, Model',
  },
  {
    id: 2,
    name: 'Song Guy',
    location: 'Los Angeles, CA, US',
    platform: 'youtube',
    categories: ['Music & Dance'],
    image: '/images/creator2.jpg',
    rating: 5.0,
    price: 50,
    tags: ['Top Creator'],
    description: 'Custom Song & Jingle Creator',
  },
  {
    id: 3,
    name: 'Mila',
    location: 'Toronto, ON, CA',
    platform: 'instagram',
    categories: ['Food & Drink', 'Health & Fitness'],
    image: '/images/creator3.jpg',
    rating: 5.0,
    price: 300,
    tags: ['Top Creator', 'Responds Fast'],
    description: 'Food And Fitness Content Creator',
  },
  {
    id: 4,
    name: 'Chelsea Evans',
    location: 'Fort Worth, TX, US',
    platform: 'instagram',
    categories: ['Animals & Pets', 'Family & Children'],
    image: '/images/creator4.jpg',
    rating: 5.0,
    price: 150,
    tags: ['Top Creator', 'Responds Fast'],
    description: 'Pet And Family Influencers. We\'ve Got A Lot Of Pets!',
  },
];

export default function Home() {
  const [platform, setPlatform] = useState('');
  const [categoryInput, setCategoryInput] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showPlatformDropdown, setShowPlatformDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [filtered, setFiltered] = useState(INFLUENCERS);

  const filteredCategories = POPULAR_CATEGORIES.filter(cat =>
    cat.toLowerCase().includes(categoryInput.toLowerCase()) &&
    !selectedCategories.includes(cat)
  );

  const handleCategorySelect = (cat: string) => {
    if (!selectedCategories.includes(cat)) {
      setSelectedCategories([...selectedCategories, cat]);
    }
    setCategoryInput('');
    setShowCategoryDropdown(false);
  };

  const handleCategoryRemove = (cat: string) => {
    setSelectedCategories(selectedCategories.filter(c => c !== cat));
  };

  // Filter influencers on search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFiltered(
      INFLUENCERS.filter(inf => {
        const platformMatch = !platform || inf.platform === platform;
        const categoryMatch =
          selectedCategories.length === 0 ||
          selectedCategories.every(cat => inf.categories.includes(cat));
        return platformMatch && categoryMatch;
      })
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white shadow">
        <div className="flex items-center">
          <Image src="/img/logo.png" alt="Logo" width={40} height={40} />
        </div>
        <div className="space-x-4">
          <Link href="/login" className="text-gray-700 hover:text-indigo-600">
            Login
          </Link>
          <Link href="/signup/influencer">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
              Join as Influencer
            </button>
          </Link>
          <Link href="/signup/brand">
            <button className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition">
              Join as Brand
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative flex flex-1 flex-col items-center justify-center text-center px-4 overflow-hidden">
        {/* Background logo_big_zoomed.png */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-10 z-0">
          <Image src="/img/logo_big_zoomed.png" alt="Big Logo" width={600} height={600} className="object-contain" />
        </div>
        <div className="relative z-10 w-full flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-indigo-600">
            Influencer Marketing Made Easy
          </h1>
          <p className="text-lg md:text-2xl text-gray-600 mb-8 max-w-2xl">
            Find and hire top Instagram, TikTok, YouTube, and UGC influencers to create unique content for your brand
          </p>
          {/* Custom Search Bar */}
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

          {/* Influencer Card Grid */}
          <section className="w-full max-w-6xl mx-auto mt-4">
            <h2 className="text-2xl font-bold text-left mb-2">Featured</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filtered.length === 0 ? (
                <div className="col-span-full text-center text-gray-400 py-8">No influencers found.</div>
              ) : (
                filtered.map(inf => (
                  <div key={inf.id} className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden flex flex-col">
                    <div className="relative">
                      <img src={inf.image} alt={inf.name} className="w-full h-48 object-cover" />
                      <div className="absolute top-2 left-2 flex flex-col gap-1">
                        {inf.tags.map((tag: string) => (
                          <span key={tag} className={`text-xs font-semibold px-2 py-1 rounded bg-black/80 text-white mb-1 ${tag === 'Responds Fast' ? 'bg-green-600' : ''}`}>{tag}</span>
                        ))}
                      </div>
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-gray-900">{inf.name} <span className="text-yellow-500">★ {inf.rating}</span></span>
                        <span className="text-gray-500 text-xs">{inf.location}</span>
                      </div>
                      <div className="text-sm text-gray-500 mb-2">{inf.description}</div>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {inf.categories.map((cat: string) => (
                          <span key={cat} className="bg-gray-100 text-gray-700 rounded-full px-2 py-0.5 text-xs">{cat}</span>
                        ))}
                      </div>
                      <div className="mt-auto flex items-center justify-between">
                        <span className="text-indigo-600 font-bold text-lg">${inf.price}</span>
                        <span className="text-xs text-gray-400 capitalize">{inf.platform}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
} 