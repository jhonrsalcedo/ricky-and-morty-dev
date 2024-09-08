import { useState } from 'react'

interface Filters {
  status: string
  species: string
  gender: string
}

interface Character {
  id: number
  name: string
  status: string
  species: string
  type: string
  gender: string
  origin: {
    name: string
    url: string
  }
  location: {
    name: string
    url: string
  }
  image: string
  episode: string[]
  url: string
  created: string
}

interface UseCharactersResult {
  characters: Character[]
  totalPages: number
  isLoading: boolean
  error: string | null
  fetchCharacters: (
    page: number,
    name: string,
    filters: Filters
  ) => Promise<void>
}

function useCharacters(): UseCharactersResult {
  const [characters, setCharacters] = useState<Character[]>([])
  const [totalPages, setTotalPages] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchCharacters = async (
    page: number,
    name: string,
    filters: Filters
  ) => {
    setIsLoading(true)
    setError(null)

    let url = `https://rickandmortyapi.com/api/character?page=${page}`
    if (name) {
      url += `&name=${name}`
    }
    Object.entries(filters).forEach(([key, value]) => {
      if (value.length) url += `&${key}=${value}`
    })

    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Failed to fetch characters: ${response.status}`)
      }
      const data = await response.json()
      setCharacters(data.results)
      setTotalPages(data.info.pages)
    } catch (error) {
      setCharacters([])
      setTotalPages(0)
      setError((error as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  return { characters, totalPages, isLoading, error, fetchCharacters }
}

export default useCharacters
