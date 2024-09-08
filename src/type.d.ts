export interface Character {
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

export interface CharacterCardProps {
  character: Character
  isModal?: boolean
}

export interface Filters {
  status: string
  species: string
  gender: string
}

export interface UseCharactersResult {
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
