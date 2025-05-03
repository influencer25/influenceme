"use client";
import React from 'react';

interface Influencer {
  id: number;
  name: string;
  location: string;
  platform: string;
  categories: string[];
  image: string;
  rating: number;
  price: number;
  tags: string[];
  description: string;
}

const InfluencerGrid: React.FC<{ filtered: Influencer[] }> = ({ filtered }) => (
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
);

export default InfluencerGrid;
