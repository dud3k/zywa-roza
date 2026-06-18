export type Zestaw = 'R' | 'S' | 'B' | 'CH';

export interface Tajemnica {
  z: Zestaw;
  n: number;
  t: string;
  rozwazanie: string;
}

export const ZESTAWY: Record<Zestaw, { nazwa: string }> = {
  R:  { nazwa: 'Radosne'   },
  S:  { nazwa: 'Światła'   },
  B:  { nazwa: 'Bolesne'   },
  CH: { nazwa: 'Chwalebne' },
};

export const KOLOR_VAR: Record<Zestaw, string> = {
  R: 'var(--R)', S: 'var(--S)', B: 'var(--B)', CH: 'var(--CH)',
};

export const RZYM = ['I', 'II', 'III', 'IV', 'V'] as const;

export const TAJEMNICE: readonly Tajemnica[] = [
  // idx 0 — I Radosna
  {
    z: 'R', n: 1, t: 'Zwiastowanie',
    rozwazanie: 'Niepokalana Dziewico Maryjo! Królowo Rodzin, proszę Cię w intencji moich dzieci i wszystkich dzieci objętych modlitwą w tej róży, przez tajemnicę Zwiastowania uproś u Boga łaskę ochrony tych dzieci przed wszelkim złem, zwłaszcza tym jakie może wypływać z moich słabości i grzechów. Tobie powierzam drogi ich rozwoju i ufam że doprowadzisz je do Jezusa. W tej tajemnicy proszę szczególnie o ufność i nadzieję.',
  },
  // idx 1 — II Radosna
  {
    z: 'R', n: 2, t: 'Nawiedzenie św. Elżbiety',
    rozwazanie: 'Służebnico Pańska, Panno Łaskawa, proszę Cię w intencji moich dzieci i wszystkich dzieci objętych modlitwą w tej róży, przez tajemnicę Nawiedzenia św. Elżbiety uproś u Boga łaskę ochrony tych dzieci przed wszelkim złem, zwłaszcza tym jakie może wypływać z moich słabości i grzechów. Tobie powierzam drogi ich rozwoju i ufam że doprowadzisz je do Jezusa. W tej tajemnicy proszę szczególnie o dobre środowisku wzrastania dla tych dzieci.',
  },
  // idx 2 — III Radosna
  {
    z: 'R', n: 3, t: 'Narodzenie Pana Jezusa',
    rozwazanie: 'Matko Chrystusowa, Matko Kościoła i nasza Matko, proszę Cię w intencji moich dzieci i wszystkich dzieci objętych modlitwą w tej róży, przez tajemnicę Narodzenia Pana Jezusa uproś u Boga łaskę ochrony tych dzieci przed wszelkim złem, zwłaszcza tym jakie może wypływać z moich słabości i grzechów. Tobie powierzam drogi ich rozwoju i ufam że doprowadzisz je do Jezusa. W tej tajemnicy proszę szczególnie o żywą obecność Jezusa w życiu dzieci i rodziców.',
  },
  // idx 3 — IV Radosna
  {
    z: 'R', n: 4, t: 'Ofiarowanie w świątyni',
    rozwazanie: 'Bramo Niebieska i Arko Przymierza, Królowo Proroków – Maryjo, proszę Cię w intencji moich dzieci i wszystkich dzieci objętych modlitwą w tej róży, przez tajemnicę Ofiarowania Pana Jezusa uproś u Boga łaskę ochrony tych dzieci przed wszelkim złem, zwłaszcza tym jakie może wypływać z moich słabości i grzechów. Tobie powierzam drogi ich rozwoju i ufam że doprowadzisz je do Jezusa. W tej tajemnicy proszę szczególnie o wytrwałości w trudnych chwilach i powierzanie się Bogu w Kościele.',
  },
  // idx 4 — V Radosna
  {
    z: 'R', n: 5, t: 'Znalezienie Pana Jezusa w świątyni',
    rozwazanie: 'Gwiazdo Zaranna, Panno Roztropna - Maryjo, proszę Cię w intencji moich dzieci i wszystkich dzieci objętych modlitwą w tej róży, przez tajemnicę Odnalezienia Pana Jezusa uproś u Boga łaskę ochrony tych dzieci przed wszelkim złem, zwłaszcza tym jakie może wypływać z moich słabości i grzechów. Tobie powierzam drogi ich rozwoju i ufam że doprowadzisz je do Jezusa. W tej tajemnicy proszę szczególnie o wiarę i zaufanie oraz roztropność.',
  },
  // idx 5 — I Światła
  {
    z: 'S', n: 1, t: 'Chrzest w Jordanie',
    rozwazanie: 'Maryjo – Przybytku Ducha Świętego, proszę Cię w intencji moich dzieci i wszystkich dzieci objętych modlitwą w tej róży, przez tajemnicę Chrztu Pańskiego uproś u Boga łaskę ochrony tych dzieci przed wszelkim złem, zwłaszcza tym jakie może wypływać z moich słabości i grzechów. Tobie powierzam drogi ich rozwoju i ufam że doprowadzisz je do Jezusa. W tej tajemnicy proszę szczególnie o odnowienie łaski Chrztu świętego.',
  },
  // idx 6 — II Światła
  {
    z: 'S', n: 2, t: 'Cud w Kanie Galilejskiej',
    rozwazanie: 'Maryjo - Matko Pięknej Miłości, proszę Cię w intencji moich dzieci i wszystkich dzieci objętych modlitwą w tej róży, przez tajemnicę Cudu w Kanie Galilejskiej uproś u Boga łaskę ochrony tych dzieci przed wszelkim złem, zwłaszcza tym jakie może wypływać z moich słabości i grzechów. Tobie powierzam drogi ich rozwoju i ufam że doprowadzisz je do Jezusa. W tej tajemnicy proszę szczególnie o Miłość w życiu dzieci i o umiejętność dzielenia się Miłością.',
  },
  // idx 7 — III Światła
  {
    z: 'S', n: 3, t: 'Głoszenie Królestwa Bożego',
    rozwazanie: 'Maryjo – Matko naszego nawrócenia, Królowo Pokoju, proszę Cię w intencji moich dzieci i wszystkich dzieci objętych modlitwą w tej róży, przez tajemnicę Wezwania do Nawrócenia i Głoszenia Królestwa Bożego uproś u Boga łaskę ochrony tych dzieci przed wszelkim złem, zwłaszcza tym jakie może wypływać z moich słabości i grzechów. Tobie powierzam drogi ich rozwoju i ufam że doprowadzisz je do Jezusa. W tej tajemnicy proszę szczególnie o Nawrócenie i odpowiedź na dobre natchnienia.',
  },
  // idx 8 — IV Światła
  {
    z: 'S', n: 4, t: 'Przemienienie na górze Tabor',
    rozwazanie: 'Zwierciadło Sprawiedliwości, Stolico Mądrości – Maryjo, proszę Cię w intencji moich dzieci i wszystkich dzieci objętych modlitwą w tej róży, przez tajemnicę Przemienienia na górze Tabor uproś u Boga łaskę ochrony tych dzieci przed wszelkim złem, zwłaszcza tym jakie może wypływać z moich słabości i grzechów. Tobie powierzam drogi ich rozwoju i ufam że doprowadzisz je do Jezusa. W tej tajemnicy proszę szczególnie o przemianę serca i przeżywanie Bożej obecności w życiu.',
  },
  // idx 9 — V Światła
  {
    z: 'S', n: 5, t: 'Ustanowienie Eucharystii',
    rozwazanie: 'Panno Czci Godna, Przybytku Chwalebny – Maryjo, proszę Cię w intencji moich dzieci i wszystkich dzieci objętych modlitwą w tej róży, przez tajemnicę Ustanowienia Najświętszego Sakramentu uproś u Boga łaskę ochrony tych dzieci przed wszelkim złem, zwłaszcza tym jakie może wypływać z moich słabości i grzechów. Tobie powierzam drogi ich rozwoju i ufam że doprowadzisz je do Jezusa. W tej tajemnicy proszę szczególnie o godne, święte i jak najczęstsze uczestnictwo w Eucharystii.',
  },
  // idx 10 — I Bolesna
  {
    z: 'B', n: 1, t: 'Modlitwa w Ogrójcu',
    rozwazanie: 'Panno Wierna, Matko Bolesna – Maryjo, proszę Cię w intencji moich dzieci i wszystkich dzieci objętych modlitwą w tej róży, przez tajemnicę Modlitwy Pana Jezusa w Ogrójcu uproś u Boga łaskę ochrony tych dzieci przed wszelkim złem, zwłaszcza tym jakie może wypływać z moich słabości i grzechów. Tobie powierzam drogi ich rozwoju i ufam że doprowadzisz je do Jezusa. W tej tajemnicy proszę szczególnie o wierność w modlitwie.',
  },
  // idx 11 — II Bolesna
  {
    z: 'B', n: 2, t: 'Biczowanie',
    rozwazanie: 'Matko Bolesna – Maryjo, proszę Cię w intencji moich dzieci i wszystkich dzieci objętych modlitwą w tej róży, przez tajemnicę Biczowania Pana Jezusa uproś u Boga łaskę ochrony tych dzieci przed wszelkim złem, zwłaszcza tym jakie może wypływać z moich słabości i grzechów. Tobie powierzam drogi ich rozwoju i ufam że doprowadzisz je do Jezusa. W tej tajemnicy proszę szczególnie o uzdrowienie przyczyn grzechów których skutki obarczają dzieci i nawrócenie.',
  },
  // idx 12 — III Bolesna
  {
    z: 'B', n: 3, t: 'Cierniem ukoronowanie',
    rozwazanie: 'Matko Bolesna – Maryjo, proszę Cię w intencji moich dzieci i wszystkich dzieci objętych modlitwą w tej róży, przez tajemnicę Ukoronowania cierniem Pana Jezusa uproś u Boga łaskę ochrony tych dzieci przed wszelkim złem, zwłaszcza tym jakie może wypływać z moich słabości i grzechów. Tobie powierzam drogi ich rozwoju i ufam że doprowadzisz je do Jezusa. W tej tajemnicy proszę szczególnie o właściwe wypełnianie mojej władzy rodzicielskiej.',
  },
  // idx 13 — IV Bolesna
  {
    z: 'B', n: 4, t: 'Dźwiganie krzyża',
    rozwazanie: 'Matko Bolesna, Wspomożenie Wiernych – Maryjo, proszę Cię w intencji moich dzieci i wszystkich dzieci objętych modlitwą w tej róży, przez tajemnicę Drogi Krzyżowej Pana Jezusa uproś u Boga łaskę ochrony tych dzieci przed wszelkim złem, zwłaszcza tym jakie może wypływać z moich słabości i grzechów. Tobie powierzam drogi ich rozwoju i ufam że doprowadzisz je do Jezusa. W tej tajemnicy proszę szczególnie o łaskę powstawania z upadków grzechowych, szczere i częste spowiedzi święte.',
  },
  // idx 14 — V Bolesna
  {
    z: 'B', n: 5, t: 'Ukrzyżowanie i śmierć',
    rozwazanie: 'Matko Bolesna, współcierpiąca z Synem – Maryjo! proszę Cię w intencji moich dzieci i wszystkich dzieci objętych modlitwą w tej róży, przez tajemnicę Ukrzyżowanie i Śmierć Pana Jezusa uproś u Boga łaskę ochrony tych dzieci przed wszelkim złem, zwłaszcza tym jakie może wypływać z moich słabości i grzechów. Tobie powierzam drogi ich rozwoju i ufam że doprowadzisz je do Jezusa. W tej tajemnicy proszę szczególnie o nieprzebraną ufność w Boże Miłosierdzie wypływające z tajemnicy Krzyża.',
  },
  // idx 15 — I Chwalebna
  {
    z: 'CH', n: 1, t: 'Zmartwychwstanie',
    rozwazanie: 'Proszę Cię Jezu w intencji moich dzieci i wszystkich dzieci objętych modlitwą w tej róży, przez tajemnicę Twego Zmartwychwstania. Proszę Cię o łaskę ochrony tych dzieci przed wszelkim złem, zwłaszcza tym jakie może wypływać z moich słabości i grzechów. Tobie powierzam drogi ich rozwoju i ufam że doprowadzisz je do Nieba, a tu na ziemi będziesz je obficie wspomagał. W tej tajemnicy proszę szczególnie o łaskę Twego Pokoju w sercu.',
  },
  // idx 16 — II Chwalebna
  {
    z: 'CH', n: 2, t: 'Wniebowstąpienie',
    rozwazanie: 'Proszę Cię Jezu w intencji moich dzieci i wszystkich dzieci objętych modlitwą w tej róży, przez tajemnicę Twego Wniebowstąpienia. Proszę Cię o łaskę ochrony tych dzieci przed wszelkim złem, zwłaszcza tym jakie może wypływać z moich słabości i grzechów. Tobie powierzam drogi ich rozwoju i ufam że doprowadzisz je do Nieba, a tu na ziemi będziesz je obficie wspomagał. W tej tajemnicy proszę szczególnie o łaskę dobrego wypełniania Twoich słów i przykazań.',
  },
  // idx 17 — III Chwalebna
  {
    z: 'CH', n: 3, t: 'Zesłanie Ducha Świętego',
    rozwazanie: 'Proszę Cię Jezu w intencji moich dzieci i wszystkich dzieci objętych modlitwą w tej róży, przez tajemnicę Zesłania Ducha Świętego. Proszę Cię o łaskę ochrony tych dzieci przed wszelkim złem, zwłaszcza tym jakie może wypływać z moich słabości i grzechów. Tobie powierzam drogi ich rozwoju i ufam że doprowadzisz je do Nieba, a tu na ziemi będziesz je obficie wspomagał. W tej tajemnicy proszę szczególnie o Ducha Świętego w naszym życiu, jego działanie i charyzmaty.',
  },
  // idx 18 — IV Chwalebna
  {
    z: 'CH', n: 4, t: 'Wniebowzięcie NMP',
    rozwazanie: 'Proszę Cię Jezu w intencji moich dzieci i wszystkich dzieci objętych modlitwą w tej róży, przez tajemnicę Wniebowzięcia Najświętszej Maryi Panny. Proszę Cię o łaskę ochrony tych dzieci przed wszelkim złem, zwłaszcza tym jakie może wypływać z moich słabości i grzechów. Tobie powierzam drogi ich rozwoju i ufam że doprowadzisz je do Nieba, a tu na ziemi będziesz je obficie wspomagał. W tej tajemnicy pragnę podziękować za wszystkie dary i łaski otrzymane za przyczyną NMP i tej modlitwy.',
  },
  // idx 19 — V Chwalebna
  {
    z: 'CH', n: 5, t: 'Ukoronowanie NMP',
    rozwazanie: 'Proszę Cię Jezu w intencji moich dzieci i wszystkich dzieci objętych modlitwą w tej róży, przez tajemnicę Ukoronowania Najświętszej Maryi Panny. Proszę Cię o łaskę ochrony tych dzieci przed wszelkim złem, zwłaszcza tym jakie może wypływać z moich słabości i grzechów. Tobie powierzam drogi ich rozwoju i ufam że doprowadzisz je do Nieba, a tu na ziemi będziesz je obficie wspomagał. Panie Jezu w tej tajemnicy pragnę uwielbić Twoje Miłosierdzie w darach jakimi nas obdarzasz poprzez Maryję Królową Różańca Świętego.',
  },
];
