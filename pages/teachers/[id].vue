<!--This is the specific page of a teacher-->
<template>
  <!--breadcrumbs-->
  <UBreadcrumb :items="items" :class="$style.bread"/>

  <div v-if="teacherStore.teacher">
    <!--initial description-->
    <Presentation
        :title="teacherStore.teacher.Title"
        :paragraphs="currentLang === 'it' ? teacherStore.teacher.LongDescription_it : teacherStore.teacher.LongDescription"
        :image="teacherStore.teacher.Image"
        :reverse="true"
        :responsible="teacherStore.teacher.LED_ACTIVITIES"
    />

    <!--teacher's lectures and CV with past experience.-->
    <div v-if="teacherStore.cvList.length" class="mt-8">
      <Presentation
          :weekProgramming="true"
          :subscribe="false"
          :calendar="false"
          :cv="true"
          :isTeacher="true"
          :Title="teacherStore.teacher.Title"
          :currentDate="dayjs().startOf('isoWeek')"
          :activeDate="dayjs()"
          :selectedWeekdayIndex="dayjs().isoWeekday() - 1"
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
import { watch, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useUrl } from '#imports'
import { useLanguage } from '~/composables/useLanguage'
import type { BreadcrumbItem } from "@nuxt/ui"
import dayjs from "dayjs"
import {pageMeta} from "~/locales/pages";
import Presentation from '~/components/Single_Elements/presentation.vue'
import { useTeacherIdStore } from '~/stores/teachers/teacherIdStore'
import {useRouter} from "#vue-router";
import isoWeek from 'dayjs/plugin/isoWeek'
dayjs.extend(isoWeek)

const teacherStore = useTeacherIdStore()
const { currentLang } = useLanguage()
const { createTeacherUrl } = useUrl()
const route = useRoute()
const router = useRouter()

const teacherId = computed(() => {
  const { extractIdFromSlug } = useUrl()
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
  await teacherStore.fetchTeacher(teacherId.value)
})


watch(currentLang, () => {
  teacherStore.fetchTeacher(teacherId.value)
}, { immediate: true })
const items = computed<BreadcrumbItem[]>(() => {
  const base = {
    label: currentLang.value === 'it' ? 'Docenti' : 'Teachers',
    to: '/teachers',
    ui: {
      linkLabel: 'text-sm md:text-xl text-[#1F3A5F] font-sans'
    }
  }

  const second = teacherStore.teacher
      ? {
        label: currentLang.value === 'it'
            ? teacherStore.teacher.Title_it
            : teacherStore.teacher.Title,
        ui: {
          linkLabel: 'text-base md:text-2xl text-[#1F3A5F] font-sans font-bold underline'
        }
      }
      : {
        label: 'Loading...',
        ui: {
          linkLabel: 'text-base md:text-2xl text-[#1F3A5F] font-sans font-bold underline'
        }
      }

  return [base, second]
})


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
  }
})
</script>


<style module>
.bread{
  padding: var(--padding) 0 0 var(--padding)
}
</style>