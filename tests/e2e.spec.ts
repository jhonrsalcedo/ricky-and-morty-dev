import { test, expect } from '@playwright/test'

const LOCALHOST_URL = 'http://localhost:5173'
const PREFIX_IMAGE_URL = 'https://rickandmortyapi.com'

test('has title', async ({ page }) => {
  await page.goto(LOCALHOST_URL)

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Test Rick and Morty/)
})

test('The filter is working', async ({ page }) => {
  await page.goto(LOCALHOST_URL, { waitUntil: 'networkidle' })

  await page.getByRole('button', { name: 'Show Filters' }).click()
  await page.getByLabel('alive').check()
  await page.getByLabel('human', { exact: true }).check()
  await page.getByLabel('male', { exact: true }).check()

  const modal = page.getByText('×Rick SanchezStatus:')
  expect(await modal.count()).toBe(0)

  await page.getByRole('img', { name: 'Rick Sanchez' }).click()
  const image = page
    .locator('#modal-root')
    .getByRole('img', { name: 'Rick Sanchez' })
  await expect(image).toBeVisible()

  const imageSrc = await image.getAttribute('src')
  expect(imageSrc).toContain(PREFIX_IMAGE_URL)

  await expect(
    page.locator('#modal-root').getByRole('heading', { name: 'Rick Sanchez' })
  ).toBeVisible()
  expect(await modal.count()).toBe(1)

  await page.getByRole('button', { name: '×' }).click()
  await modal.waitFor({ state: 'detached' })

  expect(await modal.count()).toBe(0)
})

test('The Search', async ({ page }) => {
  await page.goto(LOCALHOST_URL)

  await page.getByPlaceholder('Search by name').click()
  await page.getByPlaceholder('Search by name').fill('summer')
  await page.getByRole('button', { name: 'Search' }).click()
  await page.getByRole('img', { name: 'Summer Smith' }).first().click()
  await page
    .locator('#modal-root')
    .getByRole('img', { name: 'Summer Smith' })
    .click()
  await expect(
    page.locator('#modal-root').getByRole('heading', { name: 'Summer Smith' })
  ).toBeVisible()
  await expect(
    page.locator('#modal-root').getByRole('heading', { name: 'Summer Smith' })
  ).toBeVisible()
  await page.getByRole('button', { name: '×' }).click()
})
