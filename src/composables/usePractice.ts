import { ref, computed } from 'vue'
import type { KanaCharacter, PracticeSession } from '../types/kana'

const practiceSession = ref<PracticeSession | null>(null)

export function usePractice() {
  const startPractice = (characters: KanaCharacter[]) => {
    practiceSession.value = {
      selectedCharacters: [...characters].sort(() => Math.random() - 0.5), // Перемешиваем
      currentIndex: 0,
      errors: [],
      completed: false
    }
  }

  const getCurrentCharacter = computed(() => {
    if (!practiceSession.value) return null
    return practiceSession.value.selectedCharacters[practiceSession.value.currentIndex] || null
  })

  const checkAnswer = (answer: string): boolean => {
    if (!practiceSession.value || !getCurrentCharacter.value) return false
    
    const correct = answer.toLowerCase().trim() === getCurrentCharacter.value.russian.toLowerCase()
    
    if (!correct) {
      // Добавляем ошибку или обновляем существующую
      const existingError = practiceSession.value.errors.find(
        error => error.character.character === getCurrentCharacter.value!.character
      )
      
      if (existingError) {
        existingError.incorrectAnswers.push(answer)
      } else {
        practiceSession.value.errors.push({
          character: getCurrentCharacter.value,
          incorrectAnswers: [answer]
        })
      }
    }
    
    return correct
  }

  const nextCharacter = () => {
    if (!practiceSession.value) return
    
    practiceSession.value.currentIndex++
    
    if (practiceSession.value.currentIndex >= practiceSession.value.selectedCharacters.length) {
      practiceSession.value.completed = true
    }
  }

  const getProgress = computed(() => {
    if (!practiceSession.value) return { current: 0, total: 0, percentage: 0 }
    
    const current = practiceSession.value.currentIndex
    const total = practiceSession.value.selectedCharacters.length
    const percentage = total > 0 ? Math.round((current / total) * 100) : 0
    
    return { current, total, percentage }
  })

  const resetPractice = () => {
    practiceSession.value = null
  }

  return {
    practiceSession: computed(() => practiceSession.value),
    startPractice,
    getCurrentCharacter,
    checkAnswer,
    nextCharacter,
    getProgress,
    resetPractice
  }
}