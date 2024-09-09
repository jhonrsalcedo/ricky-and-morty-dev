import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from './App'

describe('App', () => {
  test('render App', async () => {
    render(<App />)

    const title = screen.getByRole('heading', {
      name: 'Rick and Morty Characters'
    })
    expect(title).toBeDefined()

    const searchInput = screen.getByPlaceholderText('Search by name')
    expect(searchInput).toBeDefined()

    const searchButton = screen.getByRole('button', {
      name: 'Search for characters'
    })
    expect(searchButton).toBeDefined()
    expect(searchButton.textContent).toBe('Search')

    const filterButton = screen.getByRole('button', { name: 'Show Filters' })
    expect(filterButton).toBeDefined()

    const resetButton = screen.getByRole('button', { name: 'Reset' })
    expect(resetButton).toBeDefined()

    const loading = screen.getByText(/loading/i)
    expect(loading).toBeDefined()

    const titleCard = await screen.findByRole('heading', {
      name: 'Rick Sanchez'
    })
    expect(titleCard).toBeDefined()

    const image = await screen.findByAltText('Rick Sanchez')
    expect(image).toBeDefined()

    const nextButton = await screen.findByRole('button', { name: 'Next' })
    expect(nextButton).toBeDefined()
  })

  test('Should search for a character', async () => {
    render(<App />)

    const searchInput = screen.getByPlaceholderText('Search by name')
    expect(searchInput).toBeDefined()
    userEvent.type(searchInput, 'Rick Sanchez')

    const searchButton = screen.getByRole('button', {
      name: 'Search for characters'
    })
    expect(searchButton).toBeDefined()
    expect(searchButton.textContent).toBe('Search')
    userEvent.click(searchButton)

    const loading = screen.getByText(/loading/i)
    expect(loading).toBeDefined()

    const titleCard = await screen.findByRole('heading', {
      name: 'Rick Sanchez'
    })
    expect(titleCard).toBeDefined()

    const image = await screen.findByAltText('Rick Sanchez')
    expect(image).toBeDefined()
  })

  test('Should filters for category (status, species, gender)', async () => {
    render(<App />)

    const filterButton = await screen.findByRole('button', {
      name: 'Show Filters'
    })
    expect(filterButton).toBeDefined()
    userEvent.click(filterButton)

    const categoryStatus = await screen.findByRole('heading', {
      name: 'status'
    })
    expect(categoryStatus).toBeDefined()

    const radioAlive = await screen.findByRole('radio', { name: 'alive' })
    expect(radioAlive).toBeDefined()
    userEvent.click(radioAlive)

    const categorySpecies = await screen.findByRole('heading', {
      name: 'species'
    })
    expect(categorySpecies).toBeDefined()

    const radioAlien = await screen.findByRole('radio', { name: 'alien' })
    expect(radioAlien).toBeDefined()
    userEvent.click(radioAlive)

    const categoryGender = await screen.findByRole('heading', {
      name: 'gender'
    })
    expect(categoryGender).toBeDefined()

    const radioFemale = await screen.findByRole('radio', { name: 'female' })
    expect(radioFemale).toBeDefined()
    userEvent.click(radioFemale)

    const titleCard = await screen.findByRole('heading', {
      name: 'Abadango Cluster Princess'
    })
    expect(titleCard).toBeDefined()

    const image = await screen.findByAltText('Abadango Cluster Princess')
    const imageSrc = image.getAttribute('src')
    expect(image).toBeDefined()
    expect(imageSrc).toBe(
      'https://rickandmortyapi.com/api/character/avatar/5.jpeg'
    )
  })
})
