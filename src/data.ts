import type { Kotwica } from './core/index';

export interface OsobaPubliczna {
  poz: number;
  displayName: string;
}

export interface Roza {
  nazwa: string;
  kotwica: Kotwica;
  osoby: OsobaPubliczna[];
}

/**
 * Pobiera dane róży z publicznego JSON.
 * Używa BASE_URL z Vite (uwzględnia base:/zywa-roza/).
 * Rzuca błąd dla 404 i błędów sieci — łapany w main.ts.
 */
export async function pobierzRoze(slug: string): Promise<Roza> {
  const url = `${import.meta.env.BASE_URL}roze/${slug}.json`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${url}`);
  }
  const data: unknown = await res.json();

  // Lekki guard kształtu
  if (
    typeof data !== 'object' ||
    data === null ||
    !Array.isArray((data as { osoby?: unknown }).osoby)
  ) {
    throw new Error(`Nieprawidłowy format danych róży: ${slug}`);
  }

  return data as Roza;
}
