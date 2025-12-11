// @ts-check
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/GSB Frais/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('Login with valid credentials', async({page})=>{
  await page.goto('http://localhost:3000/login');
  await page.fill('input[name="login"]', 'Andre');
  await page.fill('input[name="password"]', 'secret');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('http://localhost:3000/dashboard');
});


//Cas de test 2
test('Faux login faux mdp', async({page})=>{
  await page.goto('http://localhost:3000/login');
  await page.fill('input[name="login"]', 'Lola');
  await page.fill('input[name="password"]', 'pop');
  await page.click('button[type="submit"]');
  page.on("dialog", async(dialog)=>{
  expect(dialog.type()).toContain("alert");
  expect(dialog.message()).toContain("Echec de connexion");
  await dialog.accept();
  });
  await expect(page).toHaveURL('http://localhost:3000/login');
});


//Cas de test 3
test('Raffraichir page', async({page})=>{
  await page.goto('http://localhost:3000/login');
  await page.fill('input[name="login"]', 'Andre');
  await page.fill('input[name="password"]', 'secret');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('http://localhost:3000/dashboard');
  page.reload();
  await expect(page).toHaveURL('http://localhost:3000/dashboard');
});

//Cas de test 4
test('Deconnexion', async({page})=>{
  await page.goto('http://localhost:3000/login');
  await page.fill('input[name="login"]', 'Andre');
  await page.fill('input[name="password"]', 'secret');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('http://localhost:3000/dashboard');
  await page.click('button[type="logout"]');
  await expect(page).toHaveURL('http://localhost:3000/login');
});
