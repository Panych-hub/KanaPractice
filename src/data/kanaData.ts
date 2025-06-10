import type { KanaCharacter } from '../types/kana'

export const hiraganaData: KanaCharacter[] = [
  // Основные гласные
  { character: 'あ', romanji: 'a', russian: 'а', row: 'vowels', type: 'hiragana' },
  { character: 'い', romanji: 'i', russian: 'и', row: 'vowels', type: 'hiragana' },
  { character: 'う', romanji: 'u', russian: 'у', row: 'vowels', type: 'hiragana' },
  { character: 'え', romanji: 'e', russian: 'э', row: 'vowels', type: 'hiragana' },
  { character: 'お', romanji: 'o', russian: 'о', row: 'vowels', type: 'hiragana' },
  
  // Ряд K
  { character: 'か', romanji: 'ka', russian: 'ка', row: 'k', type: 'hiragana' },
  { character: 'き', romanji: 'ki', russian: 'ки', row: 'k', type: 'hiragana' },
  { character: 'く', romanji: 'ku', russian: 'ку', row: 'k', type: 'hiragana' },
  { character: 'け', romanji: 'ke', russian: 'кэ', row: 'k', type: 'hiragana' },
  { character: 'こ', romanji: 'ko', russian: 'ко', row: 'k', type: 'hiragana' },
  
  // Ряд S
  { character: 'さ', romanji: 'sa', russian: 'са', row: 's', type: 'hiragana' },
  { character: 'し', romanji: 'shi', russian: 'си', row: 's', type: 'hiragana' },
  { character: 'す', romanji: 'su', russian: 'су', row: 's', type: 'hiragana' },
  { character: 'せ', romanji: 'se', russian: 'сэ', row: 's', type: 'hiragana' },
  { character: 'そ', romanji: 'so', russian: 'со', row: 's', type: 'hiragana' },
  
  // Ряд T
  { character: 'た', romanji: 'ta', russian: 'та', row: 't', type: 'hiragana' },
  { character: 'ち', romanji: 'chi', russian: 'ти', row: 't', type: 'hiragana' },
  { character: 'つ', romanji: 'tsu', russian: 'цу', row: 't', type: 'hiragana' },
  { character: 'て', romanji: 'te', russian: 'тэ', row: 't', type: 'hiragana' },
  { character: 'と', romanji: 'to', russian: 'то', row: 't', type: 'hiragana' },
  
  // Ряд N
  { character: 'な', romanji: 'na', russian: 'на', row: 'n', type: 'hiragana' },
  { character: 'に', romanji: 'ni', russian: 'ни', row: 'n', type: 'hiragana' },
  { character: 'ぬ', romanji: 'nu', russian: 'ну', row: 'n', type: 'hiragana' },
  { character: 'ね', romanji: 'ne', russian: 'нэ', row: 'n', type: 'hiragana' },
  { character: 'の', romanji: 'no', russian: 'но', row: 'n', type: 'hiragana' },
  
  // Ряд H
  { character: 'は', romanji: 'ha', russian: 'ха', row: 'h', type: 'hiragana' },
  { character: 'ひ', romanji: 'hi', russian: 'хи', row: 'h', type: 'hiragana' },
  { character: 'ふ', romanji: 'fu', russian: 'фу', row: 'h', type: 'hiragana' },
  { character: 'へ', romanji: 'he', russian: 'хэ', row: 'h', type: 'hiragana' },
  { character: 'ほ', romanji: 'ho', russian: 'хо', row: 'h', type: 'hiragana' },
  
  // Ряд M
  { character: 'ま', romanji: 'ma', russian: 'ма', row: 'm', type: 'hiragana' },
  { character: 'み', romanji: 'mi', russian: 'ми', row: 'm', type: 'hiragana' },
  { character: 'む', romanji: 'mu', russian: 'му', row: 'm', type: 'hiragana' },
  { character: 'め', romanji: 'me', russian: 'мэ', row: 'm', type: 'hiragana' },
  { character: 'も', romanji: 'mo', russian: 'мо', row: 'm', type: 'hiragana' },
  
  // Ряд Y
  { character: 'や', romanji: 'ya', russian: 'я', row: 'y', type: 'hiragana' },
  { character: 'ゆ', romanji: 'yu', russian: 'ю', row: 'y', type: 'hiragana' },
  { character: 'よ', romanji: 'yo', russian: 'ё', row: 'y', type: 'hiragana' },
  
  // Ряд R
  { character: 'ら', romanji: 'ra', russian: 'ра', row: 'r', type: 'hiragana' },
  { character: 'り', romanji: 'ri', russian: 'ри', row: 'r', type: 'hiragana' },
  { character: 'る', romanji: 'ru', russian: 'ру', row: 'r', type: 'hiragana' },
  { character: 'れ', romanji: 're', russian: 'рэ', row: 'r', type: 'hiragana' },
  { character: 'ろ', romanji: 'ro', russian: 'ро', row: 'r', type: 'hiragana' },
  
  // Ряд W
  { character: 'わ', romanji: 'wa', russian: 'ва', row: 'w', type: 'hiragana' },
  { character: 'を', romanji: 'wo', russian: 'во', row: 'w', type: 'hiragana' },
  
  // N
  { character: 'ん', romanji: 'n', russian: 'н', row: 'n-single', type: 'hiragana' },
]

