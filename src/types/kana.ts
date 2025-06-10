export interface KanaCharacter {
  character: string
  romanji: string
  russian: string
  row: string
  type: 'hiragana' | 'katakana'
}

export interface PracticeSession {
  selectedCharacters: KanaCharacter[]
  currentIndex: number
  errors: Array<{
    character: KanaCharacter
    incorrectAnswers: string[]
  }>
  completed: boolean
}