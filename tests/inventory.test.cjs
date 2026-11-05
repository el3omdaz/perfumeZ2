const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync('js/inventory.js', 'utf8');
const priceSource = fs.readFileSync('js/kuwait-prices.js', 'utf8');
const key = 'kuwait_perfume_manager_v3';

function app(saved) {
  const storage = new Map(saved === undefined ? [] : [[key, JSON.stringify(saved)]]);
  const elements = new Map();
  const element = id => {
    if (!elements.has(id)) elements.set(id, { innerHTML: '', style: {}, value: '',
      classList: { add() {}, remove() {}, toggle() {} }, scrollIntoView() {} });
    return elements.get(id);
  };
  const context = vm.createContext({ document: { getElementById: element },
    localStorage: { getItem: k => storage.get(k), setItem: (k, v) => storage.set(k, v) },
    setTimeout() {}, clearTimeout() {}, console, alert(message) { throw Error(message); }, confirm: () => true });
  vm.runInContext(priceSource + '\n' + source + '\nthis.inv = INV;', context);
  context.inv.init();
  return { inv: context.inv, element, items: () => JSON.parse(storage.get(key)) };
}

test('default inventory moves 25 matches and adds 36 missing label perfumes without duplicates', () => {
  const a = app();
  const items = a.items();
  assert.equal(items.filter(x => x.ownCollection).length, 61);
  assert.equal(new Set(items.map(x => x.id)).size, items.length);
  assert.equal(items.filter(x => x.ownCollection && !x.id.startsWith('own_')).length, 25);
  assert.equal(items.find(x => x.name === 'Libre Intense').ownCollection, false);
  assert.equal(items.find(x => x.name === 'Libre').ownCollection, true);
  assert.equal(items.find(x => x.name === 'Invictus Victory').ownCollection, false);
  assert.equal(items.find(x => x.name === 'Invictus Victory Elixir').ownCollection, true);
  const html = a.element('inv-list').innerHTML;
  assert.equal((html.match(/id="inv-i-/g) || []).length, items.length);
  a.inv.setCollection('own');
  assert.equal((a.element('inv-list').innerHTML.match(/id="inv-i-/g) || []).length, 61);
});

test('migration preserves existing data and matches accented and alternate brand names', () => {
  const original = { id: 'old', brand: 'YSL', name: 'Black Opium', gender: 'نسائي',
    cost50: '12.5', notes: 'ملاحظاتي', purchased: true, priority: 3, stage: 'المرحلة الثانية' };
  const a = app([original, { id: 'si', brand: 'Giorgio Armani', name: 'Si' }]);
  const migrated = a.items().find(x => x.id === 'old');
  for (const field of Object.keys(original)) assert.equal(migrated[field], original[field]);
  assert.equal(migrated.ownCollection, true);
  assert.equal(a.items().filter(x => /s[iì]$/i.test(x.name)).length, 1);
  a.inv.toggleCollection('old');
  const b = app(a.items());
  assert.equal(b.items().find(x => x.id === 'old').ownCollection, false);
  b.inv.remove('si');
  assert.equal(app(b.items()).items().some(x => x.id === 'si' || x.name === 'Sì'), false);
});

test('section changes preserve filters, transfers preserve purchase data and totals', () => {
  const a = app();
  const before = a.items();
  const item = before.find(x => x.name === 'Good Girl');
  a.inv.setState(item.id, 'purchased');
  a.inv.setField(item.id, 'cost50', '8.75');
  a.inv.toggleCollection(item.id);
  const moved = a.items().find(x => x.id === item.id);
  assert.equal(moved.cost50, '8.75');
  assert.equal(moved.purchased, true);
  assert.equal(a.items().length, before.length);
  a.inv.toggleCollection(item.id);
  a.inv.setCollection('own');
  a.inv.setView('نسائي');
  assert.match(a.element('inv-list-title').textContent, /الخاص بنا/);
  a.inv.setFilter('search', 'Libre');
  assert.match(a.element('inv-list').innerHTML, /Libre/);
  assert.doesNotMatch(a.element('inv-list').innerHTML, /Libre Intense/);
  a.inv.setCollection('general');
  assert.match(a.element('inv-list').innerHTML, /Libre Intense/);
});

test('empty saved inventory remains empty after reload', () => {
  assert.deepEqual(app([]).items(), []);
});

test('market catalogue covers 98 perfumes with 97 sourced bottle prices and one unresolved edition', () => {
  const prices = vm.runInNewContext(priceSource + '\nKUWAIT_PRICES;');
  assert.equal(prices.length, 98);
  assert.equal(prices.filter(x => x.priceKwd > 0).length, 97);
  for (const price of prices.filter(x => x.priceKwd > 0)) {
    assert.ok(Number.isFinite(price.priceKwd));
    assert.ok(price.sizeMl >= 50 && price.sizeMl <= 200);
    assert.equal(new URL(price.sourceUrl).protocol, 'https:');
    assert.ok(price.store);
    assert.equal(price.checkedAt, '2026-11-06');
  }
  const a = app();
  assert.match(a.element('inv-market-note').textContent, /97 من 98/);
  a.inv.setFilter('price', 'missing');
  assert.match(a.element('inv-list').innerHTML, /Erba Pura Style/);
  assert.equal((a.element('inv-list').innerHTML.match(/id="inv-i-/g) || []).length, 1);
});

test('reference prices match saved custom IDs without overwriting oil costs or user state', () => {
  const original = { id: 'my-explorer', brand: 'Montblanc', name: 'Explorer', ownCollection: true,
    cost50: '8.75', notes: 'تكلفة المورد', purchased: true, stage: 'المرحلة الثانية' };
  const a = app([original]);
  for (const field of Object.keys(original)) assert.equal(a.items()[0][field], original[field]);
  assert.match(a.element('inv-list').innerHTML, /21\.6/);
  assert.match(a.element('inv-stats').innerHTML, /8\.75/);
  assert.doesNotMatch(a.element('inv-stats').innerHTML, /21\.6/);
  a.inv.toggle('my-explorer');
  const html = a.element('inv-list').innerHTML;
  assert.match(html, /https:\/\/www.xcite.com\/montblanc-explorer-edp-100ml-perfume-men\/p/);
  assert.match(html, /2026-11-06/);
  assert.match(html, /100 مل/);
  assert.match(html, /تكلفة الزيت 50 مل/);
  assert.equal(app(a.items()).items()[0].cost50, '8.75');
});

test('budget filter uses actual bottle prices, combines with sections, and clears correctly', () => {
  const a = app();
  a.inv.setCollection('own');
  a.inv.setFilter('price', 'under30');
  const html = a.element('inv-list').innerHTML;
  assert.match(html, /Explorer/);
  assert.match(html, /Cedrat Boise/);
  assert.doesNotMatch(html, /Baccarat Rouge/);
  assert.doesNotMatch(html, /Erba Pura Style/);
  assert.doesNotMatch(html, /Dylan Blue/);
  a.inv.setCollection('general');
  assert.match(a.element('inv-list').innerHTML, /Dylan Blue/);
  a.inv.clearFilters();
  assert.match(a.element('inv-list').innerHTML, /Baccarat Rouge/);
  assert.equal(a.element('inv-f-price').value, 'all');
  a.inv.setFilter('price', 'missing');
  assert.equal(a.inv.back(), true);
  assert.match(a.element('inv-list').innerHTML, /Explorer/);
});
