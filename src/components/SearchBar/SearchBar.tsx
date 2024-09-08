import { useState } from 'react'
import { Filters } from '../../type'

interface SearchBarProps {
  onSearch: (name: string) => void
  onFilterChange: (filters: Filters) => void
}

const FILTER_OPTIONS = {
  status: ['', 'alive', 'dead', 'unknown'],
  species: ['', 'human', 'alien', 'animal', 'humanoid', 'robot', 'unknown'],
  gender: ['', 'female', 'male', 'genderless', 'unknown']
}

function SearchBar({ onSearch, onFilterChange }: SearchBarProps) {
  const [name, setName] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState<Filters>({
    status: '',
    species: '',
    gender: ''
  })

  const handleSearch = () => {
    onSearch(name)
  }

  const handleFilterToggle = (category: keyof Filters, filter: string) => {
    const updatedFilters = { ...selectedFilters, [category]: filter }
    setSelectedFilters(updatedFilters)
    onFilterChange(updatedFilters)
  }

  const handleReset = () => {
    setName('')
    setSelectedFilters({ status: '', species: '', gender: '' })
    onSearch('')
    onFilterChange({ status: '', species: '', gender: '' })
  }
  return (
    <div className='mb-8'>
      <div className='flex'>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Search by name'
          className='flex-grow p-2 border border-gray-300 rounded-l'
          aria-label='Search character by name'
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              handleSearch()
            }
          }}
        />
        <button
          onClick={handleSearch}
          className='px-4 py-2 bg-green-700 text-white rounded-r'
          aria-label='Search for characters'
        >
          Search
        </button>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className='px-4 py-2 bg-gray-200 text-gray-700 ml-2 rounded'
        >
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
        <button
          onClick={handleReset}
          className='px-4 py-2 bg-red-500 text-white ml-2 rounded'
        >
          Reset
        </button>
      </div>

      {showFilters && (
        <div className='p-4 bg-gray-100 rounded-md flex justify-around'>
          {(Object.keys(FILTER_OPTIONS) as Array<keyof Filters>).map(
            (category) => (
              <div key={category}>
                <h3 className='font-bold mb-2 capitalize'>{category}</h3>
                <div className=''>
                  {FILTER_OPTIONS[category].map((filter) => (
                    <label key={filter} className='flex items-center space-x-2'>
                      <input
                        type='radio'
                        name={category}
                        value={filter}
                        checked={selectedFilters[category] === filter}
                        onChange={() => handleFilterToggle(category, filter)}
                        className='accent-green-500'
                      />
                      <span className='capitalize'>{filter || 'any'}</span>
                    </label>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  )
}

export default SearchBar
