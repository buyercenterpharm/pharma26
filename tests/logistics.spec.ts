import { test, expect } from '@playwright/test';

test('Belgium logistics section states the Cyprus/Belgium/3PL relationship accurately', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/how-it-works');
  await expect(page.getByRole('heading', { name: /Headquartered in Cyprus/ })).toBeVisible();
  await expect(page.getByText('Headquartered in Cyprus, PHARMA26 LTD benefits from warehousing facilities in Belgium through a trusted third-party logistics provider.')).toBeVisible();
  await expect(page.getByText('Our products are stored in Belgium, allowing us to coordinate European and international B2B shipments efficiently.')).toBeVisible();
  await expect(page.getByText('PHARMA26 does not own or directly operate the warehouse.')).toBeVisible();
  await expect(page.locator('.logistics-facts')).toContainText('Cyprus');
  await expect(page.locator('.logistics-facts')).toContainText('Belgium');
  await expect(page.locator('.logistics-facts')).toContainText('Third-party logistics provider');
  await expect(page.locator('.warehouse-visual img')).toHaveAttribute('src', '/images/belgium-3pl-warehouse.webp');
  await expect(page.locator('.warehouse-visual figcaption')).toContainText('not a photograph of the specific facility');
});

test('logistics page remains responsive and the CTA preserves contact integration', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const width of [1440, 1024, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/how-it-works');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  await page.getByRole('link', { name: 'Contact our trading team' }).click();
  await expect(page).toHaveURL(/\/contact$/);
  await expect(page.locator('form')).toHaveAttribute('action', 'https://formspree.io/f/xqegzjoz');
});

test('site copy no longer claims warehouses in Paris or Cyprus', async ({ page }) => {
  for (const path of ['/', '/about', '/how-it-works']) {
    await page.goto(path);
    await expect(page.locator('body')).not.toContainText('warehouses in Paris and Cyprus');
    await expect(page.locator('body')).not.toContainText('our own warehouse');
    await expect(page.locator('body')).not.toContainText('our Belgian distribution center');
  }
});
