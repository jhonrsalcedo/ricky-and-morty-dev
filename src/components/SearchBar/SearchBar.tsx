import { useState } from 'react'

import Button from '@/components/Button'
import { Filters } from '@/type'

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
    <section className='mb-8'>
      <article className='flex flex-col md:flex-row'>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Search by name'
          className='flex-grow p-2 border border-gray-300 rounded-l md:rounded-none md:rounded-l'
          aria-label='Search character by name'
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              handleSearch()
            }
          }}
        />
        <Button
          variant='primary'
          className='rounded-r'
          onClick={handleSearch}
          aria-label='Search for characters'
          onKeyUp={(e) => {
            if (e.key === 'Enter') handleSearch()
          }}
        >
          Search
        </Button>
        <Button
          variant='secondary'
          className='ml-2'
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </Button>
        <Button
          variant='danger'
          className='ml-2'
          onClick={handleReset}
          onKeyUp={(e) => {
            if (e.key === 'Enter') handleReset()
          }}
        >
          Reset
        </Button>
      </article>

      {showFilters && (
        <article className='p-4 bg-gray-100 rounded-md flex flex-col md:flex-row justify-around mt-2'>
          {(Object.keys(FILTER_OPTIONS) as Array<keyof Filters>).map(
            (category) => (
              <div
                key={category}
                className='flex flex-col md:flex-row items-center'
              >
                <h3 className='font-bold capitalize font-delius'>{category}</h3>
                <div className='flex flex-wrap'>
                  {FILTER_OPTIONS[category].map((filter) => (
                    <label
                      key={filter}
                      className='flex items-center space-x-2 m-1'
                    >
                      <input
                        type='radio'
                        name={category}
                        value={filter}
                        checked={selectedFilters[category] === filter}
                        onChange={() => handleFilterToggle(category, filter)}
                        className='accent-green-500 ml-2'
                      />
                      <span className='capitalize'>{filter || 'any'}</span>
                    </label>
                  ))}
                </div>
              </div>
            )
          )}
        </article>
      )}
    </section>
  )
}

export default SearchBar
