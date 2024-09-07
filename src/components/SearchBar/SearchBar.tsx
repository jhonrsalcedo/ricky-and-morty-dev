import { useState } from 'react';

interface Filters {
    status: string[];
    species: string[];
    gender: string[];
}

interface SearchBarProps {
    onSearch: (name: string) => void;
    onFilterChange: (filters: Filters) => void;
}

const FILTER_OPTIONS = {
    'status': ['alive', 'dead', 'unknown'],
    'species': ['human', 'alien'],
    'gender': ['female', 'male', 'genderless', 'unknown']
};

function SearchBar({ onSearch, onFilterChange }: SearchBarProps) {
    const [name, setName] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState<Filters>({
        status: [],
        species: [],
        gender: []
    });

    const handleSearch = () => {
        onSearch(name);
    };

    const handleFilterToggle = (category: keyof Filters, filter: string) => {
        const updatedFilters = { ...selectedFilters }

        if (updatedFilters[category].includes(filter)) {
            updatedFilters[category] = updatedFilters[category].filter(f => f !== filter)
        } else {
            updatedFilters[category] = [...updatedFilters[category], filter]
        }
        setSelectedFilters(updatedFilters)
        onFilterChange(updatedFilters)

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
                    onClick={handleSearch}
                    className="px-4 py-2 bg-blue-500 text-white rounded-r"
                >
                    Search
                </button>
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="px-4 py-2 bg-gray-200 text-gray-700"
                >
                    {showFilters ? 'Hide Filters' : 'Show Filters'}
                </button>
            </div>

            {
                showFilters && (
                    <div className='mt-4 p-4 bg-gray-100 rounded-md'>
                        {
                            (Object.keys(FILTER_OPTIONS) as Array<keyof Filters>).map((category) => (
                                <div key={category}>
                                    <h3>{category}</h3>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                        {
                                            FILTER_OPTIONS[category].map((filter) => (
                                                <label key={filter} className="flex items-center space-x-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedFilters[category].includes(filter)}
                                                        onChange={() => handleFilterToggle(category, filter)}
                                                    />
                                                    <span>{filter}</span>
                                                </label>
                                            ))
                                        }
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    );
}

export default SearchBar;