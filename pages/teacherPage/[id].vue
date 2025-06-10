<template>
  <UBreadcrumb :items="items" :class="$style.bread"/>

  <div v-if="teacher">
    <Presentation
        :title="teacher.Title"
        :paragraphs="currentLang === 'it' ? teacher.LongDescription_it : teacher.LongDescription"
        :image="teacher.Image"
        :reverse="true"
    />

    <div v-if="cvList.length" class="mt-8">
      <Presentation
          :weekProgramming="true"
          :subscribe="false"
          :calendar="false"
          :cv="true"
          :Title="teacher.Title"
          :currentDate="dayjs()"
          :activeDate="dayjs()"
          :selectedWeekdayIndex="0"
          :dayEvents="teacher.Events ?? []"
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
import { useSupabaseClient } from '#imports'
import { useLanguage } from '~/composables/useLanguage'
import type { BreadcrumbItem } from "@nuxt/ui"
import dayjs from "dayjs"
import {pageMeta} from "~/locales/pages";

const { currentLang } = useLanguage()
const { createTeacherUrl, extractIdFromSlug } = useActivityUrl()
const supabase = useSupabaseClient()
const route = useRoute()

interface RawTeacher {
  Id: number
  Title_it: string
  Title: string
  LongDescription_it: string
  LongDescription: string
  Image: string
  Events?: any[]
}

interface CV {
  ID: number
  TEACHER_ID: number
  TITLE: string
  TITLE_it: string
  DESCRIPTION: string
  DESCRIPTION_it: string
  START_DATE: string
  END_DATE: string
  LOCATION: string
  LOCATION_it: string
  CREATED_AT: string
}

const teacher = ref<RawTeacher | null>(null)
const cvList = ref<CV[]>([])
const teacherId = computed(() => extractIdFromSlug(route.params.id as string))



const fetchTeacher = async () => {
  if (isNaN(teacherId.value)) return

  const { data, error } = await supabase
      .from("Teachers")
      .select("*, Events:Events ( * )")
      .eq("Id", teacherId.value)
      .single()

  if (!data || error) {
    console.error('Errore nel caricamento teacher:', error)
    teacher.value = null
    return
  }

  teacher.value = data

  const correctUrl = createTeacherUrl(data)
  if (route.path !== correctUrl) {
    await navigateTo(correctUrl, { replace: true })
  }
}

const fetchCV = async () => {
  if (isNaN(teacherId.value)) return

  const { data, error } = await supabase
      .from('Teachers_cv')
      .select('*')
      .eq('TEACHER_ID', teacherId.value)
      .order('START_DATE', { ascending: false })

  if (error) {
    console.error('Errore nel caricamento CV:', error)
    return
  }

  cvList.value = data || []
}
const translatedCvList = computed(() =>
    cvList.value.map((entry) => ({
      ...entry,
      TITLE: currentLang.value === 'it' ? entry.TITLE_it : entry.TITLE,
      DESCRIPTION: currentLang.value === 'it' ? entry.DESCRIPTION_it : entry.DESCRIPTION,
      LOCATION: currentLang.value === 'it' ? entry.LOCATION_it : entry.LOCATION
    }))
)
onMounted(async () => {
  await fetchTeacher()
  await fetchCV()
})

watch(currentLang, fetchTeacher)

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

watch(teacher, (newVal) => {
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
        label: 'Teachers',
        to: '/teacherPage',
        ui: {
          linkLabel: 'text-sm md:text-xl text-[#1F3A5F] font-sans'
        }
      },
      {
        label: newVal.Title,
        ui: {
          linkLabel: 'text-base md:text-2xl text-[#1F3A5F] font-sans font-bold underline'
        }
      }
    ]
  }
})
</script>


<style module>
.bread{
  padding: 1vw 0 0 1.5vw
}
</style>