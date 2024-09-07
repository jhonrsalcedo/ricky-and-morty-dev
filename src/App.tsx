import { useEffect, useState } from "react"
import CharacterCard from "./components/CharacterCard/CharacterCard"
import SearchBar from "./components/SearchBar/SearchBar"


interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

function App() {
  const [characters, setCharacters] = useState<Character[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [searchName, setSearchName] = useState('')
  const [searchFilters, setSearchFilters] = useState<string[]>([])

  useEffect(() => {
    fetchCharacters()
  }, [page, searchName, searchFilters])

  const fetchCharacters = () => {
    let url = `https://rickandmortyapi.com/api/character?page=${page}`
    if (searchName) {
      url += `&name=${searchName}`
    }
    searchFilters.forEach(filter => {
      url += `&${filter}=`
    })

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCharacters(data.results)
        setTotalPages(data.info.pages)
      })
      .catch(() => {
        setCharacters([])
        setTotalPages(0)
      })
  }

  const handleSearch = (name: string, filters: string[]) => {
    setSearchName(name)
    setSearchFilters(filters)
    setPage(1)
  }

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1)
  }

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Rick and Morty Characters
      </h1>
      <SearchBar onSearch={handleSearch} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
      {characters.length > 0 ? (
        <div className="mt-8 flex justify-center space-x-4">
          <button
            onClick={handlePrevPage}
            disabled={page === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
          >
            Previous
          </button>
          <span className="py-2">Page {page} of {totalPages}</span>
          <button
            onClick={handleNextPage}
            disabled={page === totalPages}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
          >
            Next
          </button>
        </div>
      ) : (
        <p className="text-center mt-8">No characters found.</p>
      )}
    </div>
  )
}

export default App