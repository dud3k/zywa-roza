import { describe, it, expect } from 'vitest';
import { indeksTajemnicy, tajemnica } from './rotation';
import type { Kotwica } from './rotation';

const KOTWICA_2026: Kotwica = { rok: 2026, miesiac: 1 };

describe('indeksTajemnicy', () => {
  it('zwraca 0 dla poz=1, kotwica=start, rok=2026, mies=1', () => {
    expect(indeksTajemnicy(1, KOTWICA_2026, 2026, 1)).toBe(0);
  });

  it('zwraca 5 dla poz=1, mies=6 (I Światła)', () => {
    expect(indeksTajemnicy(1, KOTWICA_2026, 2026, 6)).toBe(5);
  });

  it('zwraca 11 dla poz=1, mies=12 (II Bolesna)', () => {
    expect(indeksTajemnicy(1, KOTWICA_2026, 2026, 12)).toBe(11);
  });

  it('zwraca 9 dla poz=10, mies=1 (V Światła)', () => {
    expect(indeksTajemnicy(10, KOTWICA_2026, 2026, 1)).toBe(9);
  });

  it('zawijanie cyklu: poz=10, mies=12 → idx 0 (I Radosna)', () => {
    expect(indeksTajemnicy(10, KOTWICA_2026, 2026, 12)).toBe(0);
  });

  it('zwraca 15 dla poz=16, mies=1 (I Chwalebna)', () => {
    expect(indeksTajemnicy(16, KOTWICA_2026, 2026, 1)).toBe(15);
  });

  it('zwraca 19 dla poz=20, mies=1 (V Chwalebna)', () => {
    expect(indeksTajemnicy(20, KOTWICA_2026, 2026, 1)).toBe(19);
  });

  it('zawijanie cyklu: poz=20, mies=2 → idx 0 (I Radosna)', () => {
    expect(indeksTajemnicy(20, KOTWICA_2026, 2026, 2)).toBe(0);
  });

  it('po 20 miesiącach wraca do tego samego indeksu (cykl 20)', () => {
    for (let poz = 1; poz <= 20; poz++) {
      const bazowy = indeksTajemnicy(poz, KOTWICA_2026, 2026, 1);
      const po20 = indeksTajemnicy(poz, KOTWICA_2026, 2027, 9); // +20 mies
      expect(po20).toBe(bazowy);
    }
  });

  it('data przed kotwicą — wynik jest nieujemny (modulo obronne)', () => {
    for (let poz = 1; poz <= 20; poz++) {
      const idx = indeksTajemnicy(poz, KOTWICA_2026, 2025, 1); // rok wcześniej
      expect(idx).toBeGreaterThanOrEqual(0);
      expect(idx).toBeLessThan(20);
    }
  });

  it('przejście przez grudzień/styczeń — indeksy poprawne', () => {
    // mies 12 → mies 1 następnego roku: offset +1
    const grudzien = indeksTajemnicy(1, KOTWICA_2026, 2026, 12);
    const styczen = indeksTajemnicy(1, KOTWICA_2026, 2027, 1);
    expect((styczen - grudzien + 20) % 20).toBe(1);
  });
});

