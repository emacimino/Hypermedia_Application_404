<template>
  <div :class="[$style.property_default, reverse ? $style.reversed : '']">
    <!-- Immagine -->
    <div v-if="image" :class="$style.imageWrapper">
      <img :class="$style.image" :src="image" :alt="currentLang === 'it' ? alt : item.ShortDescription" />
    </div>

    <!-- Calendario -->
    <div v-else-if="calendar === true" :class="$style.calendar">
      <calendarComponent />
    </div>

    <!-- Vista Settimanale -->
    <div v-else-if="calendar === false && weekProgramming === true" :class="$style.weekWrapper">
      <WeeklyView
          :current-date="internalCurrentDate"
          :active-date="activeDate"
          :selected-weekday-index="selectedWeekdayIndex"
          :day-events="props.dayEvents ?? []"
          @update:activeDate="val => activeDate = val"
          @update:selectedWeekdayIndex="val => selectedWeekdayIndex = val"
          @navigate="handleNavigate"
          :visualizeButton="false"
      />
    </div>

    <!-- Contenuto -->
    <div :class="$style.content">
      <Subscription v-if="subscribe && Title" :Title="Title" />
      <CV_experience v-else-if="cv" :cvs="experience" class="m-2" />
      <div v-else>
        <h1 :class="$style.title">{{ title }}</h1>
        <div v-if="paragraphs" :class="$style.paragraphs">
          <p>{{ paragraphs }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '#imports'
import { ref, watch } from "vue"
import { defineAsyncComponent } from "vue"

import dayjs from "dayjs"

import WeeklyView from "~/components/Calendar/WeeklyView.vue"
import Subscription from "~/components/subscription.vue"
import CV_experience from "~/components/CV_experience.vue"
import { useLanguage } from '~/composables/useLanguage'
const { currentLang } = useLanguage()
const calendarComponent = defineAsyncComponent(() => import("./Calendar/index.vue"))

const props = defineProps<{
  title?: string
  paragraphs?: string
  image?: string
  reverse?: boolean
  calendar?: boolean
  weekProgramming?: boolean
  subscribe?: boolean
  cv?: boolean
  Title?: string
  currentDate?: any
  activeDate?: any
  selectedWeekdayIndex?: number | null
  dayEvents?: any[]
  experience?: any[]
  alt?: string
}>()

// Stato interno reattivo per la settimana
const internalCurrentDate = ref(props.currentDate ?? dayjs())

// Aggiorna internalCurrentDate se cambia prop
watch(() => props.currentDate, (val) => {
  if (val) internalCurrentDate.value = val
})

// Stato per giorno selezionato
const activeDate = ref(props.activeDate ?? null)
const selectedWeekdayIndex = ref(props.selectedWeekdayIndex ?? 0)

// Gestione evento di navigazione
function handleNavigate(dir: 'prev' | 'next') {
  internalCurrentDate.value = internalCurrentDate.value.add(dir === 'next' ? 1 : -1, 'week')
}
</script>

<style module>
.property_default {
  display: flex;
  flex-direction: row;
  padding: 1.5vw;
  gap: 1.75vw;
  font-family: Inter;
  align-items: center;
  color: #1F3A5F;

}
.reversed {
  flex-direction: row-reverse;
}
.imageWrapper {
  width: 50%;
}
.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
}
.calendar {
  width: 100%;
}
.title {
  font-size: 2.5vw;
}
.paragraphs {
  font-size: 1.5vw;
}
.weekWrapper {
  width: 100%;
}
.content {
  flex: 1 1 auto;
  width: 100%;
  min-width: 0;
}

@media (max-width: 760px) {
  .property_default {
    flex-direction: column;
    padding-bottom: 2vw;
    padding-top: 2vw;
    gap: 1vw;
  }
  .reversed {
    flex-direction: column;
  }
  .imageWrapper {
    order: 2;
    min-width: 100%;
  }
  .calendar {
    order: 2;
    min-width: 100%;
  }
  .content {
    order: 1;
  }
  .title {
    font-size: 5.5vw;
  }
  .paragraphs {
    font-size: 3.75vw;
  }
}
</style>
