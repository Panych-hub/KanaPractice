<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Результаты</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <div class="results-container" v-if="practiceSession">
        <!-- Общая статистика -->
        <div class="stats-section">
          <div class="stats-card">
            <div class="stat-item">
              <div class="stat-number correct">{{ correctCount }}</div>
              <div class="stat-label">Правильно</div>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <div class="stat-number error">{{ errorCount }}</div>
              <div class="stat-label">Ошибки</div>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <div class="stat-number total">{{ totalCount }}</div>
              <div class="stat-label">Всего</div>
            </div>
          </div>
          
          <div class="accuracy-card">
            <div class="accuracy-circle">
              <svg viewBox="0 0 100 100" class="accuracy-svg">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="var(--ion-color-light)"
                  stroke-width="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="var(--ion-color-success)"
                  stroke-width="8"
                  :stroke-dasharray="circumference"
                  :stroke-dashoffset="strokeDashoffset"
                  stroke-linecap="round"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div class="accuracy-text">
                <div class="accuracy-percent">{{ accuracyPercent }}%</div>
                <div class="accuracy-label">Точность</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Ошибки -->
        <div v-if="practiceSession.errors.length > 0" class="errors-section">
          <h3>Символы с ошибками</h3>
          <div class="error-cards">
            <div 
              v-for="error in practiceSession.errors" 
              :key="error.character.character"
              class="error-card"
            >
              <div class="error-character">
                <div class="character">{{ error.character.character }}</div>
                <div class="character-info">
                  <div class="correct-answer">{{ error.character.russian }}</div>
                </div>
              </div>
              <div class="incorrect-answers">
                <div class="incorrect-label">Ваши ответы:</div>
                <div class="incorrect-list">
                  <span 
                    v-for="(answer, index) in error.incorrectAnswers" 
                    :key="index"
                    class="incorrect-answer"
                  >
                    {{ answer }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="practiceSession.skipped.length > 0" class="errors-section">
          <h3>Пропущены</h3>
          <div class="error-cards">
            <div
                v-for="skipped in practiceSession.skipped"
                :key="skipped.character.character"
                class="error-card"
            >
              <div class="error-character">
                <div class="character">{{ skipped.character.character }}</div>
                <div class="character-info">
                  <div class="correct-answer">{{ skipped.character.russian }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Поздравление -->
        <div v-else class="perfect-score">
          <h3>Отличная работа!</h3>
          <p>Вы ответили правильно на все вопросы!</p>
        </div>

        <!-- Кнопки действий -->
        <div class="action-buttons">
          <ion-button 
            expand="block" 
            fill="outline" 
            @click="practiceAgain"
            v-if="practiceSession.errors.length > 0 ||practiceSession.skipped.length > 0  "
            class="practice-again-button"
          >
            <ion-icon name="refresh" slot="start"></ion-icon>
            Повторить ошибки
          </ion-button>
          
          <ion-button 
            expand="block" 
            @click="goHome"
            class="home-button"
          >
            <ion-icon name="home" slot="start"></ion-icon>
            На главную
          </ion-button>
        </div>
      </div>
      
      <!-- Если нет данных о сессии -->
      <div v-else class="no-data">
        <ion-icon name="document-text" class="no-data-icon"></ion-icon>
        <h3>Нет данных</h3>
        <p>Сначала пройдите практику</p>
        <ion-button @click="goHome">На главную</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon
} from '@ionic/vue'
import { usePractice } from '../composables/usePractice'

const router = useRouter()
const { practiceSession, startPractice, resetPractice } = usePractice()

const totalCount = computed(() => 
  practiceSession.value?.selectedCharacters.length || 0
)

const errorCount = computed(() => 
  (practiceSession.value?.errors.length ?? 0) + (practiceSession.value?.skipped.length ?? 0)
)

const correctCount = computed(() => 
  totalCount.value - errorCount.value
)

const accuracyPercent = computed(() => {
  if (totalCount.value === 0) return 100
  return Math.round((correctCount.value / totalCount.value) * 100)
})

// Для круговой диаграммы
const circumference = 2 * Math.PI * 40
const strokeDashoffset = computed(() => 
  circumference - (accuracyPercent.value / 100) * circumference
)

const practiceAgain = () => {
  if (!practiceSession.value) return
  
  const errorCharacters = practiceSession.value.errors.map(error => error.character)
  practiceSession.value.skipped.forEach(skipped => {
    errorCharacters.push(skipped.character)
  })
  startPractice(errorCharacters)
  router.push('/practice')
}

const goHome = () => {
  resetPractice()
  router.push('/home')
}
</script>

<style scoped>
.results-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.stats-section {
  margin-bottom: 40px;
}

.stats-card {
  background: white;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 20px;
}

.stat-item {
  text-align: center;
  flex: 1;
}

.stat-number {
  font-size: 2.5em;
  font-weight: bold;
  margin-bottom: 8px;
}

.stat-number.correct {
  color: var(--ion-color-success);
}

.stat-number.error {
  color: var(--ion-color-danger);
}

.stat-number.total {
  color: var(--ion-color-primary);
}

.stat-label {
  color: var(--ion-color-medium);
  font-size: 0.9em;
  font-weight: 500;
}

.stat-divider {
  width: 1px;
  height: 60px;
  background: var(--ion-color-light);
}

.accuracy-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
}

