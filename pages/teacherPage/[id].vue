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
          :dayEvents="teacher.events ?? []"
          :experience="cvList"
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
import TeacherCVTable from '~/components/CV_experience.vue'
import { useLanguage } from '~/composables/useLanguage'
import type {BreadcrumbItem} from "@nuxt/ui";
import dayjs from "dayjs";

const { currentLang } = useLanguage()
const supabase = useSupabaseClient()
const route = useRoute()

interface RawTeacher {
  Id: number
  Title_it: string
  Title: string
  LongDescription_it: string
  LongDescription: string
  Image: string
}

interface CV {
  ID: number
  TEACHER_ID: number
  TITLE: string
  DESCRIPTION: string
  START_DATE: string
  END_DATE: string
  LOCATION: string
  CREATED_AT: string
}

const teacher = ref<RawTeacher | null>(null)
const cvList = ref<CV[]>([])
const teacherId = computed(() => Number(route.params.id))

const fetchTeacher = async () => {
  if (isNaN(teacherId.value)) return

  const { data, error } = await supabase
      .from("Teachers")
      .select(`
    *,
    events:events ( * )
  `)
      .eq("Id", teacherId.value)
      .single()

  if (!data || error) {
    console.error('Errore nel caricamento teacher:', error)
    teacher.value = null
    return
  }

  teacher.value = data
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
      linkLabel: 'text-xl text-[#1F3A5F] font-sans'
    }
  },
  {
    label: 'teacherPage',
    ui: {
      linkLabel: 'text-2xl text-[#1F3A5F] font-sans font-bold underline'
    }
  }
])
watch(teacher, (newVal) => {
  if (newVal) {
    items.value = [
      {
        label: 'Teachers',
        to: '/teacherPage',
        ui: {
          linkLabel: 'text-xl text-[#1F3A5F] font-sans'
        }
      },
      {
        label: currentLang.value === 'it' ? newVal.Title_it : newVal.Title,
        ui: {
          linkLabel: 'text-2xl text-[#1F3A5F] font-sans font-bold underline'
        }
      }
    ]
  }
})
</script>

<style module>
.bread{
  padding: 1rem 0 0 2rem
}


@media (max-width: 760px) {
  .bread{
    padding: 0.5rem 0 0 1rem
  }
}
</style>
