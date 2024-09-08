import { test, expect } from '@playwright/test'

const LOCALHOST_URL = 'http://localhost:5173'

test('has title', async ({ page }) => {
  await page.goto(LOCALHOST_URL)

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Test Rick and Morty/)
})

test('The filter is working', async ({ page }) => {
  await page.goto(LOCALHOST_URL)

  await page.getByRole('button', { name: 'Show Filters' }).click()
  await page.getByLabel('alive').check()
  await page.getByLabel('human', { exact: true }).check()
  await page.getByLabel('male', { exact: true }).check()

  await page.getByRole('img', { name: 'Rick Sanchez' }).click()
  await expect(
    page.locator('#modal-root').getByRole('img', { name: 'Rick Sanchez' })
  ).toBeVisible()
  await expect(
    page.locator('#modal-root').getByRole('heading', { name: 'Rick Sanchez' })
  ).toBeVisible()
  await page.getByRole('button', { name: '×' }).click()
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
