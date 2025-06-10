<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Изучение японской азбуки</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Изучение японской азбуки</ion-title>
        </ion-toolbar>
      </ion-header>
      
      <div class="content-container">
        <!-- Переключатель между хираганой и катаканой -->
        <ion-segment v-model="selectedType" @ionChange="handleTypeChange">
          <ion-segment-button value="hiragana">
            <ion-label>Хирагана</ion-label>
          </ion-segment-button>
          <ion-segment-button value="katakana">
            <ion-label>Катакана</ion-label>
          </ion-segment-button>
        </ion-segment>

        <!-- Кнопки для выбора всех/сброса -->
        <div class="action-buttons">
          <ion-button fill="outline" @click="selectAll">
            Выбрать все
          </ion-button>
          <ion-button fill="outline" @click="clearAll">
            Сбросить все
          </ion-button>
        </div>

        <!-- Группировка по рядам -->
        <div v-for="(characters, row) in groupedCharacters" :key="row" class="row-section">
          <div class="row-header">
            <ion-checkbox
              :checked="isRowSelected(row)"
              :indeterminate="isRowPartiallySelected(row)"
              @ionChange="toggleRow(row)"
            ></ion-checkbox>
            <h3>{{ rowNames[row] }}</h3>
            <span class="character-count">({{ characters.length }})</span>
          </div>
          
          <div class="character-grid">
            <div
              v-for="character in characters"
              :key="character.character"
              class="character-card"
              :class="{ selected: selectedCharacters.has(character) }"
              @click="toggleCharacter(character)"
            >
              <div class="character">{{ character.character }}</div>
<!--              <div class="romanji">{{ character.romanji }}</div>-->
              <div class="russian">{{ character.russian }}</div>
            </div>
          </div>
        </div>

        <!-- Кнопка начала практики -->
        <div class="practice-button-container" v-if="selectedCharacters.size > 0">
          <ion-button 
            expand="block" 
            size="large" 
            @click="startPractice"
            class="practice-button"
          >
            Начать практику ({{ selectedCharacters.size }} символов)
          </ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonButton,
  IonCheckbox
} from '@ionic/vue'
import { hiraganaData, katakanaData, rowNames } from '../data/kanaData'
import type { KanaCharacter } from '../types/kana'
import { usePractice } from '../composables/usePractice'

const router = useRouter()
const { startPractice: startPracticeSession } = usePractice()

const selectedType = ref<'hiragana' | 'katakana'>('hiragana')
const selectedCharacters = ref(new Set<KanaCharacter>())

const currentData = computed(() => 
  selectedType.value === 'hiragana' ? hiraganaData : katakanaData
)

const groupedCharacters = computed(() => {
  const groups: Record<string, KanaCharacter[]> = {}
  currentData.value.forEach(char => {
    if (!groups[char.row]) {
      groups[char.row] = []
    }
    groups[char.row].push(char)
  })
  return groups
})

const handleTypeChange = () => {
  selectedCharacters.value.clear()
}

const toggleCharacter = (character: KanaCharacter) => {
  if (selectedCharacters.value.has(character)) {
    selectedCharacters.value.delete(character)
  } else {
    selectedCharacters.value.add(character)
  }
}

const toggleRow = (row: string) => {
  const rowCharacters = groupedCharacters.value[row]
  const allSelected = rowCharacters.every(char => selectedCharacters.value.has(char))
  
  if (allSelected) {
    rowCharacters.forEach(char => selectedCharacters.value.delete(char))
  } else {
    rowCharacters.forEach(char => selectedCharacters.value.add(char))
  }
}

const isRowSelected = (row: string): boolean => {
  const rowCharacters = groupedCharacters.value[row]
  return rowCharacters.every(char => selectedCharacters.value.has(char))
}

const isRowPartiallySelected = (row: string): boolean => {
  const rowCharacters = groupedCharacters.value[row]
  const selectedCount = rowCharacters.filter(char => selectedCharacters.value.has(char)).length
  return selectedCount > 0 && selectedCount < rowCharacters.length
}

const selectAll = () => {
  currentData.value.forEach(char => selectedCharacters.value.add(char))
}

const clearAll = () => {
  selectedCharacters.value.clear()
}

const startPractice = () => {
  const charactersArray = Array.from(selectedCharacters.value)
  startPracticeSession(charactersArray)
  router.push('/practice')
}

onMounted(() => {
  // Выбираем гласные по умолчанию
  hiraganaData.filter(char => char.row === 'vowels').forEach(char => {
    selectedCharacters.value.add(char)
  })
})
</script>

<style scoped>
.content-container {
  padding: 16px;
  max-width: 800px;
  margin: 0 auto;
}

.action-buttons {
  display: flex;
  gap: 12px;
  margin: 16px 0;
  justify-content: center;
}

.row-section {
  margin: 24px 0;
  padding: 16px;
  background: var(--ion-color-light);
  border-radius: 12px;
}

.row-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--ion-color-medium);
}

.row-header h3 {
  margin: 0;
  color: var(--ion-color-primary);
  font-size: 1.2em;
  font-weight: 600;
}

.character-count {
  color: var(--ion-color-medium);
  font-size: 0.9em;
}

.character-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 12px;
}

.character-card {
  background: white;
  border: 2px solid var(--ion-color-light);
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.character-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.character-card.selected {
  border-color: var(--ion-color-primary);
  background: var(--ion-color-primary-tint);
}
.character-card.selected .russian {
  color: var(--ion-color-light);
}

.character {
  font-size: 2.5em;
  font-weight: bold;
  margin-bottom: 8px;
  color: var(--ion-color-dark);
}

.romanji {
  font-size: 1.1em;
  color: var(--ion-color-medium);
  margin-bottom: 4px;
  font-style: italic;
}

.russian {
  font-size: 1em;
  color: var(--ion-color-primary);
  font-weight: 600;
}

.practice-button-container {
  position: sticky;
  bottom: 16px;
  margin-top: 32px;
  padding: 16px 0;
  background: var(--ion-background-color);
  z-index: 10;
}

.practice-button {
  --background: var(--ion-color-success);
  --background-hover: var(--ion-color-success-shade);
  margin: 0;
}

@media (max-width: 600px) {
  .character-grid {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 8px;
  }
  
  .character-card {
    padding: 12px;
  }
  
  .character {
    font-size: 2em;
  }
}
</style>