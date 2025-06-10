<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="goHome">
            <ion-icon name="arrow-back"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>Практика</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <div class="practice-container" v-if="practiceSession && !practiceSession.completed">
        <!-- Прогресс -->
        <div class="progress-section">
          <ion-progress-bar :value="getProgress.percentage / 100"></ion-progress-bar>
          <div class="progress-text">
            {{ getProgress.current + 1 }} из {{ getProgress.total }}
          </div>
        </div>

        <!-- Текущий символ -->
        <div class="character-display" v-if="getCurrentCharacter">
          <div class="character" :class="{ error: showError }">{{ getCurrentCharacter.character }}</div>
          <div class="character-type">{{ getCurrentCharacter.type === 'hiragana' ? 'Хирагана' : 'Катакана' }}</div>
        </div>

        <!-- Форма ввода -->
        <div class="input-section">
<!--          <div v-if="showError" class="error-message">-->
<!--            <ion-icon name="close-circle" color="danger"></ion-icon>-->
<!--            <span>Неправильно! Попробуйте еще раз.</span>-->
<!--          </div>-->
          <ion-item
            :class="{ 'error-input': showError }"
            class="answer-input"
          >
            <ion-input
              ref="inputRef"
              v-model="userAnswer"
              @keyup.enter="submitAnswer"
              :class="{ 'shake': showError }"
              placeholder="например: ка"
              autocomplete="off"
            ></ion-input>
          </ion-item>

          <ion-button
            expand="block" 
            @click="submitAnswer"
            :disabled="!userAnswer.trim()"
            class="submit-button"
          >
            Проверить
          </ion-button>
        </div>


      </div>

      <!-- Завершение практики -->
      <div v-else-if="practiceSession?.completed" class="completion-message">
        <ion-icon name="checkmark-circle" color="success" class="completion-icon"></ion-icon>
        <h2>Практика завершена!</h2>
        <p>Переходим к результатам...</p>
      </div>

      <!-- Загрузка -->
      <div v-else class="loading-message">
        <ion-spinner></ion-spinner>
        <p>Подготовка практики...</p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {nextTick, onMounted, onUnmounted, ref} from 'vue'
import {useRouter} from 'vue-router'
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonPage,
  IonProgressBar,
  IonSpinner,
  IonTitle,
  IonToolbar
} from '@ionic/vue'
import {usePractice} from '../composables/usePractice'

const router = useRouter()
const { practiceSession, getCurrentCharacter, checkAnswer, nextCharacter, getProgress, resetPractice } = usePractice()

const userAnswer = ref('')
const showError = ref(false)
const inputRef = ref()

let errorTimeout = ref<number | null>(null)

const submitAnswer = async () => {
  if (!userAnswer.value.trim()) return

  const isCorrect = checkAnswer(userAnswer.value)
  
  if (isCorrect) {
    // Правильный ответ
    showError.value = false
    userAnswer.value = ''
    nextCharacter()
    
    // Если практика завершена, переходим к результатам
    if (practiceSession.value?.completed) {
      setTimeout(() => {
        router.push('/results')
      }, 1500)
    } else {
      // Фокусируем на следующий символ
      await nextTick()
      inputRef.value?.$el.setFocus()
    }
  } else {
    // Неправильный ответ
    showError.value = true
    userAnswer.value = ''
    
    // Убираем анимацию ошибки через время
    if (errorTimeout.value) clearTimeout(errorTimeout.value)
    errorTimeout.value = setTimeout(() => {
      showError.value = false
    }, 2000)
    
    // Фокусируем обратно на поле ввода
    await nextTick()
    inputRef.value?.$el.setFocus()
  }
}

const goHome = () => {
  resetPractice()
  router.push('/home')
}

onMounted(async () => {
  // Проверяем, есть ли активная сессия
  if (!practiceSession.value) {
    router.push('/home')
    return
  }
  
  // Фокусируем поле ввода
  await nextTick()
  inputRef.value?.$el.setFocus()
})

onUnmounted(() => {
  if (errorTimeout.value) clearTimeout(errorTimeout.value)
})
</script>

<style scoped>
.practice-container {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  min-height: 100%;
  display: flex;
  flex-direction: column;
}

.progress-section {
  margin-bottom: 40px;
}

.progress-text {
  text-align: center;
  margin-top: 8px;
  font-size: 1.1em;
  color: var(--ion-color-medium);
  font-weight: 500;
}

.character-display {
  text-align: center;
  margin: 40px 0 60px 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.character {
  font-size: 8em;
  font-weight: bold;
  color: var(--ion-color-primary);
  margin-bottom: 16px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.character.error {
  background-color: var(--ion-color-danger-tint);
}
.character-type {
  font-size: 1.2em;
  color: var(--ion-color-medium);
  font-style: italic;
}

.input-section {
  margin-bottom: 40px;
}

.answer-input {
  margin-bottom: 20px;
  --background: white;
  --border-radius: 12px;
  --padding-start: 16px;
  --padding-end: 16px;
}

.answer-input.error-input {
  --border-color: var(--ion-color-danger);
}

.submit-button {
  --background: var(--ion-color-primary);
  --background-hover: var(--ion-color-primary-shade);
  --border-radius: 12px;
  height: 52px;
  font-size: 1.1em;
  font-weight: 600;
}

.error-message {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: var(--ion-color-danger);
  font-size: 1.1em;
  font-weight: 500;
  padding: 16px;
  background: var(--ion-color-danger-tint);
  border-radius: 12px;
  margin-top: 20px;
  animation: fadeIn 0.3s ease;
}

.completion-message {
  text-align: center;
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
}

.completion-icon {
  font-size: 4em;
  margin-bottom: 20px;
}

.completion-message h2 {
  color: var(--ion-color-success);
  margin-bottom: 12px;
  font-size: 1.8em;
}

.completion-message p {
  color: var(--ion-color-medium);
  font-size: 1.1em;
}

.loading-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  gap: 20px;
}

.loading-message p {
  color: var(--ion-color-medium);
  font-size: 1.1em;
}

.shake {
  animation: shake 0.5s ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 600px) {
  .character {
    font-size: 6em;
  }
  
  .practice-container {
    padding: 16px;
  }
}
</style>