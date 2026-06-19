import { tajemnica } from '../core/index';
import type { Roza } from '../data';
import { MIES_RZYM } from './miesiace';

export interface HubCallbacks {
  /** Wywołane gdy użytkownik klika w osobę */
  onOsoba: (poz: number) => void;
}

/**
 * Renderuje ekran huba (kompakt + tabela roku).
 * Zwraca element DOM do wstawienia w #app.
 */
export function renderHub(roza: Roza, callbacks: HubCallbacks): HTMLElement {
  const teraz = new Date();
  const terazRok = teraz.getFullYear();
  const terazMies = teraz.getMonth() + 1;

  const ekran = document.createElement('section');
  ekran.className = 'ekran';

  ekran.innerHTML = `
    <h1 id="hub-nazwa" style="margin-top:18px">${escHtml(roza.nazwa)}</h1>
    <p class="pod">Dotknij swojego imienia, aby zobaczyć swoją tajemnicę na ten miesiąc.</p>

    <div class="przelacznik">
      <button id="hub-tryb-teraz" class="akt">Ten miesiąc</button>
      <button id="hub-tryb-rok">Cały rok</button>
    </div>

    <div class="legenda">
      <span><i class="kropka" style="background:var(--R)"></i>Radosne (R)</span>
      <span><i class="kropka" style="background:var(--S)"></i>Światła (Ś)</span>
      <span><i class="kropka" style="background:var(--B)"></i>Bolesne (B)</span>
      <span><i class="kropka" style="background:var(--CH)"></i>Chwalebne (CH)</span>
    </div>

    <ul class="kompakt" id="hub-kompakt"></ul>

    <div id="hub-rok-wrap" class="hidden">
      <div class="tabela-wrap"><table id="hub-tabela"></table></div>
      <p class="notka">Skrót i kolor zestawu; bieżący miesiąc jest podświetlony. Dotknij imienia, aby otworzyć kartę.</p>
      <button id="hub-drukuj" class="link" style="margin-top:12px">&#x1F5A8; Drukuj</button>
    </div>
  `;

  // Render widoku kompaktowego
  const kompakt = ekran.querySelector<HTMLUListElement>('#hub-kompakt')!;
  for (const osoba of roza.osoby) {
    const t = tajemnica(osoba.poz, roza.kotwica, terazRok, terazMies);
    const li = document.createElement('li');
    li.innerHTML = `<button class="wiersz" data-poz="${osoba.poz}">
      <span class="imie-l">${escHtml(osoba.displayName)}</span>
      <span class="kom" style="--kc:${t.kolor}">${escHtml(t.skrot)}</span>
      <span class="strz">›</span>
    </button>`;
    kompakt.appendChild(li);
  }
  kompakt.querySelectorAll<HTMLButtonElement>('.wiersz').forEach(btn => {
    btn.addEventListener('click', () => callbacks.onOsoba(Number(btn.dataset.poz)));
  });

  // Render tabeli roku (leniwy — dopiero po kliknięciu „Cały rok")
  function renderujRok() {
    const tab = ekran.querySelector<HTMLTableElement>('#hub-tabela')!;
    let head = '<thead><tr><th class="nazw">Osoba</th>';
    for (let m = 1; m <= 12; m++) {
      head += `<th class="${m === terazMies ? 'teraz' : ''}">${MIES_RZYM[m - 1]}</th>`;
    }
    head += '</tr></thead>';

    let body = '<tbody>';
    for (const osoba of roza.osoby) {
      body += `<tr><td class="nazw" data-poz="${osoba.poz}">${escHtml(osoba.displayName)}<span class="strz">›</span></td>`;
      for (let m = 1; m <= 12; m++) {
        const t = tajemnica(osoba.poz, roza.kotwica, terazRok, m);
        body += `<td class="${m === terazMies ? 'teraz-col' : ''}">` +
          `<span class="kom" style="--kc:${t.kolor}">${escHtml(t.skrot)}</span></td>`;
      }
      body += '</tr>';
    }
    body += '</tbody>';
    tab.innerHTML = head + body;

    tab.querySelectorAll<HTMLTableCellElement>('td.nazw').forEach(td => {
      td.addEventListener('click', () => callbacks.onOsoba(Number(td.dataset.poz)));
    });

    // Przewiń do bieżącego miesiąca
    requestAnimationFrame(() => {
      const wrap = tab.parentElement;
      const th = tab.querySelector<HTMLTableCellElement>('th.teraz');
      if (wrap && th) wrap.scrollLeft = Math.max(0, th.offsetLeft - 150);
    });
  }

  // Przełącznik widoków
  const btnTeraz = ekran.querySelector<HTMLButtonElement>('#hub-tryb-teraz')!;
  const btnRok = ekran.querySelector<HTMLButtonElement>('#hub-tryb-rok')!;
  const rokWrap = ekran.querySelector<HTMLElement>('#hub-rok-wrap')!;

  function trybWidoku(rok: boolean) {
    btnTeraz.classList.toggle('akt', !rok);
    btnRok.classList.toggle('akt', rok);
    kompakt.classList.toggle('hidden', rok);
    rokWrap.classList.toggle('hidden', !rok);
  }

  btnTeraz.addEventListener('click', () => trybWidoku(false));
  btnRok.addEventListener('click', () => { renderujRok(); trybWidoku(true); });

  // Przycisk drukowania
  ekran.querySelector<HTMLButtonElement>('#hub-drukuj')!
    .addEventListener('click', () => window.print());

  return ekran;
}

function escHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
