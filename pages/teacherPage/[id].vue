<template>
  <div v-if="teacher">
    <Presentation
        :title="teacher.Title"
        :paragraphs="currentLang === 'it' ? teacher.LongDescription_it : teacher.LongDescription"
        :image="teacher.Image"
        :reverse="true"
    />

    <div v-if="cvList.length" class="mt-8">
      <TeacherCVTable :cvs="cvList" class="m-2" />
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
      .from('Teachers')
      .select('*')
      .eq('Id', teacherId.value)
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
</script>