.accuracy-circle {
  position: relative;
  width: 160px;
  height: 160px;
}

.accuracy-svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.accuracy-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.accuracy-percent {
  font-size: 2.2em;
  font-weight: bold;
  color: var(--ion-color-success);
  margin-bottom: 4px;
}

.accuracy-label {
  color: var(--ion-color-medium);
  font-size: 0.9em;
  font-weight: 500;
}

.errors-section h3 {
  color: var(--ion-color-primary);
  margin-bottom: 20px;
  font-size: 1.3em;
  font-weight: 600;
}

.error-cards {
  display: grid;
  gap: 16px;
}

.error-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-left: 4px solid var(--ion-color-danger);
}

.error-character {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 16px;
}

.character {
  font-size: 3em;
  font-weight: bold;
  color: var(--ion-color-dark);
}

.character-info {
  flex: 1;
}

.romanji {
  font-size: 1.2em;
  color: var(--ion-color-medium);
  font-style: italic;
  margin-bottom: 4px;
}

.correct-answer {
  font-size: 1.3em;
  color: var(--ion-color-success);
  font-weight: 600;
}

.incorrect-answers {
  border-top: 1px solid var(--ion-color-light);
  padding-top: 12px;
}

.incorrect-label {
  font-size: 0.9em;
  color: var(--ion-color-medium);
  margin-bottom: 8px;
}

.incorrect-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.incorrect-answer {
  background: var(--ion-color-danger-tint);
  color: var(--ion-color-light);
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 0.9em;
  font-weight: 500;
}

.perfect-score {
  text-align: center;
  padding: 40px 20px;
  background: var(--ion-color-success-tint);
  border-radius: 16px;
  margin-bottom: 40px;
}

.trophy-icon {
  font-size: 4em;
  color: var(--ion-color-warning);
  margin-bottom: 16px;
}

.perfect-score h3 {
  color: var(--ion-color-light);
  margin-bottom: 8px;
  font-size: 1.5em;
}

.perfect-score p {
  color: var(--ion-color-light);
  font-size: 1.1em;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 40px;
}

.practice-again-button {
  --background: var(--ion-color-warning);
  --background-hover: var(--ion-color-warning-shade);
  --color: white;
}

.home-button {
  --background: var(--ion-color-primary);
  --background-hover: var(--ion-color-primary-shade);
}

.no-data {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 40px;
  text-align: center;
}

.no-data-icon {
  font-size: 4em;
  color: var(--ion-color-medium);
  margin-bottom: 20px;
}

.no-data h3 {
  color: var(--ion-color-medium);
  margin-bottom: 12px;
}

.no-data p {
  color: var(--ion-color-medium);
  margin-bottom: 24px;
}

@media (max-width: 600px) {

  .stat-divider {
    width: 60px;
    height: 1px;
  }
  
  .error-character {
    flex-direction: column;
    text-align: center;
    gap: 12px;
  }
  
  .accuracy-circle {
    width: 120px;
    height: 120px;
  }
  
  .accuracy-percent {
    font-size: 1.8em;
  }
}
</style>