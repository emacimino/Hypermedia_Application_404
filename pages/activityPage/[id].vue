<template>
  <div v-if="activity">
    <Presentation
        :title="currentLang === 'it' ? activity.Title_it : activity.Title"
        :paragraphs="currentLang === 'it' ? activity.LongDescription_it : activity.LongDescription"
        :image="activity.Image"
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

interface RawActivity {
  Id: number
  Title_it: string
  Title: string
  LongDescription_it: string
  LongDescription: string
  Image: string
}

const activity = ref<RawActivity | null>(null)
const activityId = computed(() => Number(route.params.id))

const fetchActivity = async () => {
  if (isNaN(activityId.value)) return

  const { data, error } = await supabase
      .from('Activities')
      .select('*')
      .eq('Id', activityId.value)
      .single()

  if (!data || error) {
    console.error('Errore nel caricamento attività:', error)
    activity.value = null
    return
  }

  activity.value = data
}

onMounted(fetchActivity)
watch(currentLang, fetchActivity)
</script>

<style scoped>
</style>
