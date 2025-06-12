import React, { useState } from 'react';

interface SearchBarProps {
  // Add any props you might need, e.g., for handling search
}

const SearchBar: React.FC<SearchBarProps> = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // This would be replaced with actual AI suggestion logic
  const fetchSuggestions = (query: string) => {
    if (query.length > 2) {
      // Mock suggestions for now
      setSuggestions([
        `Suggestion 1 for ${query}`,
        `Suggestion 2 for ${query}`,
        `Suggestion 3 for ${query}`,
      ]);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    fetchSuggestions(value);
  };

  const handleFocus = () => {
    if (searchTerm.length > 2) {
      setShowSuggestions(true);
    }
  };

  const handleBlur = () => {
    // A small delay to allow click on suggestions
    setTimeout(() => setShowSuggestions(false), 100);
  };

  return (
    <div className="relative flex-grow mx-4 max-w-xs">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="w-full bg-dark-2 text-white border border-primary focus:border-accent p-2 rounded-md"
      />
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-dark-1 border border-primary rounded-md shadow-lg z-50 mt-1">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="p-2 hover:bg-dark-2 cursor-pointer"
              onClick={() => {
                setSearchTerm(suggestion);
                setShowSuggestions(false);
                // Trigger search or navigation here
              }}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar; 