import { tajemnica } from '../core/index';
import type { Roza } from '../data';
import { MIES_NOM } from './miesiace';

export interface KartaCallbacks {
  /** Wywołane gdy użytkownik klika „Wróć do róży" */
  onWroc: () => void;
}

interface StanKarty {
  poz: number;
  rok: number;
  miesiac: number; // 1..12
}

/**
 * Renderuje kartę osoby (tajemnica na dany miesiąc + rozważanie + modlitwy + stepper).
 * Zwraca element DOM do wstawienia w #app.
 */
export function renderKarta(roza: Roza, poz: number, callbacks: KartaCallbacks): HTMLElement {
  const teraz = new Date();
  const stan: StanKarty = {
    poz,
    rok: teraz.getFullYear(),
    miesiac: teraz.getMonth() + 1,
  };

  const ekran = document.createElement('section');
  ekran.className = 'ekran';

  ekran.innerHTML = `
    <button class="link powrot" id="karta-wroc">‹ Wróć do róży</button>
    <div class="karta-osoby">
      <div class="pasek-tajemnicy" id="karta-pasek"></div>
      <div class="karta-tresc">
        <div class="stepper stepper-gora">
          <button id="karta-prev" aria-label="Poprzedni miesiąc">‹</button>
          <div class="mc" id="karta-miesiac">—</div>
          <button id="karta-next" aria-label="Następny miesiąc">›</button>
        </div>
        <p class="imie" id="karta-imie">—</p>
        <p class="wstep">Modlisz się tajemnicą:</p>
        <span class="zestaw-etykieta" id="karta-zestaw">—</span>
        <div class="tajemnica-num" id="karta-num">—</div>
        <div class="tajemnica-nazwa" id="karta-nazwa">—</div>
        <div class="rozwazanie" id="karta-rozwazanie"></div>
        <div class="modlitwy hidden" id="karta-modlitwy">
          <b>Odmawiasz też modlitwy wstępne</b>
          Wierzę w Boga • Ojcze nasz • 3× Zdrowaś Maryjo • Chwała Ojcu
        </div>
      </div>
    </div>
    <p class="notka">Strzałkami możesz podejrzeć, jak tajemnica zmienia się co miesiąc (1. dnia).</p>
  `;

  function aktualizuj() {
    const osoba = roza.osoby.find(o => o.poz === stan.poz);
    const t = tajemnica(stan.poz, roza.kotwica, stan.rok, stan.miesiac);

    // Aktualizuj kolor akcentu
    document.documentElement.style.setProperty('--akcent', t.kolor);

    // Pasek koloru
    const pasek = ekran.querySelector<HTMLElement>('#karta-pasek')!;
    pasek.style.background = t.kolor;

    // Imię
    ekran.querySelector<HTMLElement>('#karta-imie')!.textContent =
      osoba ? osoba.displayName : '';

    // Zestaw
    const zestaw = ekran.querySelector<HTMLElement>('#karta-zestaw')!;
    zestaw.textContent = t.nazwaZestawu;
    zestaw.style.setProperty('--kc', t.kolor);

    // Numer tajemnicy
    const num = ekran.querySelector<HTMLElement>('#karta-num')!;
    num.textContent = `${t.rzym} Tajemnica ${t.nazwaZestawu}`;
    num.style.color = t.kolor;

    // Nazwa tajemnicy
    ekran.querySelector<HTMLElement>('#karta-nazwa')!.textContent = t.nazwa;

    // Rozważanie (zawsze widoczne)
    ekran.querySelector<HTMLElement>('#karta-rozwazanie')!.textContent = t.rozwazanie;

    // Modlitwy wstępne (warunkowe — tylko I Radosna)
    ekran.querySelector<HTMLElement>('#karta-modlitwy')!
      .classList.toggle('hidden', !t.modlitwyWstepne);

    // Miesiąc w stepperze
    ekran.querySelector<HTMLElement>('#karta-miesiac')!.textContent =
      `${MIES_NOM[stan.miesiac - 1]} ${stan.rok}`;
  }

  function krokMiesiac(delta: number) {
    let m = stan.miesiac + delta;
    let r = stan.rok;
    if (m < 1) { m = 12; r--; }
    if (m > 12) { m = 1; r++; }
    stan.miesiac = m;
    stan.rok = r;
    aktualizuj();
  }

  ekran.querySelector<HTMLButtonElement>('#karta-prev')!
    .addEventListener('click', () => krokMiesiac(-1));
  ekran.querySelector<HTMLButtonElement>('#karta-next')!
    .addEventListener('click', () => krokMiesiac(1));

  ekran.querySelector<HTMLButtonElement>('#karta-wroc')!
    .addEventListener('click', () => {
      document.documentElement.style.removeProperty('--akcent');
      callbacks.onWroc();
    });

  // Inicjalny render
  aktualizuj();

  return ekran;
}
