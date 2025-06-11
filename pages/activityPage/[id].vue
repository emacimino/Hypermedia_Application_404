<template>
  <UBreadcrumb :items="items" :class="$style.bread"/>

  <div v-if="activityStore.activity">
    <Presentation
        :title="currentLang === 'it' ? activityStore.activity.Title_it : activityStore.activity.Title"
        :paragraphs="currentLang === 'it' ? activityStore.activity.LongDescription_it : activityStore.activity.LongDescription"
        :image="activityStore.activity.Image"
        :reverse="true"
    />
    <Presentation
        :weekProgramming="true"
        :subscribe="true"
        :calendar="false"
        :Title="activityStore.activity.Title"
        :currentDate="dayjs()"
        :activeDate="dayjs()"
        :selectedWeekdayIndex="0"
        :dayEvents="activityStore.activity.Events ?? []"
    />
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useHead, useSupabaseClient } from '#imports'
import { useLanguage } from '~/composables/useLanguage'
import { pageMeta } from '@/locales/pages'
import { useActivityUrl } from '~/composables/useActivityUrl'
import Presentation from '~/components/Single_Elements/presentation.vue'
import type { BreadcrumbItem } from '@nuxt/ui'
import { useActivityIdStore } from '~/stores/activityIdStore'
import dayjs from 'dayjs'

const { currentLang } = useLanguage()
const supabase = useSupabaseClient()
const route = useRoute()
const router = useRouter()

const activityStore = useActivityIdStore()

const activityId = computed(() => {
  const { extractIdFromSlug } = useActivityUrl()
  return extractIdFromSlug(route.params.id as string)
})

const { createActivityUrl } = useActivityUrl()
watch(() => activityStore.activity, (data) => {
  if (data) {
    const correctUrl = createActivityUrl(data)
    if (route.path !== correctUrl) {
      router.replace(correctUrl)
    }
  }
})

const fetch = () => {
  if (activityId.value) {
    activityStore.fetchActivity(activityId.value, supabase)
  }
}
onMounted(fetch)
watch(currentLang, fetch)

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

watch(
    () => activityStore.activity,
    (newVal) => {
      if (newVal) {
        const meta = pageMeta.dynamicActivity(newVal.Title, currentLang.value)

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
            label: currentLang.value === 'it' ? 'Attività' : 'Activities',
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
    }
)
</script>

<style module>
.bread {
  padding: 1vw 0 0 1.5vw;
}
</style>
