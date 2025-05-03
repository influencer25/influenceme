"use client";
import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image';
import SearchBar from './components/SearchBar';
import InfluencerGrid from './components/InfluencerGrid';

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
          <SearchBar
            platform={platform}
            setPlatform={setPlatform}
            categoryInput={categoryInput}
            setCategoryInput={setCategoryInput}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            showPlatformDropdown={showPlatformDropdown}
            setShowPlatformDropdown={setShowPlatformDropdown}
            showCategoryDropdown={showCategoryDropdown}
            setShowCategoryDropdown={setShowCategoryDropdown}
            filteredCategories={filteredCategories}
            handleCategorySelect={handleCategorySelect}
            handleCategoryRemove={handleCategoryRemove}
            handleSearch={handleSearch}
            PLATFORMS={PLATFORMS}
            POPULAR_CATEGORIES={POPULAR_CATEGORIES}
          />
          <InfluencerGrid filtered={filtered} />
        </div>
      </main>
    </div>
  );
} 