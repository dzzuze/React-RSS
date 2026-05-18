import { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

interface SearchProps {
  onSearch: (term: string) => void;
}

export default function Search({ onSearch }: SearchProps) {
  const [savedTerm, setSavedTerm] = useLocalStorage({
    storageKey: 'searchTermTemp',
    initialValue: '',
  });
  const [inputValue, setInputValue] = useState(savedTerm);
  const [lastSubmitted, setLastSubmitted] = useState(savedTerm);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSearch = () => {
    const trimmed = inputValue.trim();

    if (trimmed === lastSubmitted) {
      return;
    } else {
      setLastSubmitted(trimmed);
      setSavedTerm(trimmed);
      onSearch(trimmed);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-sm mb-4 flex gap-5">
      <input
        onChange={handleInputChange}
        value={inputValue}
        className="border border-green-500 rounded px-3 py-2 flex-grow outline-none focus:ring-1 focus:ring-green-600 duration-300"
      />
      <button
        onClick={handleSearch}
        className="bg-green-500 text-[#0000000] px-4 py-2 rounded-lg hover:bg-green-300 cursor-pointer duration-300"
      >
        Search
      </button>
    </div>
  );
}
