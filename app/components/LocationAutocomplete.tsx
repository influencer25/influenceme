'use client';

import { useState, useEffect, useRef } from 'react';
import countriesData from '../../lib/countries-cities.json';

interface LocationAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

interface Country {
  country: string;
  cities: string[];
}

export default function LocationAutocomplete({
  value,
  onChange,
  placeholder = 'Enter your location',
  className = '',
}: LocationAutocompleteProps) {
  const [inputValue, setInputValue] = useState(value);
  const [showDropdown, setShowDropdown] = useState(false);
  const [suggestions, setSuggestions] = useState<{ country: string; city: string }[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);

    if (newValue.length > 0) {
      const searchTerm = newValue.toLowerCase();
      const matches: { country: string; city: string }[] = [];

      // Search through countries and cities
      countriesData.data.forEach((country: Country) => {
        // Check if country name matches
        if (country.country.toLowerCase().includes(searchTerm)) {
          matches.push({ country: country.country, city: '' });
        }

        // Check if any city matches
        country.cities.forEach(city => {
          if (city.toLowerCase().includes(searchTerm)) {
            matches.push({ country: country.country, city });
          }
        });
      });

      // Limit to 10 suggestions
      setSuggestions(matches.slice(0, 10));
      setShowDropdown(true);
    } else {
      setSuggestions([]);
      setShowDropdown(false);
    }
  };

  const handleSuggestionClick = (suggestion: { country: string; city: string }) => {
    const location = suggestion.city 
      ? `${suggestion.city}, ${suggestion.country}`
      : suggestion.country;
    setInputValue(location);
    onChange(location);
    setShowDropdown(false);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => inputValue.length > 0 && setShowDropdown(true)}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      />
      {showDropdown && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {suggestions.map((suggestion, index) => (
            <div
              key={`${suggestion.country}-${suggestion.city}-${index}`}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.city 
                ? `${suggestion.city}, ${suggestion.country}`
                : suggestion.country}
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 