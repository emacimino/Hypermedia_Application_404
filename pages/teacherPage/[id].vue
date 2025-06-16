<template>
  <UBreadcrumb :items="items" :class="$style.bread"/>

  <div v-if="teacherStore.teacher">
    <Presentation
        :title="teacherStore.teacher.Title"
        :paragraphs="currentLang === 'it' ? teacherStore.teacher.LongDescription_it : teacherStore.teacher.LongDescription"
        :image="teacherStore.teacher.Image"
        :reverse="true"
        :responsible="teacherStore.teacher.LED_ACTIVITIES"
    />

    <div v-if="teacherStore.cvList.length" class="mt-8">
      <Presentation
          :weekProgramming="true"
          :subscribe="false"
          :calendar="false"
          :cv="true"
          :isTeacher="true"
          :Title="teacherStore.teacher.Title"
          :currentDate="dayjs()"
          :activeDate="dayjs()"
          :selectedWeekdayIndex="0"
          :dayEvents="teacherStore.teacher.Events ?? []"
          :experience="translatedCvList"

      />
    </div>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import {useActivityUrl, useSupabaseClient} from '#imports'
import { useLanguage } from '~/composables/useLanguage'
import type { BreadcrumbItem } from "@nuxt/ui"
import dayjs from "dayjs"
import {pageMeta} from "~/locales/pages";
import Presentation from '~/components/Single_Elements/presentation.vue'
import { useTeacherIdStore } from '~/stores/teacherIdStore'
import {useRouter} from "#vue-router";

const teacherStore = useTeacherIdStore()
const { currentLang } = useLanguage()
const { createTeacherUrl } = useActivityUrl()
const supabase = useSupabaseClient()
const route = useRoute()

const router = useRouter()

const teacherId = computed(() => {
  const { extractIdFromSlug } = useActivityUrl()
  return extractIdFromSlug(route.params.id as string)
})


watch(() => teacherStore.teacher, (data) => {
  if (data) {
    const correctUrl = createTeacherUrl(data)
    if (route.path !== correctUrl) {
      router.replace(correctUrl)
    }
  }
})
const translatedCvList = computed(() =>
    teacherStore.cvList.map((entry) => ({
      ...entry,
      TITLE: currentLang.value === 'it' ? entry.TITLE_it : entry.TITLE,
      DESCRIPTION: currentLang.value === 'it' ? entry.DESCRIPTION_it : entry.DESCRIPTION,
      LOCATION: currentLang.value === 'it' ? entry.LOCATION_it : entry.LOCATION
    }))
)
onMounted(async () => {
  await teacherStore.fetchTeacher(teacherId.value, supabase)
  await teacherStore.fetchCV(teacherId.value, supabase)
  await teacherStore.fetchLedActivities(teacherId.value, supabase)
})


watch(currentLang, () => {
  teacherStore.fetchTeacher(teacherId.value, supabase)
}, { immediate: true })
const items = ref<BreadcrumbItem[]>([
  {
    label: 'Teachers',
    to: '/teacherPage',
    ui: {
      linkLabel: 'text-sm md:text-xl text-[#1F3A5F] font-sans'
    }
  },
  {
    label: 'Loading...',
    ui: {
      linkLabel: 'text-base md:text-2xl text-[#1F3A5F] font-sans font-bold underline'
    }
  }
])

watch(() =>teacherStore.teacher, (newVal) => {
  if (newVal) {
    const meta = pageMeta.dynamicTeacher(newVal.Title, currentLang.value)

    useHead({
      title: meta.title,
      meta: [
        {
          name: 'description',
          content: meta.description
        }
      ]
    })

    items.value = [
      {
        label: currentLang.value === 'it' ? 'Insegnanti' : 'Teachers',
        to: '/teacherPage',
        ui: {
          linkLabel: 'text-sm md:text-xl 2xl:text-3xl text-[#1F3A5F] font-sans'
        }
      },
      {
        label: newVal.Title,
        ui: {
          linkLabel: 'text-base md:text-2xl 2xl:text-4xl text-[#1F3A5F] font-sans font-bold underline'
        }
      }
    ]
  }
})
</script>


<style module>
.bread{
  padding: var(--padding) 0 0 var(--padding)
}
</style>