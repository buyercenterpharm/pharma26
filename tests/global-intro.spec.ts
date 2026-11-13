import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';

const intro = '.video-intro';
test('supplied MP4 plays fully and reveals the official logo at its ending', async ({ page }) => {
  const errors: string[] = []; page.on('pageerror', e => errors.push(e.message));
  await page.goto('/'); await expect(page.locator(intro)).toHaveAttribute('data-phase', 'playing');
  const video = page.locator('.intro-film-frame video');
  const metadata = await video.evaluate((v: HTMLVideoElement) => ({ width:v.videoWidth, height:v.videoHeight, duration:v.duration, muted:v.muted, loop:v.loop, inline:v.playsInline, src:v.currentSrc }));
  expect(metadata.width).toBe(1280); expect(metadata.height).toBe(720);
  expect(metadata.duration).toBeGreaterThan(9.9); expect(metadata.duration).toBeLessThan(10.1);
  expect(metadata.muted).toBe(true); expect(metadata.loop).toBe(false); expect(metadata.inline).toBe(true);
  expect(metadata.src).toContain('/video/global-connections.mp4');
  await expect(page.getByRole('button', { name:'Skip Intro' })).toBeFocused();
  await expect(page.locator('.intro-full-logo')).toHaveAttribute('src','/logo.png');
  await expect.poll(() => video.evaluate((v: HTMLVideoElement) => v.currentTime), {timeout:9000}).toBeGreaterThan(6);
  expect(await page.locator('.intro-full-logo').evaluate(e => Number(getComputedStyle(e).opacity))).toBe(0);
  expect(await video.evaluate((v: HTMLVideoElement) => v.getVideoPlaybackQuality().totalVideoFrames)).toBeGreaterThan(20);
  await expect.poll(() => page.locator('.intro-full-logo').evaluate(e => Number(getComputedStyle(e).opacity)), {timeout:3000}).toBeGreaterThan(.95);
  const revealTime = await video.evaluate((v: HTMLVideoElement) => v.currentTime);
  expect(revealTime).toBeGreaterThan(7.7); expect(revealTime).toBeLessThan(9);
  await page.waitForTimeout(400); await expect(page.locator('.intro-full-logo')).toBeVisible();
  await expect(page.locator(intro)).toHaveAttribute('data-phase','exiting',{timeout:4000});
  expect(await video.evaluate((v: HTMLVideoElement) => v.ended)).toBe(true);
  await expect(page.locator(intro)).toHaveCount(0);
  expect(await page.locator('#site-content').evaluate((e:HTMLElement)=>e.inert)).toBe(false);
  expect(errors).toEqual([]);
});
test('skip, Escape, focus and session persistence', async ({page}) => {
  await page.goto('/'); await expect(page.locator(intro)).toHaveAttribute('data-phase','playing');
  await page.keyboard.press('Tab'); await expect(page.getByRole('button',{name:'Skip Intro'})).toBeFocused();
  await page.getByRole('button',{name:'Skip Intro'}).click(); await expect(page.locator(intro)).toHaveCount(0);
  await expect(page.locator('.premium-logo')).toBeFocused();
  const requests:string[]=[];page.on('request',r=>{if(r.url().endsWith('.mp4'))requests.push(r.url());});
  await page.reload();await page.waitForTimeout(300);await expect(page.locator(intro)).toHaveCount(0);expect(requests).toEqual([]);
  await page.evaluate(()=>sessionStorage.clear());await page.reload();await expect(page.locator(intro)).toHaveAttribute('data-phase','playing');
  await page.keyboard.press('Escape');await expect(page.locator(intro)).toHaveCount(0);
});
test('reduced motion bypasses intro and media download',async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});const media:string[]=[];page.on('request',r=>{if(r.url().endsWith('.mp4'))media.push(r.url());});
  await page.goto('/');await expect(page.locator('h1')).toBeVisible();await page.waitForTimeout(300);
  await expect(page.locator(intro)).toHaveCount(0);expect(media).toEqual([]);
});
test('mobile plays inline with original aspect ratio and synchronized logo',async({page})=>{
  await page.setViewportSize({width:390,height:844});await page.goto('/');await expect(page.locator(intro)).toHaveAttribute('data-phase','playing');
  const video=page.locator('.intro-film-frame video');await expect.poll(()=>video.evaluate((v:HTMLVideoElement)=>v.currentTime)).toBeGreaterThan(.5);
  const box=await video.boundingBox();expect(box!.width/box!.height).toBeCloseTo(16/9,2);
  expect(await video.evaluate((v:HTMLVideoElement)=>v.muted&&v.playsInline)).toBe(true);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await video.evaluate((v:HTMLVideoElement)=>{v.currentTime=7.9;});
  await expect.poll(()=>page.locator('.intro-full-logo').evaluate(e=>Number(getComputedStyle(e).opacity))).toBeGreaterThan(.95);
  await page.getByRole('button',{name:'Skip Intro'}).click();await expect(page.locator(intro)).toHaveCount(0);
});
test('preparation shows a dark curtain immediately and Skip Intro preserves access',async({page})=>{
  await page.route('**/video/*.mp4',async route=>{await new Promise(r=>setTimeout(r,3500));await route.abort();});
  await page.goto('/');
  await expect(page.locator(intro)).toHaveAttribute('data-phase','preparing');
  await expect(page.locator(intro)).toHaveCSS('opacity','1');
  await expect(page.locator(intro)).toHaveCSS('background-color','rgb(8, 15, 25)');
  expect(await page.locator('#site-content').evaluate((e:HTMLElement)=>e.inert)).toBe(true);
  await page.getByRole('button',{name:'Skip Intro'}).click();
  await page.getByRole('link',{name:'Request a Quote'}).click();await expect(page).toHaveURL(/\/contact$/);
});
test('HTML curtain precedes application JavaScript and can be skipped',async({page})=>{
  await page.route('**/assets/index-*.js',async route=>{await new Promise(r=>setTimeout(r,2200));await route.continue();});
  await page.goto('/',{waitUntil:'commit'});
  await expect(page.locator('#intro-boot')).toBeVisible();
  await expect(page.locator('#root')).toHaveCSS('visibility','hidden');
  await page.locator('#intro-boot button').click();
  await expect(page.locator('#intro-boot')).toHaveCount(0);
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator(intro)).toHaveCount(0);
});
test('failed video uses a short static official-logo fallback',async({page})=>{
  await page.route('**/video/*.mp4',route=>route.abort());await page.goto('/');
  await expect(page.locator(intro)).toHaveAttribute('data-phase','fallback');await expect(page.locator('.intro-full-logo')).toBeVisible();
  await expect(page.locator('.intro-full-logo')).toHaveAttribute('src','/logo.png');
  await expect(page.locator(intro)).toHaveCount(0,{timeout:3000});
  expect(await page.locator('#site-content').evaluate((e:HTMLElement)=>e.inert)).toBe(false);
});
test('autoplay rejection uses the static fallback',async({page})=>{
  await page.addInitScript(()=>{HTMLMediaElement.prototype.play=()=>Promise.reject(new DOMException('Autoplay denied','NotAllowedError'));});
  await page.goto('/');await expect(page.locator(intro)).toHaveAttribute('data-phase','fallback');
  await page.keyboard.press('Escape');await expect(page.locator(intro)).toHaveCount(0);
});
test('Vercel serves the SPA entry point for direct application routes',()=>{
  const config=JSON.parse(readFileSync(new URL('../vercel.json',import.meta.url),'utf8'));
  expect(config.rewrites).toContainEqual({source:'/(.*)',destination:'/index.html'});
});
test('no Three.js requests, and direct routes, refreshes and forms remain intact',async({page})=>{
  const three:string[]=[];page.on('request',r=>{if(/globeScene|earth-land|earth-relief|three\.js/.test(r.url()))three.push(r.url());});
  for(const path of ['/about','/products','/brands','/how-it-works','/contact']){await page.goto(path);await expect(page.locator('h1')).toBeVisible();await page.reload();await expect(page.locator('h1')).toBeVisible();await expect(page.locator(intro)).toHaveCount(0);}
  await expect(page.locator('form')).toHaveAttribute('action','https://formspree.io/f/xqegzjoz');await expect(page.locator('form')).toHaveAttribute('method','POST');
  await page.goto('/');await expect(page.locator(intro)).toHaveAttribute('data-phase','playing');expect(three).toEqual([]);
});
