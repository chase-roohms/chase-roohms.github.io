import { FaSearch } from 'react-icons/fa';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({ 
  value, 
  onChange, 
  placeholder = "Search..." 
}: SearchBarProps) {
  return (
    <div className="relative">
      <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
      />
    </div>
  );
}
