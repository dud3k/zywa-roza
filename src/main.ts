import './style.css';
import { rozwizRoute } from './router';
import { pobierzRoze } from './data';
import type { Roza } from './data';
import { renderHub } from './views/hub';
import { renderKarta } from './views/karta';

const app = document.querySelector<HTMLDivElement>('#app')!;

// Cache róży w pamięci — jeden fetch na sesję
let rozaCache: Roza | null = null;
let aktualnySlug: string | null = null;

function renderBrak(): void {
  app.innerHTML = `
    <section class="ekran ekran-powitalny">
      <h1>Żywa Róża</h1>
      <p>Otwórz swój osobisty link otrzymany od koordynatora róży.</p>
    </section>
  `;
}

function renderBlad(msg: string): void {
  app.innerHTML = `
    <section class="ekran ekran-blad">
      <h1>Żywa Róża</h1>
      <p>${msg}</p>
    </section>
  `;
}

/**
 * Wspólna funkcja renderowania na podstawie aktualnego URL.
 * Wywoływana w 3 miejscach:
 *   1. przy starcie aplikacji,
 *   2. ręcznie po każdym history.pushState (pushState NIE emituje popstate),
 *   3. w handlerze zdarzenia popstate (Wstecz/Dalej przeglądarki).
 */
async function renderZURL(): Promise<void> {
  const ekran = rozwizRoute(location.search);

  if (ekran.typ === 'brak') {
    renderBrak();
    return;
  }

  // Pobierz (lub odczytaj z cache) dane róży
  if (aktualnySlug !== ekran.slug || rozaCache === null) {
    try {
      rozaCache = await pobierzRoze(ekran.slug);
      aktualnySlug = ekran.slug;
    } catch {
      renderBlad(
        'Nie znaleziono takiej róży — upewnij się, że masz kompletny link od swojego koordynatora.'
      );
      return;
    }
  }

  const roza = rozaCache;

  if (ekran.typ === 'hub') {
    const hubEl = renderHub(roza, {
      onOsoba: (poz) => {
        const nowySearch = `?r=${aktualnySlug}&p=${poz}`;
        history.pushState(null, '', nowySearch);
        renderZURL(); // ręczne wywołanie — pushState nie emituje popstate
      },
    });
    app.innerHTML = '';
    app.appendChild(hubEl);
    window.scrollTo(0, 0);
  } else {
    // ekran.typ === 'karta'
    const kartaEl = renderKarta(roza, ekran.poz, {
      onWroc: () => {
        const nowySearch = `?r=${aktualnySlug}`;
        history.pushState(null, '', nowySearch);
        renderZURL(); // ręczne wywołanie — pushState nie emituje popstate
      },
    });
    app.innerHTML = '';
    app.appendChild(kartaEl);
    window.scrollTo(0, 0);
  }
}

// Obsługa przycisku Wstecz/Dalej przeglądarki
window.addEventListener('popstate', () => {
  renderZURL();
});

// Start aplikacji
renderZURL();
