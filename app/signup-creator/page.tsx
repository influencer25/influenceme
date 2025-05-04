'use client';

import { useState } from 'react';
import Image from 'next/image';
import LocationAutocomplete from '../components/LocationAutocomplete';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import UserMenu from '../components/UserMenu';
import { useAuth } from '../context/AuthContext';

const steps = [
  {
    label: 'Account',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 01-8 0M12 3v4m0 0a4 4 0 01-4 4H4m8-4a4 4 0 014 4h4m-8 0v4m0 0a4 4 0 004 4h4m-8-4a4 4 0 00-4 4H4" /></svg>
    ),
  },
  {
    label: 'Profile',
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
  const router = useRouter();
  const [step, setStep] = useState<'initial' | 'manual' | 'verification' | 'profile' | number>('initial');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
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
  const [emailError, setEmailError] = useState('');
  const { user } = useAuth();

  const handleGoogleSignup = () => {
    // Implement Google signup logic
    console.log('Google signup clicked');
  };

  const handleManualSignup = () => {
    if (formData.email && !validateEmail(formData.email)) {
      setEmailError('Invalid email');
    } else {
      setEmailError('');
      setStep('manual');
    }
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!validateEmail(formData.email)) {
      setEmailError('Invalid email');
      setIsLoading(false);
      return;
    } else {
      setEmailError('');
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      // Mock email verification
      setStep('verification');
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLocationChange = (value: string) => {
    setFormData(prev => ({ ...prev, location: value }));
  };

  const handleGenderSelect = (gender: string) => {
    setFormData(prev => ({ ...prev, gender }));
  };

  // Progress bar step index
  const getStepIndex = () => {
    switch (step) {
      case 'initial':
      case 'manual':
      case 'verification':
        return 0;
      case 'profile':
        return 1;
      case 2:
        return 2;
      case 3:
        return 3;
      case 4:
        return 4;
      case 5:
        return 5;
      default:
        return 0;
    }
  };

  // Add a handler for creating the profile
  const handleCreateProfile = async () => {
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
        throw new Error(data.error || 'Profile creation failed');
      }
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <nav className="navbar flex justify-between items-center px-4 py-2 bg-white shadow">
        <div className="flex items-center">
          <Image src="/img/logo.png" alt="Logo" width={40} height={40} />
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/login" className="text-gray-700 hover:text-indigo-600">
            Login
          </Link>
          <Link href="/signup-creator">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
              Join as Creator
            </button>
          </Link>
          <Link href="/signup/brand">
            <button className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition">
              Join as Brand
            </button>
          </Link>
          {user && <UserMenu />}
        </div>
      </nav>
      {/* Main Signup Content */}
      <div className="flex-1 flex">
        {/* Sidebar Progress Bar */}
        <div className="hidden md:flex flex-col w-64 bg-white border-r px-6 py-10">
          <div className="flex items-center mb-10">
            <Image src="/img/logo.png" alt="Logo" width={40} height={40} />
            <span className="ml-3 text-xl font-bold text-indigo-700">InfluenceMe</span>
          </div>
          <nav className="flex-1">
            <ol className="space-y-6">
              {steps.map((s, idx) => (
                <li key={s.label} className="flex items-center">
                  <span className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${idx < getStepIndex() ? 'bg-green-500 border-green-500 text-white' : idx === getStepIndex() ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-gray-200 border-gray-300 text-gray-400'}`}>
                    {s.icon}
                  </span>
                  <span className={`ml-4 text-base font-medium ${idx === getStepIndex() ? 'text-indigo-700' : idx < getStepIndex() ? 'text-green-600' : 'text-gray-400'}`}>{s.label}</span>
                </li>
              ))}
            </ol>
          </nav>
        </div>
        {/* Main Form */}
        <div className="flex-1 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-lg bg-white p-8 rounded shadow">
            {/* Account creation steps */}
            {(step === 'initial' || step === 'manual' || step === 'verification') && (
              <div className="space-y-6">
                <button
                  onClick={handleGoogleSignup}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Sign up with Google
                </button>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or</span>
                  </div>
                </div>
                <button
                  onClick={handleManualSignup}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign up with Email
                </button>
                {emailError && <p className="text-red-500 text-sm text-center">{emailError}</p>}
              </div>
            )}

            {step === 'manual' && (
              <form className="space-y-6" onSubmit={handleSubmit}>
                {error && (
                  <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4">
                    {error}
                  </div>
                )}
                {emailError && (
                  <div className="text-red-500 text-sm text-center mb-2">{emailError}</div>
                )}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={e => {
                        handleInputChange(e);
                        if (!e.target.value) setEmailError('');
                        else if (!validateEmail(e.target.value)) setEmailError('Invalid email');
                        else setEmailError('');
                      }}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      autoComplete="new-password"
                      required
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {isLoading ? 'Signing up...' : 'Sign up'}
                  </button>
                </div>
              </form>
            )}

            {step === 'verification' && (
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Verify Your Email</h3>
                <p className="text-sm text-gray-500 mb-4">
                  A verification link has been sent to your email. Please check your inbox and click the link to verify your account.
                </p>
                <button
                  onClick={() => setStep('profile')}
                  className="text-indigo-600 hover:text-indigo-500"
                >
                  Resend Verification Link
                </button>
                {/* prod remove */}
                <button
                  className="mt-6 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  onClick={() => setStep('profile')}
                >
                  Continue
                </button>
              </div>
            )}

            {/* Profile multi-step form for 'profile' and all number steps */}
            {(step === 'profile' || typeof step === 'number') && (
              <>
                {error && (
                  <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4">{error}</div>
                )}
                {getStepIndex() === 1 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Where are you located?</h2>
                    <p className="mb-4 text-gray-500">Select your city and country from the list.</p>
                    <LocationAutocomplete value={formData.location} onChange={handleLocationChange} placeholder="Start typing your city or country..." />
                    <button
                      className="mt-6 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => setStep(2)}
                    >
                      Next
                    </button>
                  </div>
                )}
                {typeof step === 'number' && step === 2 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Create a title for your profile</h2>
                    <p className="mb-4 text-gray-500">This title will be shown on your public profile and in search results. Example: <span className="font-semibold text-indigo-600">"Fitness Content Creator & Student Athlete"</span></p>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      minLength={10}
                      maxLength={75}
                      placeholder="E.g. Fitness Content Creator & Student Athlete"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                    <div className="flex justify-between mt-8">
                      <button type="button" onClick={() => setStep('profile')} className="px-6 py-2 rounded bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300">Back</button>
                      <button type="button" onClick={() => setStep(3)} className="ml-auto px-6 py-2 rounded bg-indigo-600 text-white font-semibold hover:bg-indigo-700">Next</button>
                    </div>
                  </div>
                )}
                {typeof step === 'number' && step === 3 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Describe yourself and your content</h2>
                    <p className="mb-4 text-gray-500">Who are you and what type of content do you create? Who is your audience? Be specific as this will help you show up in searches.</p>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      minLength={50}
                      maxLength={800}
                      rows={5}
                      placeholder="Who are you and what type of content do you create? Who is your audience? Be specific as this will help you show up in searches."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                    <div className="flex justify-between mt-8">
                      <button type="button" onClick={() => setStep(2)} className="px-6 py-2 rounded bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300">Back</button>
                      <button type="button" onClick={() => setStep(4)} className="ml-auto px-6 py-2 rounded bg-indigo-600 text-white font-semibold hover:bg-indigo-700">Next</button>
                    </div>
                  </div>
                )}
                {typeof step === 'number' && step === 4 && (
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
                    <div className="flex justify-between mt-8">
                      <button type="button" onClick={() => setStep(3)} className="px-6 py-2 rounded bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300">Back</button>
                      <button type="button" onClick={() => setStep(5)} className="ml-auto px-6 py-2 rounded bg-indigo-600 text-white font-semibold hover:bg-indigo-700">Next</button>
                    </div>
                  </div>
                )}
                {typeof step === 'number' && step === 5 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Add your social channels</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Instagram Username</label>
                        <input
                          type="text"
                          name="instagram"
                          value={formData.instagram}
                          onChange={handleInputChange}
                          placeholder="Instagram Username"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <select
                          name="instagramFollowers"
                          value={formData.instagramFollowers}
                          onChange={handleSelectChange}
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
                          onChange={handleInputChange}
                          placeholder="TikTok Username"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <select
                          name="tiktokFollowers"
                          value={formData.tiktokFollowers}
                          onChange={handleSelectChange}
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
                          onChange={handleInputChange}
                          placeholder="YouTube URL"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <select
                          name="youtubeFollowers"
                          value={formData.youtubeFollowers}
                          onChange={handleSelectChange}
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
                    <div className="flex justify-between mt-8">
                      <button type="button" onClick={() => setStep(4)} className="px-6 py-2 rounded bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300">Back</button>
                      <button type="button" className="ml-auto px-6 py-2 rounded bg-green-600 text-white font-semibold hover:bg-green-700" onClick={handleCreateProfile} disabled={isLoading}>
                        {isLoading ? 'Creating...' : 'Create Profile'}
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 