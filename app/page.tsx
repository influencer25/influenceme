"use client";
import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image';
import SearchBar from './components/SearchBar';
import InfluencerGrid from './components/InfluencerGrid';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

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
  const [viewAll, setViewAll] = useState<null | "youtube" | "instagram" | "tiktok">(null);

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

  // Platform-specific lists
  const youtubeInfluencers = INFLUENCERS.filter((i) => i.platform === "youtube");
  const instagramInfluencers = INFLUENCERS.filter((i) => i.platform === "instagram");
  const tiktokInfluencers = INFLUENCERS.filter((i) => i.platform === "tiktok");

  // For demo, show only 6 in each row unless "View All" is clicked
  const maxRow = 6;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <nav className="navbar">
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
      <main className="hero-section">
        {/* Background logo_big_zoomed.png */}
        <div className="hero-bg">
          <Image src="/img/logo_big_zoomed.png" alt="Big Logo" width={600} height={600} className="object-contain" />
        </div>
        <div className="hero-content">
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

          {/* Grids */}
          {!viewAll && (
            <>
              <InfluencerGrid
                title="Featured"
                influencers={INFLUENCERS.slice(0, maxRow)}
                showViewAll={false}
              />
              <InfluencerGrid
                title="YouTube"
                influencers={youtubeInfluencers.slice(0, maxRow)}
                showViewAll={youtubeInfluencers.length > maxRow}
                onViewAll={() => setViewAll("youtube")}
              />
              <InfluencerGrid
                title="Instagram"
                influencers={instagramInfluencers.slice(0, maxRow)}
                showViewAll={instagramInfluencers.length > maxRow}
                onViewAll={() => setViewAll("instagram")}
              />
              <InfluencerGrid
                title="TikTok"
                influencers={tiktokInfluencers.slice(0, maxRow)}
                showViewAll={tiktokInfluencers.length > maxRow}
                onViewAll={() => setViewAll("tiktok")}
              />
            </>
          )}
          {viewAll === "youtube" && (
            <InfluencerGrid
              title="All YouTube Influencers"
              influencers={youtubeInfluencers}
              showViewAll={false}
              onViewAll={() => setViewAll(null)}
            />
          )}
          {viewAll === "instagram" && (
            <InfluencerGrid
              title="All Instagram Influencers"
              influencers={instagramInfluencers}
              showViewAll={false}
              onViewAll={() => setViewAll(null)}
            />
          )}
          {viewAll === "tiktok" && (
            <InfluencerGrid
              title="All TikTok Influencers"
              influencers={tiktokInfluencers}
              showViewAll={false}
              onViewAll={() => setViewAll(null)}
            />
          )}
        </div>
      </main>

      <div className="tiktok-banner bg-black text-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-8">TikTok Influencers</h2>
          <p className="text-xl text-center mb-12 max-w-3xl mx-auto">
            Connect with TikTok creators who can help your brand go viral. Our platform makes it easy to find and collaborate with TikTok influencers who align with your brand values and target audience.
          </p>
          <div className="flex justify-center">
            <button className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              Find TikTok Influencers
            </button>
          </div>
        </div>
      </div>

      <FAQ />

      <Footer />
    </div>
  );
} 