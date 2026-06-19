import { describe, it, expect } from 'vitest';
import { rozwizRoute } from './router';

describe('rozwizRoute — routing na query-paramach', () => {
  it('"" → brak (bez parametrów)', () => {
    const e = rozwizRoute('');
    expect(e.typ).toBe('brak');
  });

  it('"?" → brak (pusty query string)', () => {
    const e = rozwizRoute('?');
    expect(e.typ).toBe('brak');
  });

  it('"?r=roza-sw-anny" → hub ze slug', () => {
    const e = rozwizRoute('?r=roza-sw-anny');
    expect(e.typ).toBe('hub');
    if (e.typ === 'hub') expect(e.slug).toBe('roza-sw-anny');
  });

  it('"?r=roza-sw-anny&p=7" → karta poz 7', () => {
    const e = rozwizRoute('?r=roza-sw-anny&p=7');
    expect(e.typ).toBe('karta');
    if (e.typ === 'karta') {
      expect(e.slug).toBe('roza-sw-anny');
      expect(e.poz).toBe(7);
    }
  });

  it('"?r=x&p=1" → karta (min zakres)', () => {
    const e = rozwizRoute('?r=x&p=1');
    expect(e.typ).toBe('karta');
    if (e.typ === 'karta') expect(e.poz).toBe(1);
  });

  it('"?r=x&p=20" → karta (max zakres)', () => {
    const e = rozwizRoute('?r=x&p=20');
    expect(e.typ).toBe('karta');
    if (e.typ === 'karta') expect(e.poz).toBe(20);
  });

  it('"?r=x&p=0" → hub (p=0 poza zakresem)', () => {
    const e = rozwizRoute('?r=x&p=0');
    expect(e.typ).toBe('hub');
  });

  it('"?r=x&p=99" → hub (p=99 poza zakresem)', () => {
    const e = rozwizRoute('?r=x&p=99');
    expect(e.typ).toBe('hub');
  });

  it('"?r=x&p=abc" → hub (p nie-liczba)', () => {
    const e = rozwizRoute('?r=x&p=abc');
    expect(e.typ).toBe('hub');
  });

  it('"?r=x&p=-1" → hub (p ujemne)', () => {
    const e = rozwizRoute('?r=x&p=-1');
    expect(e.typ).toBe('hub');
  });

  it('"?r=x&p=21" → hub (p=21 poza zakresem)', () => {
    const e = rozwizRoute('?r=x&p=21');
    expect(e.typ).toBe('hub');
  });
});
