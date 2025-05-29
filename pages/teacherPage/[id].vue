<template>
  <div v-if="teacher">
    <Presentation
        :title="teacher.Title"
        :paragraphs="currentLang === 'it' ? teacher.LongDescription_it : teacher.LongDescription"
        :image="teacher.Image"
        :reverse="true"
    />
    <Subscription />
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useSupabaseClient } from '#imports'
import Subscription from '~/components/subscription.vue'
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

const teacher = ref<RawTeacher | null>(null)
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

onMounted(fetchTeacher)
watch(currentLang, fetchTeacher)
</script>

<style scoped>
</style>
