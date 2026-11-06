import { decodeCapacitor, capacitanceFarads } from '@lp-labs/capacitor-code';
if (decodeCapacitor('104') !== 100000 || capacitanceFarads(100000) !== 1e-7)
  throw new Error('Capacitance');
// @ts-expect-error invalid argument must be rejected by declarations
decodeCapacitor(104);
