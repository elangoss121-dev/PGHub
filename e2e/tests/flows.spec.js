const { test, expect } = require('@playwright/test');

const adminUser = {
  id: '1',
  email: 'sivakumarelango10@gmail.com',
  name: 'Sivakumar',
  role: 'admin',
  adminRole: 'super_admin',
  status: 'active',
  createdAt: '2024-01-01',
  phone: '+91 6379883404',
};

const residentUser = {
  id: '6',
  email: 'rahul@email.com',
  name: 'Rahul Sharma',
  role: 'resident',
  status: 'active',
  createdAt: '2024-01-15',
  phone: '+91 98765 43210',
  room: '201',
  bed: 'A',
};

async function injectUser(page, user) {
  await page.addInitScript({
    content: `window.localStorage.setItem('pghub_user', ${JSON.stringify(JSON.stringify(user))})`,
  });
}

test.describe('PGHub smoke flows', () => {
  test('Home navigation works', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('link', { name: 'Login' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Register' }).first()).toBeVisible();
    await page.getByRole('link', { name: 'Login' }).first().click();
    await expect(page).toHaveURL(/\/login/);
    await page.goBack();
    await page.getByRole('link', { name: 'Register' }).first().click();
    await expect(page).toHaveURL(/\/register/);
  });

  test('Login works and redirects to admin dashboard', async ({ page }) => {
    await page.goto('/login');
    await page.getByRole('button', { name: 'Admin' }).click();
    await page.getByPlaceholder('you@example.com').fill('sivakumarelango10@gmail.com');
    await page.getByPlaceholder('••••••••').fill('Manju1303');
    await page.getByRole('button', { name: /Sign In/i }).click();
    await expect(page).toHaveURL(/\/admin\/dashboard/);
    await expect(page.getByRole('heading', { name: /Dashboard/i })).toBeVisible();
  });

  test('Register wizard progresses and reaches pending approval', async ({ page }) => {
    await page.goto('/register');
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByPlaceholder('A-204').fill('A-101');
    await page.getByPlaceholder('Bed 1').fill('B1');
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByRole('button', { name: 'Professional' }).click();
    await page.getByPlaceholder('Start typing, e.g. Infos...').fill('Infosys');
    await page.getByRole('button', { name: 'Register' }).click();
    await expect(page).toHaveURL(/\/pending-approval/);
    await expect(page.getByText('Pending Approval')).toBeVisible();
  });

  test('Resident complaint submission and detail view works', async ({ page }) => {
    await injectUser(page, residentUser);
    await page.goto('/resident/complaints');
    await page.getByRole('button', { name: 'New Complaint' }).click();
    await page.getByPlaceholder('Brief description of the issue').fill('Test complaint title');
    await page.getByPlaceholder('Describe the issue in detail...').fill('The AC is not cooling and needs service.');
    await page.getByRole('button', { name: 'Submit Complaint' }).click();
    await expect(page.getByRole('heading', { name: 'Submit New Complaint' })).toBeHidden();
    await page.locator('button:has-text("Food quality in dinner was below standard")').first().click();
    await expect(page.locator('text=Admin Response')).toBeVisible();
    await expect(page.locator('text=We apologize for the inconvenience. Kitchen staff has been instructed.')).toBeVisible();
  });

  test('Resident settings open change password modal and close it', async ({ page }) => {
    await injectUser(page, residentUser);
    await page.goto('/resident/settings');
    await page.getByRole('button', { name: 'Change Password' }).first().click();
    await expect(page.getByRole('heading', { name: 'Change Password' })).toBeVisible();
    await page.getByRole('button', { name: 'Cancel' }).last().click();
    await expect(page.getByRole('heading', { name: 'Change Password' })).toBeHidden();
  });

  test('Admin user management dialog and add resident works', async ({ page }) => {
    await injectUser(page, adminUser);
    await page.goto('/admin/users');
    await page.getByRole('button', { name: 'Add User' }).click();
    await page.locator('input[placeholder="John Doe"]').fill('Test Resident');
    await page.locator('input[placeholder="john@example.com"]').fill('testresident@example.com');
    await page.locator('input[placeholder="+91 98765 43210"]').fill('+91 90000 00000');
    await page.locator('input[placeholder="201"]').fill('301');
    await page.locator('input[placeholder="A"]').fill('D');
    await page.locator('button:has-text("Add User")').last().click();
    await expect(page.getByText('Test Resident')).toBeVisible();
    await page.getByPlaceholder('Search by name, email, or room...').fill('Test Resident');
    await expect(page.getByText('Test Resident')).toBeVisible();
  });

  test('Admin complaints view details dialog works', async ({ page }) => {
    await injectUser(page, adminUser);
    await page.goto('/admin/complaints');
    await page.getByPlaceholder('Search by title, ID, or user...').fill('AC not working');
    await expect(page.getByText('AC not working properly')).toBeVisible();
    await page.getByRole('button', { name: 'View Details' }).first().click();
    await expect(page.getByText('Add Response')).toBeVisible();
    await page.getByRole('button', { name: 'Send Response' }).click();
  });

  test('API /api/suggest responds', async ({ request }) => {
    const res = await request.post('/api/suggest', { data: { q: 'playwright test' } });
    expect(res.status()).toBe(200);
    const json = await res.json();
    expect(json).toBeTruthy();
    expect(Object.prototype.hasOwnProperty.call(json, 'suggestions')).toBe(true);
  });
});
