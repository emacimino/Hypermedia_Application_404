<!--This is the specific page of an activity-->
<template>
  <!--breadcrumbs-->
  <UBreadcrumb :items="items" :class="$style.bread"/>

  <div v-if="activityStore.activity">
    <!--initial description-->
    <Presentation
        :title="currentLang === 'it' ? activityStore.activity.Title_it : activityStore.activity.Title"
        :paragraphs="currentLang === 'it' ? activityStore.activity.LongDescription_it : activityStore.activity.LongDescription"
        :image="activityStore.activity.Image"
        :reverse="true"
        :respTeacher="activityStore.activity.Course_leader?.Title"
        :respTeacherId="activityStore.activity.Course_leader?.Id"
        :alt="activityImage"
    />
    <!--activity schedule and form to send an application form-->
    <Presentation
        :weekProgramming="true"
        :subscribe="true"
        :calendar="false"
        :Title="activityStore.activity.Title"
        :currentDate="dayjs().startOf('isoWeek')"
        :activeDate="dayjs()"
        :selectedWeekdayIndex="dayjs().isoWeekday() - 1"
        :dayEvents="activityStore.activity.Events ?? []"
        :isActivity="true"
    />
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script setup lang="ts">
import { watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useHead } from '#imports'
import { useLanguage } from '~/composables/useLanguage'
import { pageMeta } from '@/locales/pages'
import { useUrl } from '~/composables/useUrl'
import Presentation from '~/components/Single_Elements/presentation.vue'
import type { BreadcrumbItem } from '@nuxt/ui'
import { useActivityIdStore } from '~/stores/activities/activityIdStore'
import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'
dayjs.extend(isoWeek)
const { currentLang } = useLanguage()
const route = useRoute()
const router = useRouter()
const activityStore = useActivityIdStore()
const activityImage = "activity image"
const activityId = computed(() => {
  const { extractIdFromSlug } = useUrl()
  return extractIdFromSlug(route.params.id as string)
})

const { createActivityUrl } = useUrl()
watch(() => activityStore.activity, (data) => {
  if (data) {
    const correctUrl = createActivityUrl(data)
    if (route.path !== correctUrl) {
      router.replace(correctUrl)
    }
  }
})

watch([activityId, currentLang], ([id]) => {
  if (id) {
    activityStore.fetchActivity(id)
  }
}, { immediate: true })

//breadcrumbs
const items = computed<BreadcrumbItem[]>(() => {
  const base = {
    label: currentLang.value === 'it' ? 'Attività' : 'Activities',
    to: '/activities',
    ui: {
      linkLabel: 'text-sm md:text-xl 2xl:text-3xl text-[#1F3A5F] font-sans'
    }
  }

  const second = activityStore.activity
      ? {
        label: currentLang.value === 'it'
            ? activityStore.activity.Title_it
            : activityStore.activity.Title,
        ui: {
          linkLabel: 'text-base md:text-2xl 2xl:text-4xl text-[#1F3A5F] font-sans font-bold underline'
        }
      }
      : {
        label: 'Loading...',
        ui: {
          linkLabel: 'text-base md:text-2xl 2xl:text-4xl text-[#1F3A5F] font-sans font-bold underline'
        }
      }

  return [base, second]
})

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
      }
    }
)
</script>

<style module>
.bread {
  padding: var(--padding) 0 0 var(--padding)
}
</style>