export const katakanaData: KanaCharacter[] = [
  // Основные гласные
  { character: 'ア', romanji: 'a', russian: 'а', row: 'vowels', type: 'katakana' },
  { character: 'イ', romanji: 'i', russian: 'и', row: 'vowels', type: 'katakana' },
  { character: 'ウ', romanji: 'u', russian: 'у', row: 'vowels', type: 'katakana' },
  { character: 'エ', romanji: 'e', russian: 'э', row: 'vowels', type: 'katakana' },
  { character: 'オ', romanji: 'o', russian: 'о', row: 'vowels', type: 'katakana' },
  
  // Ряд K
  { character: 'カ', romanji: 'ka', russian: 'ка', row: 'k', type: 'katakana' },
  { character: 'キ', romanji: 'ki', russian: 'ки', row: 'k', type: 'katakana' },
  { character: 'ク', romanji: 'ku', russian: 'ку', row: 'k', type: 'katakana' },
  { character: 'ケ', romanji: 'ke', russian: 'кэ', row: 'k', type: 'katakana' },
  { character: 'コ', romanji: 'ko', russian: 'ко', row: 'k', type: 'katakana' },
  
  // Ряд S
  { character: 'サ', romanji: 'sa', russian: 'са', row: 's', type: 'katakana' },
  { character: 'シ', romanji: 'shi', russian: 'си', row: 's', type: 'katakana' },
  { character: 'ス', romanji: 'su', russian: 'су', row: 's', type: 'katakana' },
  { character: 'セ', romanji: 'se', russian: 'сэ', row: 's', type: 'katakana' },
  { character: 'ソ', romanji: 'so', russian: 'со', row: 's', type: 'katakana' },
  
  // Ряд T
  { character: 'タ', romanji: 'ta', russian: 'та', row: 't', type: 'katakana' },
  { character: 'チ', romanji: 'chi', russian: 'ти', row: 't', type: 'katakana' },
  { character: 'ツ', romanji: 'tsu', russian: 'цу', row: 't', type: 'katakana' },
  { character: 'テ', romanji: 'te', russian: 'тэ', row: 't', type: 'katakana' },
  { character: 'ト', romanji: 'to', russian: 'то', row: 't', type: 'katakana' },
  
  // Ряд N
  { character: 'ナ', romanji: 'na', russian: 'на', row: 'n', type: 'katakana' },
  { character: 'ニ', romanji: 'ni', russian: 'ни', row: 'n', type: 'katakana' },
  { character: 'ヌ', romanji: 'nu', russian: 'ну', row: 'n', type: 'katakana' },
  { character: 'ネ', romanji: 'ne', russian: 'нэ', row: 'n', type: 'katakana' },
  { character: 'ノ', romanji: 'no', russian: 'но', row: 'n', type: 'katakana' },
  
  // Ряд H
  { character: 'ハ', romanji: 'ha', russian: 'ха', row: 'h', type: 'katakana' },
  { character: 'ヒ', romanji: 'hi', russian: 'хи', row: 'h', type: 'katakana' },
  { character: 'フ', romanji: 'fu', russian: 'фу', row: 'h', type: 'katakana' },
  { character: 'ヘ', romanji: 'he', russian: 'хэ', row: 'h', type: 'katakana' },
  { character: 'ホ', romanji: 'ho', russian: 'хо', row: 'h', type: 'katakana' },
  
  // Ряд M
  { character: 'マ', romanji: 'ma', russian: 'ма', row: 'm', type: 'katakana' },
  { character: 'ミ', romanji: 'mi', russian: 'ми', row: 'm', type: 'katakana' },
  { character: 'ム', romanji: 'mu', russian: 'му', row: 'm', type: 'katakana' },
  { character: 'メ', romanji: 'me', russian: 'мэ', row: 'm', type: 'katakana' },
  { character: 'モ', romanji: 'mo', russian: 'мо', row: 'm', type: 'katakana' },
  
  // Ряд Y
  { character: 'ヤ', romanji: 'ya', russian: 'я', row: 'y', type: 'katakana' },
  { character: 'ユ', romanji: 'yu', russian: 'ю', row: 'y', type: 'katakana' },
  { character: 'ヨ', romanji: 'yo', russian: 'ё', row: 'y', type: 'katakana' },
  
  // Ряд R
  { character: 'ラ', romanji: 'ra', russian: 'ра', row: 'r', type: 'katakana' },
  { character: 'リ', romanji: 'ri', russian: 'ри', row: 'r', type: 'katakana' },
  { character: 'ル', romanji: 'ru', russian: 'ру', row: 'r', type: 'katakana' },
  { character: 'レ', romanji: 're', russian: 'рэ', row: 'r', type: 'katakana' },
  { character: 'ロ', romanji: 'ro', russian: 'ро', row: 'r', type: 'katakana' },
  
  // Ряд W
  { character: 'ワ', romanji: 'wa', russian: 'ва', row: 'w', type: 'katakana' },
  { character: 'ヲ', romanji: 'wo', russian: 'во', row: 'w', type: 'katakana' },
  
  // N
  { character: 'ン', romanji: 'n', russian: 'н', row: 'n-single', type: 'katakana' },
]

export const rowNames: Record<string, string> = {
  'vowels': 'Гласные',
  'k': 'Ряд K',
  's': 'Ряд S',
  't': 'Ряд T',
  'n': 'Ряд N',
  'h': 'Ряд H',
  'm': 'Ряд M',
  'y': 'Ряд Y',
  'r': 'Ряд R',
  'w': 'Ряд W',
  'n-single': 'N'
}