describe('tajemnica — golden 2026', () => {
  it('poz=1 mies=1 → R,1 (I Radosna)', () => {
    const t = tajemnica(1, KOTWICA_2026, 2026, 1);
    expect(t.zestaw).toBe('R');
    expect(t.numer).toBe(1);
    expect(t.nazwa).toBe('Zwiastowanie');
  });

  it('poz=1 mies=6 → S,1 (I Światła)', () => {
    const t = tajemnica(1, KOTWICA_2026, 2026, 6);
    expect(t.zestaw).toBe('S');
    expect(t.numer).toBe(1);
    expect(t.nazwa).toBe('Chrzest w Jordanie');
  });

  it('poz=1 mies=12 → B,2 (II Bolesna)', () => {
    const t = tajemnica(1, KOTWICA_2026, 2026, 12);
    expect(t.zestaw).toBe('B');
    expect(t.numer).toBe(2);
    expect(t.nazwa).toBe('Biczowanie');
  });

  it('poz=10 mies=1 → S,5 (V Światła)', () => {
    const t = tajemnica(10, KOTWICA_2026, 2026, 1);
    expect(t.zestaw).toBe('S');
    expect(t.numer).toBe(5);
    expect(t.nazwa).toBe('Ustanowienie Eucharystii');
  });

  it('poz=10 mies=12 → R,1 (zawijanie cyklu)', () => {
    const t = tajemnica(10, KOTWICA_2026, 2026, 12);
    expect(t.zestaw).toBe('R');
    expect(t.numer).toBe(1);
  });

  it('poz=16 mies=1 → CH,1 (I Chwalebna)', () => {
    const t = tajemnica(16, KOTWICA_2026, 2026, 1);
    expect(t.zestaw).toBe('CH');
    expect(t.numer).toBe(1);
    expect(t.nazwa).toBe('Zmartwychwstanie');
  });

  it('poz=20 mies=1 → CH,5 (V Chwalebna)', () => {
    const t = tajemnica(20, KOTWICA_2026, 2026, 1);
    expect(t.zestaw).toBe('CH');
    expect(t.numer).toBe(5);
    expect(t.nazwa).toBe('Ukoronowanie NMP');
  });

  it('poz=20 mies=2 → R,1 (zawijanie cyklu)', () => {
    const t = tajemnica(20, KOTWICA_2026, 2026, 2);
    expect(t.zestaw).toBe('R');
    expect(t.numer).toBe(1);
  });
});

describe('tajemnica — pola widoku', () => {
  it('zwraca nazwaZestawu, kolor, rzym, skrot, rozwazanie', () => {
    const t = tajemnica(1, KOTWICA_2026, 2026, 1);
    expect(t.nazwaZestawu).toBe('Radosne');
    expect(t.kolor).toBe('var(--R)');
    expect(t.rzym).toBe('I');
    expect(t.skrot).toBe('I R');
    expect(t.rozwazanie.length).toBeGreaterThan(0);
    expect(t.rozwazanie).toContain('Niepokalana Dziewico Maryjo');
  });

  it('skrot dla Światła używa Ś', () => {
    const t = tajemnica(1, KOTWICA_2026, 2026, 6);
    expect(t.skrot).toBe('I Ś');
  });
});

describe('tajemnica — modlitwy wstępne (poprawiona reguła)', () => {
  const miesiaceDo3 = [1, 2, 6]; // styczeń, luty, czerwiec

  for (const mies of miesiaceDo3) {
    it(`w miesiącu ${mies} dokładnie jedna pozycja ma modlitwyWstepne=true`, () => {
      const wyniki = Array.from({ length: 20 }, (_, i) =>
        tajemnica(i + 1, KOTWICA_2026, 2026, mies)
      );
      const laczacy = wyniki.filter(t => t.modlitwyWstepne);
      expect(laczacy.length).toBe(1);
      expect(laczacy[0].zestaw).toBe('R');
      expect(laczacy[0].numer).toBe(1);
    });
  }

  it('styczeń 2026 — modlitwyWstepne na poz=1', () => {
    expect(tajemnica(1, KOTWICA_2026, 2026, 1).modlitwyWstepne).toBe(true);
    expect(tajemnica(2, KOTWICA_2026, 2026, 1).modlitwyWstepne).toBe(false);
  });

  it('luty 2026 — modlitwyWstepne na poz=20', () => {
    expect(tajemnica(20, KOTWICA_2026, 2026, 2).modlitwyWstepne).toBe(true);
    expect(tajemnica(1, KOTWICA_2026, 2026, 2).modlitwyWstepne).toBe(false);
  });

  it('czerwiec 2026 — modlitwyWstepne na poz=16', () => {
    expect(tajemnica(16, KOTWICA_2026, 2026, 6).modlitwyWstepne).toBe(true);
    expect(tajemnica(1, KOTWICA_2026, 2026, 6).modlitwyWstepne).toBe(false);
  });
});
