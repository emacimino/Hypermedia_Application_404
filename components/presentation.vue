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
      <Subscription v-if="subscribe && Title" :Title="Title"/>
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
  font-size: clamp(2rem, 4vw, 3rem);
}
.paragraphs {
  font-size: clamp(1rem, 2vw, 2rem);
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
    padding: 1rem;
    gap: 1rem;
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
    font-size: 1.5rem;
  }
  .paragraphs {
    font-size: 1rem;
  }
}
</style>
