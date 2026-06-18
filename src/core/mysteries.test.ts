import { describe, it, expect } from 'vitest';
import { TAJEMNICE, ZESTAWY, KOLOR_VAR, RZYM } from './mysteries';

describe('TAJEMNICE', () => {
  it('zawiera dokładnie 20 wpisów', () => {
    expect(TAJEMNICE.length).toBe(20);
  });

  it('każdy wpis ma niepuste rozwazanie', () => {
    for (const t of TAJEMNICE) {
      expect(t.rozwazanie.length).toBeGreaterThan(0);
    }
  });

  it('kolejność: R(1-5) S(1-5) B(1-5) CH(1-5)', () => {
    const expected: Array<{ z: string; n: number }> = [
      {z:'R',n:1},{z:'R',n:2},{z:'R',n:3},{z:'R',n:4},{z:'R',n:5},
      {z:'S',n:1},{z:'S',n:2},{z:'S',n:3},{z:'S',n:4},{z:'S',n:5},
      {z:'B',n:1},{z:'B',n:2},{z:'B',n:3},{z:'B',n:4},{z:'B',n:5},
      {z:'CH',n:1},{z:'CH',n:2},{z:'CH',n:3},{z:'CH',n:4},{z:'CH',n:5},
    ];
    expect(TAJEMNICE.map(t => ({ z: t.z, n: t.n }))).toEqual(expected);
  });

  it('idx 0 (I Radosna) — snapshot fragmentu rozważania', () => {
    expect(TAJEMNICE[0].rozwazanie).toContain('Niepokalana Dziewico Maryjo');
    expect(TAJEMNICE[0].rozwazanie).toContain('o ufność i nadzieję');
  });

  it('idx 15 (I Chwalebna) — snapshot fragmentu rozważania (zwrot do Jezusa)', () => {
    expect(TAJEMNICE[15].rozwazanie).toContain('Proszę Cię Jezu');
    expect(TAJEMNICE[15].rozwazanie).toContain('o łaskę Twego Pokoju w sercu');
  });
});

describe('ZESTAWY', () => {
  it('zawiera klucze R, S, B, CH', () => {
    expect(Object.keys(ZESTAWY)).toEqual(['R', 'S', 'B', 'CH']);
  });

  it('ma poprawne nazwy', () => {
    expect(ZESTAWY.R.nazwa).toBe('Radosne');
    expect(ZESTAWY.S.nazwa).toBe('Światła');
    expect(ZESTAWY.B.nazwa).toBe('Bolesne');
    expect(ZESTAWY.CH.nazwa).toBe('Chwalebne');
  });
});

describe('KOLOR_VAR', () => {
  it('zawiera CSS var dla każdego zestawu', () => {
    expect(KOLOR_VAR.R).toBe('var(--R)');
    expect(KOLOR_VAR.S).toBe('var(--S)');
    expect(KOLOR_VAR.B).toBe('var(--B)');
    expect(KOLOR_VAR.CH).toBe('var(--CH)');
  });
});

describe('RZYM', () => {
  it('zawiera 5 cyfr rzymskich', () => {
    expect(RZYM).toEqual(['I','II','III','IV','V']);
  });
});
