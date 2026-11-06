import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('marking references', () => {
  assert.equal(api.decodeCapacitor('104'), 100000);
  assert.equal(api.decodeCapacitor('472'), 4700);
  assert.equal(api.encodeCapacitor(4700), '472');
});
test('farad conversion', () => {
  assert.equal(api.capacitanceFarads(1e12), 1);
});
test('circuit references', () => {
  assert.equal(api.parallelCapacitance([10, 20, 30]), 60);
  assert.equal(api.seriesCapacitance([100, 100]), 50);
});
test('strict markings', () => {
  for (const t of ['', '04', '010', '104\n', '10A', ' 104'])
    assert.throws(() => api.decodeCapacitor(t));
});
test('representation and numeric validation', () => {
  assert.throws(() => api.encodeCapacitor(123));
  assert.throws(() => api.encodeCapacitor(1));
  assert.throws(() => api.seriesCapacitance([0]));
  assert.throws(() => api.parallelCapacitance([NaN]));
});
test('complete decimal marking space', () => {
  for (let d = 10; d <= 99; d++)
    for (let e = 0; e <= 9; e++) {
      const code = String(d) + e;
      assert.equal(api.decodeCapacitor(code), d * 10 ** e);
      assert.equal(api.decodeCapacitor(api.encodeCapacitor(d * 10 ** e)), d * 10 ** e);
    }
});
