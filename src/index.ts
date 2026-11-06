function finite(value: number, min = -Number.MAX_VALUE, max = Number.MAX_VALUE): number {
  if (typeof value !== 'number' || !Number.isFinite(value))
    throw new TypeError('Expected finite number');
  if (value < min || value > max) throw new RangeError('Number outside supported bounds');
  return value;
}
function integer(value: number, min = 0, max = 1000000): number {
  if (!Number.isSafeInteger(value)) throw new RangeError('Expected safe integer');
  return finite(value, min, max);
}
function strictText(value: string, max = 16384): void {
  if (typeof value !== 'string') throw new TypeError('Expected string');
  if (value.length > max) throw new RangeError('Text length budget exceeded');
}
export function decodeCapacitor(code: string): number {
  strictText(code, 3);
  if (code.length !== 3 || /[^0-9]/.test(code) || code[0] === '0')
    throw new RangeError('Three digits with nonzero first required');
  return Number(code.slice(0, 2)) * 10 ** Number(code[2]);
}
export function encodeCapacitor(picofarads: number): string {
  integer(picofarads, 10, 99e9);
  for (let e = 0; e <= 9; e++) {
    const d = picofarads / 10 ** e;
    if (Number.isInteger(d) && d >= 10 && d <= 99) return String(d) + String(e);
  }
  throw new RangeError('Not exactly representable');
}
export function capacitanceFarads(picofarads: number): number {
  return finite(finite(picofarads, 0) * 1e-12, 0);
}
function check(items: readonly number[], positive: boolean): void {
  if (!Array.isArray(items) || !items.length || items.length > 10000)
    throw new RangeError('Capacitance count');
  for (const n of items) {
    finite(n, 0);
    if (positive && n === 0) throw new RangeError('Positive capacitance required');
  }
}
export function parallelCapacitance(items: readonly number[]): number {
  check(items, false);
  return finite(
    items.reduce((a, b) => a + b, 0),
    0,
  );
}
export function seriesCapacitance(items: readonly number[]): number {
  check(items, true);
  const m = Math.min(...items);
  return finite(m / items.reduce((a, b) => a + m / b, 0), Number.MIN_VALUE);
}
