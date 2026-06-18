import { describe, it, expect } from 'vitest';
import { displayNamesDla } from './displayName';

describe('displayNamesDla — brak kolizji', () => {
  it('unikalny: imię + inicjał z kropką', () => {
    const wynik = displayNamesDla([
      { imie: 'Anna', nazwisko: 'Kowalska' },
      { imie: 'Maria', nazwisko: 'Nowak' },
    ]);
    expect(wynik).toEqual(['Anna K.', 'Maria N.']);
  });

  it('realna róża 2026 — Anna P. i Anna K. bez kolizji', () => {
    const wynik = displayNamesDla([
      { imie: 'Anna', nazwisko: 'Przykładska' },
      { imie: 'Anna', nazwisko: 'Kwiatkowska' },
    ]);
    expect(wynik).toEqual(['Anna P.', 'Anna K.']);
  });
});

describe('displayNamesDla — kolizje z deduplikacją', () => {
  it('Anna Ko. / Anna Kw. — prefiks wydłuża się do 2 liter', () => {
    const wynik = displayNamesDla([
      { imie: 'Anna', nazwisko: 'Kowalska' },
      { imie: 'Anna', nazwisko: 'Kwiatkowska' },
    ]);
    expect(wynik).toEqual(['Anna Ko.', 'Anna Kw.']);
  });

  it('trzy Anny z różnymi nazwiskami — każda unikalna', () => {
    const wynik = displayNamesDla([
      { imie: 'Anna', nazwisko: 'Kowalska' },
      { imie: 'Anna', nazwisko: 'Kwiatkowska' },
      { imie: 'Anna', nazwisko: 'Kaminska' },
    ]);
    const unikalne = new Set(wynik);
    expect(unikalne.size).toBe(3);
    // Ko. vs Kw. vs Ka. — 2 litery wystarczą
    expect(wynik[0]).toBe('Anna Ko.');
    expect(wynik[1]).toBe('Anna Kw.');
    expect(wynik[2]).toBe('Anna Ka.');
  });

  it('kolizja między różnymi imionami nie wpływa na nie-kolidujące', () => {
    const wynik = displayNamesDla([
      { imie: 'Anna', nazwisko: 'Kowalska' },
      { imie: 'Anna', nazwisko: 'Kwiatkowska' },
      { imie: 'Maria', nazwisko: 'Nowak' },
    ]);
    expect(wynik[2]).toBe('Maria N.');
  });
});

describe('displayNamesDla — puste nazwisko', () => {
  it('puste nazwisko → samo imię bez inicjału', () => {
    const wynik = displayNamesDla([{ imie: 'Anna', nazwisko: '' }]);
    expect(wynik).toEqual(['Anna']);
  });

  it('same białe znaki w nazwisku → samo imię', () => {
    const wynik = displayNamesDla([{ imie: 'Jan', nazwisko: '   ' }]);
    expect(wynik).toEqual(['Jan']);
  });

  it('nie crashuje — brak dostępu do nazwisko[0] gdy puste', () => {
    expect(() => displayNamesDla([{ imie: 'X', nazwisko: '' }])).not.toThrow();
  });

  it('dedup po samym imieniu gdy puste nazwisko', () => {
    const wynik = displayNamesDla([
      { imie: 'Anna', nazwisko: '' },
      { imie: 'Anna', nazwisko: '' },
    ]);
    expect(wynik).toEqual(['Anna', 'Anna (2)']);
  });
});

describe('displayNamesDla — tiebreaker identyczne imię i nazwisko', () => {
  it('dwie identyczne osoby → pierwsza bez sufiksu, druga (2)', () => {
    const wynik = displayNamesDla([
      { imie: 'Anna', nazwisko: 'Kowalska' },
      { imie: 'Anna', nazwisko: 'Kowalska' },
    ]);
    expect(wynik).toEqual(['Anna Kowalska', 'Anna Kowalska (2)']);
  });

  it('trzy identyczne osoby → (2), (3)', () => {
    const wynik = displayNamesDla([
      { imie: 'Anna', nazwisko: 'Kowalska' },
      { imie: 'Anna', nazwisko: 'Kowalska' },
      { imie: 'Anna', nazwisko: 'Kowalska' },
    ]);
    expect(wynik).toEqual(['Anna Kowalska', 'Anna Kowalska (2)', 'Anna Kowalska (3)']);
  });
});

describe('displayNamesDla — kolejność wyjścia', () => {
  it('zwraca tablicę tej samej długości co wejście', () => {
    const wejście = [
      { imie: 'A', nazwisko: 'B' },
      { imie: 'C', nazwisko: 'D' },
      { imie: 'E', nazwisko: 'F' },
    ];
    expect(displayNamesDla(wejście).length).toBe(3);
  });

  it('pusta lista → pusta lista', () => {
    expect(displayNamesDla([])).toEqual([]);
  });
});
