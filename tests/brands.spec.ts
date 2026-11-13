import { test, expect } from '@playwright/test';
import { bestDealBrandIds, brands, brandCategories, categoryCount, findBrands } from '../src/data/brands';

test('catalogue has the complete category counts and one record per brand', () => {
  expect(brands).toHaveLength(78); expect(new Set(brands.map(b=>b.id)).size).toBe(78);
  expect(new Set(brands.map(b=>b.name)).size).toBe(78);
  expect(brandCategories.map(c=>categoryCount(c.id))).toEqual([30,15,4,11,5,14]);
  expect(brands.reduce((total,b)=>total+b.categories.length,0)).toBe(79);
  expect(brands.find(b=>b.name==='Chanel')?.categories).toEqual(['cosmetics','perfumes']);
  expect(brands.find(b=>b.id==='molnlycke')?.name).toBe('Mölnlycke');
  expect(brands.find(b=>b.id==='eneomey')?.name).toBe('ENEOMEY');
  expect(brands.filter(b=>b.logo)).toHaveLength(0);
  expect(bestDealBrandIds).toEqual(['la-roche-posay','vichy','uriage','filorga','caudalie','embryolisse','darphin','isdin','melvita','skinceuticals','eucerin','cerave','avene','biotherm','lierac','roge-cavailles','bioderma']);
  expect(new Set(findBrands('best-deals','').map(brand=>brand.id)).size).toBe(17);
});
test('all brands and all category filters display correct counts without duplicate Chanel',async({page})=>{
  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('/brands');await expect(page.getByRole('heading',{level:1})).toContainText('Brands & Products');
  await expect(page.locator('.product-category-grid button')).toHaveCount(6);
  await expect(page.locator('.brand-card')).toHaveCount(78);await expect(page.locator('[data-brand-id="chanel"]')).toHaveCount(1);
  await expect(page.locator('.video-intro')).toHaveCount(0);
  for(const c of brandCategories){
    const button=page.getByRole('button',{name:new RegExp('^'+c.label+' ')});
    await button.click();await expect(button).toHaveAttribute('aria-pressed','true');
    await expect(page.locator('.brand-card')).toHaveCount(categoryCount(c.id));
  }
  await expect(page.locator('.brand-card img')).toHaveCount(0);expect(errors).toEqual([]);
});
test('Best Deals filter contains exactly the confirmed seventeen brands and combines with search',async({page})=>{
  await page.goto('/brands');
  const filter=page.getByRole('button',{name:/^Best Deals/});
  await expect(filter).toBeVisible();
  const all=page.getByRole('button',{name:/^All brands/});
  await expect(filter.evaluate((element,allElement)=>Boolean(allElement && allElement.nextElementSibling===element),await all.elementHandle())).resolves.toBe(true);
  await filter.click();
  await expect(page).toHaveURL(/category=best-deals/);
  await expect(filter).toHaveAttribute('aria-pressed','true');
  await expect(page.locator('.brand-card')).toHaveCount(17);
  await expect(page.locator('.best-deal-badge')).toHaveCount(17);
  await expect(page.getByText('Explore our selection of brands with particularly competitive B2B sourcing conditions.')).toBeVisible();
  expect(await page.locator('.brand-grid>li').evaluateAll(elements=>elements.map(element=>element.getAttribute('data-brand-id')))).toEqual([...bestDealBrandIds].sort((a,b)=>brands.find(brand=>brand.id===a)!.name.localeCompare(brands.find(brand=>brand.id===b)!.name,'en',{sensitivity:'base'})));
  await page.getByRole('searchbox',{name:'Search brands'}).fill('Eucerin');
  await expect(page.locator('.brand-card')).toHaveCount(1);
  await expect(page.locator('[data-brand-id="eucerin"] .best-deal-badge')).toBeVisible();
  await page.getByRole('button',{name:/^Dermocosmetics /}).click();
  await expect(page.locator('.brand-card')).toHaveCount(1);
});
test('search ignores accents/punctuation, accepts confirmed-name aliases and combines with categories',async({page})=>{
  await page.goto('/brands');const search=page.getByRole('searchbox',{name:'Search brands'});
  for(const [query,name] of [['avene','Avène'],['kerastase','Kérastase'],['molnycke','Mölnlycke'],['eneomay','ENEOMEY'],["l occitane","L'Occitane"]]){
    await search.fill(query);await expect(page.locator('.brand-card')).toHaveCount(1);await expect(page.locator('.brand-card h3')).toHaveText(name);
  }
  await search.fill('chanel');await page.getByRole('button',{name:/^Perfumes /}).click();await expect(page.locator('.brand-card')).toHaveCount(1);
  await page.reload();await expect(search).toHaveValue('chanel');await expect(page.getByRole('button',{name:/^Perfumes /})).toHaveAttribute('aria-pressed','true');
  await page.getByRole('button',{name:/^Pharmacy /}).click();await expect(page.getByText('No brands match your search.')).toBeVisible();
  await page.getByRole('button',{name:'Reset all filters'}).click();await expect(page.locator('.brand-card')).toHaveCount(78);await expect(search).toHaveValue('');
  await search.fill('unknownbrandxyz');await page.getByRole('button',{name:'Clear search'}).click();await expect(page.locator('.brand-card')).toHaveCount(78);
});
test('filter URL and invalid-category fallback',async({page})=>{
  await page.goto('/brands?category=professional-haircare&q=rene');await expect(page.locator('.brand-card h3')).toHaveText('René Furterer');
  await page.goto('/brands?category=not-a-category');await expect(page.locator('.brand-card')).toHaveCount(78);
  expect(findBrands('all','roge cavailles').map(b=>b.name)).toEqual(['Rogé Cavaillès']);
});
test('desktop/mobile navigation, responsive layouts and reduced-motion rendering',async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});
  for(const width of [1440,1024,900,768,390,320]){
    await page.setViewportSize({width,height:900});await page.goto('/brands');
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    if(width<900){await page.getByRole('button',{name:'Open menu'}).click();await page.locator('#mobile-navigation').getByRole('link',{name:'Brands & Products'}).click();await expect(page.getByRole('button',{name:'Open menu'})).toHaveAttribute('aria-expanded','false');}
    else await expect(page.locator('.desktop-links').getByRole('link',{name:'Brands & Products'})).toBeVisible();
  }
  await page.getByRole('link',{name:'Request a Quote'}).click();await expect(page).toHaveURL(/\/contact$/);
  await expect(page.locator('form')).toHaveAttribute('action','https://formspree.io/f/xqegzjoz');
});
test('visual category cards filter the catalogue and the legacy products URL redirects',async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/brands');
  await page.locator('.product-category-grid [data-category="perfumes"]').click();
  await expect(page).toHaveURL(/\/brands\?category=perfumes$/);
  await expect(page.getByRole('button',{name:/^Perfumes /})).toHaveAttribute('aria-pressed','true');
  await expect(page.locator('.brand-card')).toHaveCount(4);
  await page.goto('/products');await expect(page).toHaveURL(/\/brands$/);
  await expect(page.getByRole('heading',{level:1})).toContainText('Brands & Products');
});
test('homepage showcase links to the catalogue and carries the sourcing disclaimer',async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/');
  await expect(page.getByRole('heading',{name:'Brands We Source'})).toBeVisible();
  await expect(page.locator('.showcase-grid li')).toHaveCount(8);await expect(page.locator('.showcase-grid img')).toHaveCount(0);
  await expect(page.locator('.brands-showcase .brand-disclaimer')).toContainText('do not imply official affiliation or endorsement');
  await page.getByRole('link',{name:'Explore all 78 brands'}).click();await expect(page).toHaveURL(/\/brands$/);
  await expect(page.locator('.brand-disclaimer')).toContainText('subject to sourcing and market conditions');
});
