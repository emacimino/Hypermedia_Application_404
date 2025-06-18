<template>
  <div :class="[$style.property_default, reverse ? $style.reversed : '']">
    <!-- Immagine -->
    <div v-if="image" :class="$style.imageWrapper">
      <img :class="$style.image" :src="image" :alt="alt" />
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
          :isTeacher="isTeacher"
          :isActivity="isActivity"
      />
    </div>

    <!-- Contenuto -->
    <div :class="$style.content">
      <Subscription v-if="subscribe && Title" :Title="Title" />
      <CV_experience v-else-if="cv" :cvs="experience ?? []" class="m-2" />
      <div v-else>
        <h1 :class="$style.title">{{ title }}</h1>

        </div>
        <div v-if="paragraphs" :class="$style.paragraphs">
          <p>{{ paragraphs }}</p>
        </div>
      <div v-if="aboutInfo" class="mt-4">
        <nuxt-link
            :to="`/aboutUs`"
            class="btn-link"
        ><strong>{{ currentLang === 'it' ? 'Scopri di più!' : 'Discover more!' }}</strong></nuxt-link>
      </div>
      <div v-if="respTeacher" class="mt-4">
        <nuxt-link
            :to="`/teachers/${respTeacherId}`"
            class="btn-link"
        >
          {{ currentLang === 'it' ? 'Responsabile:' : 'Teacher in charge:' }}
          <strong>{{ respTeacher }}</strong>
        </nuxt-link>
      </div>

      <div v-if="responsible?.length" class="mt-4 flex flex-col gap-2">
        <div
            v-for="activity in responsible"
            :key="activity.Id"
            class="mb-2"
        >
          <nuxt-link
              :to="`/activities/${activity.Id}`"
              class="btn-link"
          >
            {{ currentLang === 'it' ? 'Titolare di corso' : 'Head of course' }}:
            <strong>{{ currentLang === 'it' ? activity.Title_it : activity.Title }}</strong>
          </nuxt-link>
        </div>
    </div>

      <div v-if="calendar === true" class="mt-4">
        <nuxt-link
            :to="`/activities`"
            class="btn-link"
        ><strong>{{ currentLang === 'it' ? 'Scopri le nostre attività!' : 'Discover our activities!' }}</strong></nuxt-link>
      </div>
  </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue"
import { defineAsyncComponent } from "vue"
const { currentLang } = useLanguage()

import dayjs from "dayjs"

import WeeklyView from "~/components/Calendar/WeeklyView.vue"
import Subscription from "~/components/Single_Elements/subscription.vue"
import CV_experience from "~/components/Single_Elements/CV_experience.vue"
import {useLanguage} from "~/composables/useLanguage";
const calendarComponent = defineAsyncComponent(() => import("../Calendar/index.vue"))

const props = withDefaults(
    defineProps<{
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
      responsible?: { Id: number; Title: string; Title_it: string }[]
      respTeacher?: string
      respTeacherId?: number
      isTeacher?: boolean
      isActivity?: boolean
      aboutInfo?: boolean
    }>(),
    {
      isTeacher: false,
      isActivity: false
    }
)

const internalCurrentDate = ref(props.currentDate ?? dayjs())

watch(() => props.currentDate, (val) => {
  if (val) internalCurrentDate.value = val
})

const activeDate = ref(props.activeDate ?? null)
const selectedWeekdayIndex = ref(props.selectedWeekdayIndex ?? 0)

function handleNavigate(dir: 'prev' | 'next') {
  internalCurrentDate.value = internalCurrentDate.value.add(dir === 'next' ? 1 : -1, 'week')
}
</script>

<style module>
.property_default {
  display: flex;
  padding: var(--padding);
  gap: var(--gap);
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
  font-size: 2.5rem;
  font-weight: bold;
}
.paragraphs {
  font-size: 1.25rem;
}
.weekWrapper {
  width: 100%;
}
.content {
  flex: 1 1 auto;
  width: 100%;
  min-width: 0;
}

@media (max-width: 768px) {
  .property_default {
    flex-direction: column;
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
    font-size: 2rem;
  }
  .paragraphs {
    font-size: 1rem;
  }
}

@media (min-width: 2560px) {
  .title {
    font-size: 5rem;
  }
  .paragraphs {
    font-size: 3rem;
  }
}
</style>
