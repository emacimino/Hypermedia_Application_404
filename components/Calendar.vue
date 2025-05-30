<script setup lang="ts">
import {CalendarDate} from "@internationalized/date";

const value = ref(new CalendarDate(2025, 6, 20))
</script>

<template>
  <UCalendar v-model="value" />
</template>
