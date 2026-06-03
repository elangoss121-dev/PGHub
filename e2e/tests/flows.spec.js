const { test, expect } = require('@playwright/test');

test.describe('PGHub smoke flows', () => {
  test('Home shows login and register links', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=Login').first()).toBeVisible();
    await expect(page.locator('text=Register').first()).toBeVisible();
  });

  test('Login page has form controls', async ({ page }) => {
    await page.goto('/login');
    await expect(page.locator('form')).toBeVisible();
    await expect(page.locator('input[type="email"]')).toHaveCount(1);
    await expect(page.locator('input[type="password"]')).toHaveCount(1);
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('Admin dashboard loads and shows key sections', async ({ page }) => {
    // Inject a demo admin session so the admin layout does not redirect
    const adminUser = {
      id: '1',
      email: 'sivakumarelango10@gmail.com',
      name: 'Sivakumar',
      role: 'admin',
      adminRole: 'super_admin',
      status: 'active',
      createdAt: '2024-01-01',
      phone: '+91 6379883404'
    };
    await page.addInitScript({ content: `window.localStorage.setItem('pghub_user', ${JSON.stringify(JSON.stringify(adminUser))})` });
    await page.goto('/admin/dashboard');
    await expect(page.locator('text=Payment Overview')).toBeVisible();
    await expect(page.locator('text=Recent Registrations')).toBeVisible();
  });

  test('Resident profile shows Save Changes button after edit', async ({ page }) => {
    // Inject a demo resident session so profile loads as an authenticated user
    const residentUser = {
      id: '6',
      email: 'rahul@email.com',
      name: 'Rahul Sharma',
      role: 'resident',
      status: 'active',
      createdAt: '2024-01-15',
      phone: '+91 98765 43210',
      room: '201',
      bed: 'A'
    };
    await page.addInitScript({ content: `window.localStorage.setItem('pghub_user', ${JSON.stringify(JSON.stringify(residentUser))})` });
    await page.goto('/resident/profile');
    // Click the Edit Profile button to expose save/cancel actions
    await page.locator('text=Edit Profile').first().click();
    await expect(page.locator('text=Save Changes')).toBeVisible();
  });

  test('API /api/suggest responds', async ({ request }) => {
    const res = await request.post('/api/suggest', { data: { q: 'playwright test' } });
    expect(res.status()).toBe(200);
    const json = await res.json();
    expect(json).toBeTruthy();
    expect(Object.prototype.hasOwnProperty.call(json, 'suggestions')).toBe(true);
  });
});
