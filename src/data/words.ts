
export interface WordPair {
  id: number;
  en: string;
  es: string;
}

export const wordPairs: WordPair[] = [
  { id: 1, en: 'Cat', es: 'Gato' },
  { id: 2, en: 'Dog', es: 'Perro' },
  { id: 3, en: 'House', es: 'Casa' },
  { id: 4, en: 'Sun', es: 'Sol' },
  { id: 5, en: 'Moon', es: 'Luna' },
  { id: 6, en: 'Water', es: 'Agua' },
  { id: 7, en: 'Food', es: 'Comida' },
  { id: 8, en: 'Friend', es: 'Amigo' },
  { id: 9, en: 'Love', es: 'Amor' },
  { id: 10, en: 'Day', es: 'Día' },
  { id: 11, en: 'Night', es: 'Noche' },
  { id: 12, en: 'Book', es: 'Libro' },
  { id: 13, en: 'Hello', es: 'Hola' },
  { id: 14, en: 'Goodbye', es: 'Adiós' },
  { id: 15, en: 'Thanks', es: 'Gracias' },
];

// In a real game, you would shuffle these arrays.
export const targetLangCards = wordPairs.map(p => ({ id: p.id, lang: 'es', word: p.es }));
export const sourceLangCards = wordPairs.map(p => ({ id: p.id, lang: 'en', word: p.en }));
