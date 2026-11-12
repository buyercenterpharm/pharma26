import { test, expect } from '@playwright/test';

const key='pharma26.global-intro.v1';
test('3D sequence ends within six seconds, shows official logo, and restores the site',async({page})=>{
  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('/');await expect(page.locator('.intro-playing')).toBeVisible();
  const start=Date.now();
  await expect(page.locator('.intro-canvas canvas')).toBeVisible();
  expect(await page.locator('#site-content').evaluate((e:HTMLElement)=>e.inert)).toBe(true);
  await expect(page.getByRole('button',{name:'Skip Intro'})).toBeFocused();
  await expect(page.locator('.intro-full-logo')).toHaveAttribute('src','/logo.png');
  await expect.poll(()=>page.locator('.intro-full-logo').evaluate(e=>Number(getComputedStyle(e).opacity)),{timeout:6000,intervals:[80]}).toBeGreaterThan(.8);
  await page.waitForTimeout(400);
  await expect(page.locator('.intro-full-logo')).toBeVisible();
  await expect(page.locator('.global-intro')).toHaveCount(0,{timeout:2000});
  expect(Date.now()-start).toBeLessThan(6500);
  expect(await page.locator('#site-content').evaluate((e:HTMLElement)=>e.inert)).toBe(false);
  expect(await page.evaluate(()=>document.body.style.overflow)).not.toBe('hidden');
  expect(errors).toEqual([]);
});
test('skip, keyboard focus and once-per-session behavior',async({page})=>{
  await page.goto('/');await expect(page.locator('.intro-playing')).toBeVisible();
  await page.keyboard.press('Tab');await expect(page.getByRole('button',{name:'Skip Intro'})).toBeFocused();
  await page.getByRole('button',{name:'Skip Intro'}).click();await expect(page.locator('.global-intro')).toHaveCount(0);
  await expect(page.locator('.premium-logo')).toBeFocused();
  await page.reload();await page.waitForTimeout(2000);await expect(page.locator('.global-intro')).toHaveCount(0);
  expect(await page.evaluate(k=>sessionStorage.getItem(k),key)).toBe('seen');
});
test('Escape dismisses the introduction',async({page})=>{
  await page.goto('/');await expect(page.locator('.intro-playing')).toBeVisible();await page.keyboard.press('Escape');await expect(page.locator('.global-intro')).toHaveCount(0);
});
test('reduced motion bypasses intro and Three.js download',async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});const chunks:string[]=[];page.on('request',r=>{if(r.url().includes('globeScene'))chunks.push(r.url());});
  await page.goto('/');await expect(page.locator('h1')).toBeVisible();await page.waitForTimeout(300);
  await expect(page.locator('.global-intro')).toHaveCount(0);expect(chunks).toEqual([]);
});
test('mobile uses short official-logo alternative without WebGL',async({page})=>{
  await page.setViewportSize({width:390,height:844});const chunks:string[]=[];page.on('request',r=>{if(r.url().includes('globeScene'))chunks.push(r.url());});
  await page.goto('/');await expect(page.locator('.intro-compact.intro-playing')).toBeVisible();
  await expect(page.locator('.intro-full-logo')).toBeVisible();await expect(page.locator('canvas')).toHaveCount(0);
  await expect(page.locator('.global-intro')).toHaveCount(0,{timeout:2500});expect(chunks).toEqual([]);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
test('slow preparation never blocks homepage, and user navigation cancels it',async({page})=>{
  await page.route('**/textures/**',async route=>{await new Promise(r=>setTimeout(r,2500));await route.abort();});
  await page.goto('/');await expect(page.locator('h1')).toBeVisible();
  expect(await page.locator('#site-content').evaluate((e:HTMLElement)=>e.inert)).toBe(false);
  await page.getByRole('link',{name:'Request a Quote'}).click();await expect(page).toHaveURL(/\/contact$/);
  await expect(page.locator('.global-intro')).toHaveCount(0);
});
test('missing assets fail open',async({page})=>{
  await page.route('**/textures/**',route=>route.abort());await page.goto('/');await page.waitForTimeout(2200);
  await expect(page.locator('.global-intro')).toHaveCount(0);await expect(page.getByRole('link',{name:'Request a Quote'})).toBeVisible();
  expect(await page.locator('#site-content').evaluate((e:HTMLElement)=>e.inert)).toBe(false);
});
test('unavailable WebGL and restricted storage fail open',async({page})=>{
  await page.addInitScript(()=>{const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){if(String(type).includes('webgl'))return null;return original.call(this,type,...args);} as typeof original;});
  await page.goto('/');await page.waitForTimeout(2200);await expect(page.locator('.global-intro')).toHaveCount(0);
  await page.addInitScript(()=>{Object.defineProperty(window,'sessionStorage',{get(){throw new Error('blocked');}});});
  await page.reload();await expect(page.locator('h1')).toBeVisible();await expect(page.locator('.global-intro')).toHaveCount(0);
});
test('other routes and contact form are preserved',async({page})=>{
  for(const path of ['/about','/products','/how-it-works','/contact']){
    await page.goto(path);await expect(page.locator('h1')).toBeVisible();await expect(page.locator('.global-intro')).toHaveCount(0);
  }
  await expect(page.locator('form')).toHaveAttribute('action','https://formspree.io/f/xqegzjoz');
  await expect(page.locator('form')).toHaveAttribute('method','POST');
});
