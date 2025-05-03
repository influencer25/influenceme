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

interface Props {
  title: string;
  influencers: Influencer[];
  onViewAll?: () => void;
  showViewAll?: boolean;
}

const InfluencerGrid: React.FC<Props> = ({ title, influencers, onViewAll, showViewAll = false }) => (
  <section className="w-full max-w-6xl mx-auto mt-4">
    <div className="flex items-center justify-between mb-2">
      <h2 className="text-2xl font-bold text-left">{title}</h2>
      {showViewAll && (
        <button
          className="text-pink-500 hover:underline font-medium text-sm"
          onClick={onViewAll}
        >
          View All
        </button>
      )}
    </div>
    <div className="overflow-x-auto">
      <div className="flex gap-6 pb-2">
        {influencers.length === 0 ? (
          <div className="text-center text-gray-400 py-8">No influencers found.</div>
        ) : (
          influencers.map((inf) => (
            <div key={inf.id} className="influencer-card min-w-[260px] max-w-[260px]">
              <div className="relative">
                <img src={inf.image} alt={inf.name} className="w-full h-48 object-cover" />
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {inf.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className={`text-xs font-semibold px-2 py-1 rounded bg-black/80 text-white mb-1 ${
                        tag === "Responds Fast" ? "bg-green-600" : ""
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-gray-900">
                    {inf.name} <span className="text-yellow-500">★ {inf.rating}</span>
                  </span>
                  <span className="text-gray-500 text-xs">{inf.location}</span>
                </div>
                <div className="text-sm text-gray-500 mb-2">{inf.description}</div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {inf.categories.map((cat: string) => (
                    <span
                      key={cat}
                      className="bg-gray-100 text-gray-700 rounded-full px-2 py-0.5 text-xs"
                    >
                      {cat}
                    </span>
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
    </div>
  </section>
);

export default InfluencerGrid;
