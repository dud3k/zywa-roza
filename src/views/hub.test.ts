import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHub } from './hub';
import type { Roza } from '../data';

// Fixture: 20-osobowa róża z kotwicą styczeń 2026
const ROZA_FIXTURE: Roza = {
  nazwa: 'Róża testowa',
  kotwica: { rok: 2026, miesiac: 1 },
  osoby: Array.from({ length: 20 }, (_, i) => ({
    poz: i + 1,
    displayName: `Osoba ${i + 1}`,
  })),
};

describe('renderHub — DOM (happy-dom)', () => {
  beforeEach(() => {
    // Przywróć document.body do czystego stanu
    document.body.innerHTML = '';
  });

  it('renderuje element z klasą ekran', () => {
    const el = renderHub(ROZA_FIXTURE, { onOsoba: vi.fn() });
    expect(el.className).toContain('ekran');
  });

  it('wyświetla nazwę róży w h1', () => {
    const el = renderHub(ROZA_FIXTURE, { onOsoba: vi.fn() });
    const h1 = el.querySelector('h1');
    expect(h1?.textContent).toContain('Róża testowa');
  });

  it('kompakt zawiera dokładnie 20 wierszy (20 osób)', () => {
    const el = renderHub(ROZA_FIXTURE, { onOsoba: vi.fn() });
    document.body.appendChild(el);
    const wiersze = el.querySelectorAll('#hub-kompakt .wiersz');
    expect(wiersze.length).toBe(20);
  });

  it('tabela roku po kliknięciu „Cały rok" ma 20 wierszy × 12 kolumn danych', () => {
    const el = renderHub(ROZA_FIXTURE, { onOsoba: vi.fn() });
    document.body.appendChild(el);

    // Kliknij przełącznik „Cały rok"
    const btnRok = el.querySelector<HTMLButtonElement>('#hub-tryb-rok')!;
    btnRok.click();

    const tbody = el.querySelector('#hub-tabela tbody');
    expect(tbody).not.toBeNull();

    const wiersze = tbody!.querySelectorAll('tr');
    expect(wiersze.length).toBe(20);

    // Każdy wiersz: 1 kolumna z nazwiskiem + 12 kolumn miesięcy
    const komorkiDanych = wiersze[0].querySelectorAll('td:not(.nazw)');
    expect(komorkiDanych.length).toBe(12);
  });

  it('po kliknięciu kompakt jest ukryty, rok widoczny', () => {
    const el = renderHub(ROZA_FIXTURE, { onOsoba: vi.fn() });
    document.body.appendChild(el);

    const btnRok = el.querySelector<HTMLButtonElement>('#hub-tryb-rok')!;
    btnRok.click();

    const kompakt = el.querySelector<HTMLElement>('#hub-kompakt')!;
    const rokWrap = el.querySelector<HTMLElement>('#hub-rok-wrap')!;
    expect(kompakt.classList.contains('hidden')).toBe(true);
    expect(rokWrap.classList.contains('hidden')).toBe(false);
  });

  it('po kliknięciu „Ten miesiąc" rok ukryty, kompakt widoczny', () => {
    const el = renderHub(ROZA_FIXTURE, { onOsoba: vi.fn() });
    document.body.appendChild(el);

    // Najpierw przełącz na rok
    el.querySelector<HTMLButtonElement>('#hub-tryb-rok')!.click();
    // Potem z powrotem
    el.querySelector<HTMLButtonElement>('#hub-tryb-teraz')!.click();

    const kompakt = el.querySelector<HTMLElement>('#hub-kompakt')!;
    const rokWrap = el.querySelector<HTMLElement>('#hub-rok-wrap')!;
    expect(kompakt.classList.contains('hidden')).toBe(false);
    expect(rokWrap.classList.contains('hidden')).toBe(true);
  });

  it('klik w wiersz kompaktu wywołuje onOsoba z właściwym poz', () => {
    const onOsoba = vi.fn();
    const el = renderHub(ROZA_FIXTURE, { onOsoba });
    document.body.appendChild(el);

    const wiersz = el.querySelector<HTMLButtonElement>('.wiersz[data-poz="5"]')!;
    wiersz.click();
    expect(onOsoba).toHaveBeenCalledWith(5);
  });
});
