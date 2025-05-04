'use client';

import { useState } from 'react';
import Image from 'next/image';
import LocationAutocomplete from '../components/LocationAutocomplete';
import { useRouter } from 'next/navigation';

const steps = [
  {
    label: 'Location',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2zm0 0c-4 0-7 2-7 4v2h14v-2c0-2-3-4-7-4z" /></svg>
    ),
  },
  {
    label: 'Title',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 01-8 0M12 3v4m0 0a4 4 0 01-4 4H4m8-4a4 4 0 014 4h4m-8 0v4m0 0a4 4 0 004 4h4m-8-4a4 4 0 00-4 4H4" /></svg>
    ),
  },
  {
    label: 'Bio',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16h6m2 4H7a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v12a2 2 0 01-2 2z" /></svg>
    ),
  },
  {
    label: 'Gender',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 14v7m0 0a5 5 0 100-10 5 5 0 000 10zm0 0v-7m0 0a5 5 0 100-10 5 5 0 000 10z" /></svg>
    ),
  },
  {
    label: 'Social Channels',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2H7a2 2 0 01-2-2v-8a2 2 0 012-2h2m6 0V6a2 2 0 10-4 0v2m4 0H8" /></svg>
    ),
  },
];

export default function SignupCreatorPage() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    location: '',
    title: '',
    bio: '',
    gender: '',
    instagram: '',
    instagramFollowers: '',
    tiktok: '',
    tiktokFollowers: '',
    youtube: '',
    youtubeFollowers: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleNext = () => {
    setError('');
    // Validation per step
    if (step === 0 && !formData.location) {
      setError('Please select your location.');
      return;
    }
    if (step === 1 && (!formData.title || formData.title.length < 10)) {
      setError('Please enter a title (at least 10 characters).');
      return;
    }
    if (step === 2 && (!formData.bio || formData.bio.length < 50)) {
      setError('Please enter a bio (at least 50 characters).');
      return;
    }
    if (step === 3 && !formData.gender) {
      setError('Please select your gender.');
      return;
    }
    setStep(s => s + 1);
  };

  const handleBack = () => {
    setError('');
    setStep(s => s - 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLocationChange = (value: string) => {
    setFormData(prev => ({ ...prev, location: value }));
  };

  const handleGenderSelect = (gender: string) => {
    setFormData(prev => ({ ...prev, gender }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const response = await fetch('/api/signup-creator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Signup failed');
      }
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-white border-r px-6 py-10">
        <div className="flex items-center mb-10">
          <Image src="/img/logo.png" alt="Logo" width={40} height={40} />
          <span className="ml-3 text-xl font-bold text-indigo-700">InfluenceMe</span>
        </div>
        <nav className="flex-1">
          <ol className="space-y-6">
            {steps.map((s, idx) => (
              <li key={s.label} className="flex items-center">
                <span className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${idx < step ? 'bg-green-500 border-green-500 text-white' : idx === step ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-gray-200 border-gray-300 text-gray-400'}`}>
                  {s.icon}
                </span>
                <span className={`ml-4 text-base font-medium ${idx === step ? 'text-indigo-700' : idx < step ? 'text-green-600' : 'text-gray-400'}`}>{s.label}</span>
              </li>
            ))}
          </ol>
        </nav>
      </div>
      {/* Main Form */}
      <div className="flex-1 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-lg bg-white p-8 rounded shadow">
          <form onSubmit={handleSubmit}>
            {error && <div className="bg-red-50 text-red-500 p-3 rounded mb-4">{error}</div>}
            {step === 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-2">Where are you located?</h2>
                <p className="mb-4 text-gray-500">Select your city and country from the list.</p>
                <LocationAutocomplete value={formData.location} onChange={handleLocationChange} placeholder="Start typing your city or country..." />
              </div>
            )}
            {step === 1 && (
              <div>
                <h2 className="text-2xl font-bold mb-2">Create a title for your profile</h2>
                <p className="mb-4 text-gray-500">This title will be shown on your public profile and in search results. Example: <span className="font-semibold text-indigo-600">"Fitness Content Creator & Student Athlete"</span></p>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  minLength={10}
                  maxLength={75}
                  placeholder="E.g. Fitness Content Creator & Student Athlete"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
            )}
            {step === 2 && (
              <div>
                <h2 className="text-2xl font-bold mb-2">Describe yourself and your content</h2>
                <p className="mb-4 text-gray-500">Who are you and what type of content do you create? Who is your audience? Be specific as this will help you show up in searches.</p>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  minLength={50}
                  maxLength={800}
                  rows={5}
                  placeholder="Who are you and what type of content do you create? Who is your audience? Be specific as this will help you show up in searches."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
            )}
            {step === 3 && (
              <div>
                <h2 className="text-2xl font-bold mb-2">What's your gender?</h2>
                <div className="flex space-x-6 mt-4">
                  {['Female', 'Male', 'Other'].map(g => (
                    <button
                      type="button"
                      key={g}
                      className={`flex flex-col items-center px-6 py-4 rounded-lg border-2 transition-colors ${formData.gender === g ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 bg-white'} hover:border-indigo-400`}
                      onClick={() => handleGenderSelect(g)}
                    >
                      <span className="text-lg font-semibold mb-1">{g}</span>
                      {formData.gender === g && <span className="text-indigo-600 font-bold">Selected</span>}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {step === 4 && (
              <div>
                <h2 className="text-2xl font-bold mb-2">Add your social channels</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Instagram Username</label>
                    <input
                      type="text"
                      name="instagram"
                      value={formData.instagram}
                      onChange={handleChange}
                      placeholder="Instagram Username"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <select
                      name="instagramFollowers"
                      value={formData.instagramFollowers}
                      onChange={handleChange}
                      className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="">Instagram Followers</option>
                      <option value="0-1k">0-1k</option>
                      <option value="1k-10k">1k-10k</option>
                      <option value="10k-50k">10k-50k</option>
                      <option value="50k-100k">50k-100k</option>
                      <option value="100k-500k">100k-500k</option>
                      <option value="500k-1m">500k-1m</option>
                      <option value="1m-5m">1m-5m</option>
                      <option value="5m-10m">5m-10m</option>
                      <option value="10m+">10m+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">TikTok Username</label>
                    <input
                      type="text"
                      name="tiktok"
                      value={formData.tiktok}
                      onChange={handleChange}
                      placeholder="TikTok Username"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <select
                      name="tiktokFollowers"
                      value={formData.tiktokFollowers}
                      onChange={handleChange}
                      className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="">TikTok Followers</option>
                      <option value="0-1k">0-1k</option>
                      <option value="1k-10k">1k-10k</option>
                      <option value="10k-50k">10k-50k</option>
                      <option value="50k-100k">50k-100k</option>
                      <option value="100k-500k">100k-500k</option>
                      <option value="500k-1m">500k-1m</option>
                      <option value="1m-5m">1m-5m</option>
                      <option value="5m-10m">5m-10m</option>
                      <option value="10m+">10m+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">YouTube URL</label>
                    <input
                      type="text"
                      name="youtube"
                      value={formData.youtube}
                      onChange={handleChange}
                      placeholder="YouTube URL"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <select
                      name="youtubeFollowers"
                      value={formData.youtubeFollowers}
                      onChange={handleChange}
                      className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="">YouTube Subscribers</option>
                      <option value="0-1k">0-1k</option>
                      <option value="1k-10k">1k-10k</option>
                      <option value="10k-50k">10k-50k</option>
                      <option value="50k-100k">50k-100k</option>
                      <option value="100k-500k">100k-500k</option>
                      <option value="500k-1m">500k-1m</option>
                      <option value="1m-5m">1m-5m</option>
                      <option value="5m-10m">5m-10m</option>
                      <option value="10m+">10m+</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {step > 0 && (
                <button type="button" onClick={handleBack} className="px-6 py-2 rounded bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300">Back</button>
              )}
              {step < steps.length - 1 && (
                <button type="button" onClick={handleNext} className="ml-auto px-6 py-2 rounded bg-indigo-600 text-white font-semibold hover:bg-indigo-700">Next</button>
              )}
              {step === steps.length - 1 && (
                <button type="submit" disabled={isLoading} className="ml-auto px-6 py-2 rounded bg-green-600 text-white font-semibold hover:bg-green-700">{isLoading ? 'Creating...' : 'Create Profile'}</button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 