import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderKarta } from './karta';
import type { Roza } from '../data';

// Fixture: kotwica styczeń 2026 — poz 1 styczeń = I Radosna (Zwiastowanie, modlitwyWstepne=true)
// poz 2 styczeń = II Radosna (modlitwyWstepne=false)
const ROZA_FIXTURE: Roza = {
  nazwa: 'Róża testowa',
  kotwica: { rok: 2026, miesiac: 1 },
  osoby: [
    { poz: 1, displayName: 'Marcin D.' },
    { poz: 2, displayName: 'Magdalena N.' },
    ...Array.from({ length: 18 }, (_, i) => ({ poz: i + 3, displayName: `Osoba ${i + 3}` })),
  ],
};

describe('renderKarta — DOM (happy-dom)', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    // Upewnij się że --akcent nie zaburza testów
    document.documentElement.style.removeProperty('--akcent');
  });

  describe('poz=1, bieżący miesiąc = styczeń 2026 (I Radosna, Zwiastowanie)', () => {
    // Uwaga: testy zależą od faktycznej daty. Aby uniezależnić od daty systemowej,
    // renderKarta przyjmuje datę jako Date(); tutaj weryfikujemy logikę przez kotwicę.
    // Ponieważ spec wymaga testu dla poz=1, styczeń 2026, tworzymy element i sprawdzamy
    // po kliknięciu wstecz do punktu wyjścia (kotwica 2026-01).

    it('wyświetla imię osoby', () => {
      const el = renderKarta(ROZA_FIXTURE, 1, { onWroc: vi.fn() });
      document.body.appendChild(el);
      const imie = el.querySelector('#karta-imie');
      expect(imie?.textContent).toBe('Marcin D.');
    });

    it('blok .rozwazanie zawiera niepusty tekst', () => {
      const el = renderKarta(ROZA_FIXTURE, 1, { onWroc: vi.fn() });
      document.body.appendChild(el);
      const rozwazanie = el.querySelector<HTMLElement>('#karta-rozwazanie');
      expect(rozwazanie).not.toBeNull();
      expect(rozwazanie!.textContent!.length).toBeGreaterThan(10);
    });

    it('blok .rozwazanie jest zawsze widoczny (brak klasy hidden)', () => {
      const el = renderKarta(ROZA_FIXTURE, 1, { onWroc: vi.fn() });
      document.body.appendChild(el);
      const rozwazanie = el.querySelector<HTMLElement>('#karta-rozwazanie');
      expect(rozwazanie!.classList.contains('hidden')).toBe(false);
    });
  });

  describe('modlitwy wstępne — warunkowość', () => {
    /**
     * Wymuszamy styczeń 2026 przez stepper: renderujemy kartę, potem
     * cofamy/przesuwamy miesiące do punktu gdzie znamy wynik.
     * Prostsze: testujemy przez nawigację stepperem do miesiąca kotwicy
     * (styczeń 2026 = start).
     *
     * Ponieważ teraz nie wiemy jaki mamy miesiąc systemowy, testujemy:
     * 1. Że modlitwy widoczne gdy tajem = I Radosna
     * 2. Że modlitwy niewidoczne gdy tajem = II Radosna
     * Wymuszamy to przez doprowadzenie do daty kotwicy (styczeń 2026).
     */

    function doprowadzDoKotwicy(el: HTMLElement) {
      // Klikamy prev/next żeby dojść do 2026-01.
      // Sprawdzamy treść etykiety miesiąca.
      const miesiac = el.querySelector<HTMLElement>('#karta-miesiac');
      const prev = el.querySelector<HTMLButtonElement>('#karta-prev')!;
      const next = el.querySelector<HTMLButtonElement>('#karta-next')!;

      // Maksymalnie 24 kroki w każdym kierunku
      for (let i = 0; i < 24; i++) {
        if (miesiac?.textContent?.includes('styczeń') && miesiac.textContent?.includes('2026')) break;
        // Jeśli jesteśmy po 2026-01, klikamy prev, jeśli przed — next
        const tekst = miesiac?.textContent ?? '';
        const rok = parseInt(tekst.match(/\d{4}/)?.[0] ?? '0', 10);
        const miesNum = tekst.includes('styczeń') ? 1 :
          tekst.includes('luty') ? 2 : tekst.includes('marzec') ? 3 :
          tekst.includes('kwiecień') ? 4 : tekst.includes('maj') ? 5 :
          tekst.includes('czerwiec') ? 6 : tekst.includes('lipiec') ? 7 :
          tekst.includes('sierpień') ? 8 : tekst.includes('wrzesień') ? 9 :
          tekst.includes('październik') ? 10 : tekst.includes('listopad') ? 11 :
          tekst.includes('grudzień') ? 12 : 0;
        const docelowy = 2026 * 12 + 1;
        const aktualny = rok * 12 + miesNum;
        if (aktualny > docelowy) prev.click();
        else next.click();
      }
    }

    it('poz=1 styczeń 2026: boks modlitw widoczny (I Radosna)', () => {
      const el = renderKarta(ROZA_FIXTURE, 1, { onWroc: vi.fn() });
      document.body.appendChild(el);
      doprowadzDoKotwicy(el);

      const nazwaTajem = el.querySelector('#karta-nazwa')?.textContent;
      expect(nazwaTajem).toBe('Zwiastowanie');

      const modlitwy = el.querySelector<HTMLElement>('#karta-modlitwy');
      expect(modlitwy!.classList.contains('hidden')).toBe(false);
    });

    it('poz=2 styczeń 2026: boks modlitw niewidoczny (II Radosna)', () => {
      const el = renderKarta(ROZA_FIXTURE, 2, { onWroc: vi.fn() });
      document.body.appendChild(el);
      doprowadzDoKotwicy(el);

      const modlitwy = el.querySelector<HTMLElement>('#karta-modlitwy');
      expect(modlitwy!.classList.contains('hidden')).toBe(true);
    });
  });

  describe('stepper miesięcy', () => {
    it('klik „›" zmienia miesiąc w wyświetlaczu', () => {
      const el = renderKarta(ROZA_FIXTURE, 1, { onWroc: vi.fn() });
      document.body.appendChild(el);

      const miesiacEl = el.querySelector<HTMLElement>('#karta-miesiac');
      const poczatkowy = miesiacEl?.textContent ?? '';
      el.querySelector<HTMLButtonElement>('#karta-next')!.click();
      const po = miesiacEl?.textContent ?? '';
      expect(po).not.toBe(poczatkowy);
    });

    it('klik „›" przelicza nazwę tajemnicy', () => {
      const el = renderKarta(ROZA_FIXTURE, 1, { onWroc: vi.fn() });
      document.body.appendChild(el);
      // Doprowadź do kotwicy (styczeń 2026), poz=1 = Zwiastowanie
      const nazwaEl = el.querySelector<HTMLElement>('#karta-nazwa');
      const prev = el.querySelector<HTMLButtonElement>('#karta-prev')!;
      const next = el.querySelector<HTMLButtonElement>('#karta-next')!;
      const miesiacEl = el.querySelector<HTMLElement>('#karta-miesiac');

      // Doprowadź do stycznia 2026
      for (let i = 0; i < 24; i++) {
        const tekst = miesiacEl?.textContent ?? '';
        if (tekst.includes('styczeń') && tekst.includes('2026')) break;
        const rok = parseInt(tekst.match(/\d{4}/)?.[0] ?? '0', 10);
        const mn = tekst.includes('styczeń') ? 1 :
          tekst.includes('luty') ? 2 : tekst.includes('marzec') ? 3 :
          tekst.includes('kwiecień') ? 4 : tekst.includes('maj') ? 5 :
          tekst.includes('czerwiec') ? 6 : tekst.includes('lipiec') ? 7 :
          tekst.includes('sierpień') ? 8 : tekst.includes('wrzesień') ? 9 :
          tekst.includes('październik') ? 10 : tekst.includes('listopad') ? 11 :
          tekst.includes('grudzień') ? 12 : 0;
        const target = 2026 * 12 + 1;
        const curr = rok * 12 + mn;
        if (curr > target) prev.click(); else next.click();
      }

      expect(nazwaEl?.textContent).toBe('Zwiastowanie');
      next.click(); // styczeń → luty (poz 1 = II Radosna)
      expect(nazwaEl?.textContent).toBe('Nawiedzenie św. Elżbiety');
    });

    it('klik „Wróć do róży" wywołuje onWroc', () => {
      const onWroc = vi.fn();
      const el = renderKarta(ROZA_FIXTURE, 1, { onWroc });
      document.body.appendChild(el);
      el.querySelector<HTMLButtonElement>('#karta-wroc')!.click();
      expect(onWroc).toHaveBeenCalledOnce();
    });
  });
});
