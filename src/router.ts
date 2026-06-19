export type Ekran =
  | { typ: 'brak' }
  | { typ: 'hub'; slug: string }
  | { typ: 'karta'; slug: string; poz: number };

/**
 * Czysta funkcja (bez `window`) — decyduje o ekranie na podstawie query-stringa.
 * ?r brak/puste → brak
 * ?r=x → hub
 * ?r=x&p=N gdzie N ∈ 1..20 → karta
 * p spoza 1..20 lub nie-liczba → degradacja do hub
 */
export function rozwizRoute(search: string): Ekran {
  const params = new URLSearchParams(search);
  const r = params.get('r');
  if (!r) return { typ: 'brak' };

  const slug = r;
  const pStr = params.get('p');

  if (pStr !== null) {
    const poz = parseInt(pStr, 10);
    if (!isNaN(poz) && poz >= 1 && poz <= 20) {
      return { typ: 'karta', slug, poz };
    }
  }

  return { typ: 'hub', slug };
}
