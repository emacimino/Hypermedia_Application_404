<template>
  <UBreadcrumb :items="items" :class="$style.bread"/>

  <div v-if="activity">
    <Presentation
        :title="currentLang === 'it' ? activity.Title_it : activity.Title"
        :paragraphs="currentLang === 'it' ? activity.LongDescription_it : activity.LongDescription"
        :image="activity.Image"
        :reverse="true"
    />
    <Presentation
        :weekProgramming="true"
        :subscribe="true"
        :calendar="false"
        :Title="activity.Title"
        :currentDate="dayjs()"
        :activeDate="dayjs()"
        :selectedWeekdayIndex="0"
        :dayEvents="activity.Events ?? []"
    />
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
import dayjs from "dayjs";
import type {BreadcrumbItem} from "@nuxt/ui";

const { currentLang } = useLanguage()
const { createActivityUrl, extractIdFromSlug } = useActivityUrl()
const supabase = useSupabaseClient()
const route = useRoute()

interface EventItem {
  Id: number
  Course_id: number
  Date?: string
  Type?: string
  Teacher_name?: string
}

interface RawActivity {
  Id: number
  Title: string
  Title_it: string
  LongDescription: string
  LongDescription_it: string
  Image: string
  Events?: EventItem[]
}

const activity = ref<RawActivity | null>(null)
const activityId = computed(() => extractIdFromSlug(route.params.id as string))

// Retrieve events
const fetchActivity = async () => {
  if (isNaN(activityId.value)) {return}

  const { data, error } = await supabase
      .from("Activities")
      .select(`
    *,
    Events:Events ( * )
  `)
      .eq("Id", activityId.value)
      .single()

  if (!data || error) {
    console.error('Errore nel caricamento attività:', error)
    activity.value = null
    return
  }

  activity.value = data

  // Opzionale: Reindirizza alla URL corretta se lo slug non corrisponde
  const correctUrl = createActivityUrl(data)
  const currentPath = route.path
  if (currentPath !== correctUrl) {
    await navigateTo(correctUrl, { replace: true })
  }
}

onMounted(fetchActivity)
watch(currentLang, fetchActivity)

const items = ref<BreadcrumbItem[]>([
  {
    label: 'Activities',
    to: '/activityPage',
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

watch(activity, (newVal) => {
  if (newVal) {
    items.value = [
      {
        label: 'Activities',
        to: '/activityPage',
        ui: {
          linkLabel: 'text-sm md:text-xl text-[#1F3A5F] font-sans'
        }
      },
      {
        label: currentLang.value === 'it' ? newVal.Title_it : newVal.Title,
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