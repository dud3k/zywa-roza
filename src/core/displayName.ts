export interface OsobaImie {
  imie: string;
  nazwisko: string;
}

export function displayNamesDla(osoby: readonly OsobaImie[]): string[] {
  // krok 0: wyznacz bazowy displayName per osoba
  const bazy = osoby.map((o): string => {
    const nazwisko = o.nazwisko.trim();
    if (!nazwisko) return o.imie;
    return o.imie + ' ' + nazwisko[0].toUpperCase() + '.';
  });

  // krok 1: rozwiąż kolizje bazowe (te same bazy) przez wydłużanie prefiksu
  const wyniki = [...bazy];

  // grupuj indeksy po bazowym displayName
  const grupy = new Map<string, number[]>();
  for (let i = 0; i < bazy.length; i++) {
    const b = bazy[i];
    if (!grupy.has(b)) grupy.set(b, []);
    grupy.get(b)!.push(i);
  }

  for (const [, indeksy] of grupy) {
    if (indeksy.length < 2) continue;

    // sprawdź czy kolizja wynika z tych samych nazwisk (tiebreaker)
    const pierwszyIdx = indeksy[0];
    const pierwszaNazwisko = osoby[pierwszyIdx].nazwisko.trim();

    if (!pierwszaNazwisko) {
      // puste nazwisko — tiebreaker numeryczny po samym imieniu
      for (let j = 0; j < indeksy.length; j++) {
        wyniki[indeksy[j]] = j === 0
          ? osoby[indeksy[j]].imie
          : osoby[indeksy[j]].imie + ' (' + (j + 1) + ')';
      }
      continue;
    }

    // próbuj wydłużać prefiks nazwiska aż wszystkie unikalne w całej tablicy
    let prefixLen = 2;
    let resolved = false;

    while (prefixLen <= Math.max(...indeksy.map(i => osoby[i].nazwisko.trim().length))) {
      const kandydaci = indeksy.map(i => {
        const naz = osoby[i].nazwisko.trim();
        const pref = naz.slice(0, prefixLen);
        return osoby[i].imie + ' ' + pref + '.';
      });

      // sprawdź unikalność kandydatów między sobą
      const unikalneKandydaci = new Set(kandydaci);
      if (unikalneKandydaci.size === indeksy.length) {
        // sprawdź czy nie kolidują z innymi wpisami w całej tablicy (indeksów poza grupą)
        const poza = wyniki.filter((_, i) => !indeksy.includes(i));
        const konfliktZPoza = kandydaci.some(k => poza.includes(k));
        if (!konfliktZPoza) {
          for (let j = 0; j < indeksy.length; j++) {
            wyniki[indeksy[j]] = kandydaci[j];
          }
          resolved = true;
          break;
        }
      }
      prefixLen++;
    }

    if (!resolved) {
      // wyczerpano litery nazwiska — tiebreaker numeryczny
      const baseNazwa = osoby[indeksy[0]].imie + ' ' + osoby[indeksy[0]].nazwisko.trim();
      for (let j = 0; j < indeksy.length; j++) {
        wyniki[indeksy[j]] = j === 0 ? baseNazwa : baseNazwa + ' (' + (j + 1) + ')';
      }
    }
  }

  return wyniki;
}
