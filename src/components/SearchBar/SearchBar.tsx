import { useState } from 'react';

interface SearchBarProps {
    onSearch: (name: string, filters: string[]) => void;
}

const filters = ['status', 'species', 'gender'];

function SearchBar({ onSearch }: SearchBarProps) {
    const [name, setName] = useState('');
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);

    const handleSearch = () => {
        onSearch(name, selectedFilters);
    };

    const toggleFilter = (filter: string) => {
        setSelectedFilters(prev =>
            prev.includes(filter)
                ? prev.filter(f => f !== filter)
                : [...prev, filter]
        );
    };

    return (
        <div className="mb-8">
            <div className="flex">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Search by name"
                    className="flex-grow p-2 border border-gray-300 rounded-l"
                />
                <button
                    onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                    className="px-4 py-2 bg-gray-200 text-gray-700"
                >
                    Filters
                </button>
                <button
                    onClick={handleSearch}
                    className="px-4 py-2 bg-blue-500 text-white rounded-r"
                >
                    Search
                </button>
            </div>
            {isFiltersOpen && (
                <div className="mt-2 p-2 border border-gray-300 rounded">
                    {filters.map(filter => (
                        <label key={filter} className="block">
                            <input
                                type="checkbox"
                                checked={selectedFilters.includes(filter)}
                                onChange={() => toggleFilter(filter)}
                                className="mr-2"
                            />
                            {filter.charAt(0).toUpperCase() + filter.slice(1)}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SearchBar;