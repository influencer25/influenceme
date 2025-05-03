import Link from 'next/link';
import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white shadow">
        <div className="text-2xl font-bold text-indigo-600">
          BeTheInfluencer
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
      <main className="flex flex-1 flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4">
          Connect. Collaborate. Influence.
        </h1>
        <p className="text-lg md:text-2xl text-gray-600 mb-8 max-w-2xl">
          BeTheInfluencer is the platform where brands and influencers meet to create impactful campaigns. Join our community and start collaborating today!
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <Link href="/signup/influencer">
            <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition">
              Join as Influencer
            </button>
          </Link>
          <Link href="/signup/brand">
            <button className="bg-pink-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-pink-600 transition">
              Join as Brand
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
} 