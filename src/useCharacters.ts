import { useState, useEffect } from 'react'

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
    filters: string[]
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
    filters: string[]
  ) => {
    setIsLoading(true)
    setError(null)

    let url = `https://rickandmortyapi.com/api/character?page=${page}`
    if (name) {
      url += `&name=${name}`
    }
    filters.forEach((filter) => {
      url += `&${filter}=`
    })

    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Failed to fetch characters')
      }
      const data = await response.json()
      setCharacters(data.results)
      setTotalPages(data.info.pages)
    } catch (error) {
      console.error('Error fetching characters:', error)
      setCharacters([])
      setTotalPages(0)
      setError('Failed to fetch characters. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return { characters, totalPages, isLoading, error, fetchCharacters }
}

export default useCharacters
