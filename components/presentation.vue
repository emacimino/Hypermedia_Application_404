<template>
  <div :class="[$style.property_default, reverse ? $style.reversed : '']">
    <div v-if="image" :class="$style.imageWrapper">
      <img :class="$style.image" :src="image" :alt="title"/>
    </div>

    <div v-else-if="calendar === true" :class="$style.calendar">
      <calendarComponent />
    </div>

    <div v-else-if="calendar === false && weekProgramming === true" :class="$style.weekWrapper">
      <WeeklyView
          :current-date="currentDate"
          :active-date="activeDate"
          :selected-weekday-index="selectedWeekdayIndex"
          :day-events="dayEvents"
      />
    </div>

    <div :class="$style.content">
      <div v-if="subscribe && Title">
        <Subscription :Title="Title"/>
      </div>
      <div v-else>
        <b :class="$style.title">{{ title }}</b>
        <div :class="$style.paragraphs">
          <p>{{ paragraphs }}</p>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import {defineAsyncComponent} from "vue"
import Subscription from "~/components/subscription.vue";
import WeeklyView from "~/components/Calendar/WeeklyView.vue";

const calendarComponent = defineAsyncComponent(() => import("./Calendar/index.vue"))
defineProps<{
  title?: string
  paragraphs?: string
  image?: string
  reverse?: boolean
  calendar?: boolean
  weekProgramming?: boolean
  subscribe?: boolean
  Title?: string
  currentDate?: any
  activeDate?: any
  selectedWeekdayIndex?: number | null
  dayEvents?: any[]
}>()

</script>

<style module>
.property_default {
  display: flex;
  flex-direction: row;
  padding: 2rem;
  gap: 3rem;
  box-sizing: border-box;
  width: 100%;
  font-family: Inter;
  align-items: center;
}
.reversed {
  flex-direction: row-reverse;
}
.imageWrapper {
  width: 40%;
}
.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
}
.calendar {
  width: 40%;
}
.title {
  font-size: 3rem;
}
.paragraphs {
  font-size: 1.5rem;
}
.weekWrapper {
  width: 100%;
  margin-bottom: 2rem;
}
.content {
  flex: 1;
}

@media (max-width: 768px) {
  .property_default {
    flex-direction: column;
    padding: 24px 20px;
    gap: 24px;
  }
  .imageWrapper {
    min-width: 90%;
  }
  .calendar {
    min-width: 90%;
  }
  .title {
    font-size: 2rem;
  }
  .paragraphs {
    font-size: 1.2rem;
  }
}
</style>
