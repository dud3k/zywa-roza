import { TAJEMNICE, ZESTAWY, KOLOR_VAR, RZYM } from './mysteries';
import type { Zestaw } from './mysteries';

export type { Zestaw };

export interface Kotwica {
  rok: number;
  miesiac: number; // 1–12
}

export interface TajemnicaWidok {
  zestaw: Zestaw;
  nazwaZestawu: string;
  kolor: string;
  numer: number;
  rzym: string;
  nazwa: string;
  skrot: string;
  modlitwyWstepne: boolean;
  rozwazanie: string;
}

export function indeksTajemnicy(
  pozycja: number,
  kotwica: Kotwica,
  rok: number,
  miesiac: number,
): number {
  const odKotwicy = (rok - kotwica.rok) * 12 + (miesiac - kotwica.miesiac);
  return (((odKotwicy + (pozycja - 1)) % 20) + 20) % 20;
}

export function tajemnica(
  pozycja: number,
  kotwica: Kotwica,
  rok: number,
  miesiac: number,
): TajemnicaWidok {
  const m = TAJEMNICE[indeksTajemnicy(pozycja, kotwica, rok, miesiac)];
  return {
    zestaw: m.z,
    nazwaZestawu: ZESTAWY[m.z].nazwa,
    kolor: KOLOR_VAR[m.z],
    numer: m.n,
    rzym: RZYM[m.n - 1],
    nazwa: m.t,
    skrot: RZYM[m.n - 1] + ' ' + (m.z === 'S' ? 'Ś' : m.z),
    modlitwyWstepne: m.z === 'R' && m.n === 1,
    rozwazanie: m.rozwazanie,
  };
}
