import { useEffect, useState } from 'react'
import CharacterCard from './components/CharacterCard/CharacterCard'
import SearchBar from './components/SearchBar/SearchBar'
import Modal from './components/Modal/Modal'
import Spinner from './components/Spinner/Spinner'
import useCharacters from './hooks/useCharacters'
import { Character, Filters } from './type'

function App() {
  const [page, setPage] = useState(1)
  const [searchName, setSearchName] = useState('')
  const [searchFilters, setSearchFilters] = useState<Filters>({
    status: '',
    species: '',
    gender: ''
  })
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  )
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { characters, totalPages, isLoading, error, fetchCharacters } =
    useCharacters()

  useEffect(() => {
    fetchCharacters(page, searchName, searchFilters)
  }, [page, searchName, searchFilters])

  const handleSearch = (name: string) => {
    setSearchName(name)
    setPage(1)
  }

  const handleFilterChange = (filters: Filters) => {
    setSearchFilters(filters)
    setPage(1)
  }

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1)
  }

  const handleNextPage = () => {
    console.log(page, totalPages)
    if (page < totalPages) setPage(page + 1)
  }

  const handleCharacterClick = (character: Character) => {
    setSelectedCharacter(character)
    setIsModalOpen(true)
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='font-delicious text-5xl font-bold text-center mb-8 text-neon-green drop-shadow-neon'>
        Rick and Morty Characters
      </h1>
      <SearchBar onSearch={handleSearch} onFilterChange={handleFilterChange} />
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <p className='text-center text-red-500'>{error}</p>
      ) : (
        <>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {characters.map((character) => (
              <div
                key={character.id}
                onClick={() => handleCharacterClick(character)}
                className='cursor-pointer'
              >
                <CharacterCard character={character} />
              </div>
            ))}
          </div>
          {characters.length > 0 && (
            <div className='mt-8 flex justify-center space-x-4'>
              <button
                onClick={handlePrevPage}
                disabled={page === 1}
                className='px-4 py-2 bg-green-700 text-white rounded disabled:bg-gray-300 font-medium'
              >
                Previous
              </button>
              <span className='py-2'>
                Page {page} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={page === totalPages}
                className='px-4 py-2 bg-green-700 text-white rounded disabled:bg-gray-300 font-medium'
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedCharacter && <CharacterCard character={selectedCharacter} />}
      </Modal>
    </div>
  )
}

export default App
