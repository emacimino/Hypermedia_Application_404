<template>
  <div v-if="teacher">
    <Presentation
        :title="teacher.Title"
        :paragraphs="teacher.LongDescription"
        :image="teacher.Image"
        :reverse="true"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useAsyncData } from "#app";
import {useLanguage} from "~/composables/useLanguage";
const { currentLang } = useLanguage();

interface Teacher {
  Id: number;
  Title: string;
  LongDescription: string;
  Image: string;
}
interface RawTeacher {
  Id: number;
  Title: string;
  LongDescription: string;
  LongDescription_it: string;
  Image: string;
}

const route = useRoute();
const supabase = useSupabaseClient();

const teacherId = computed(() => Number(route.params.id));

const { data: teacher } = await useAsyncData<Teacher | null>(`teacher-${teacherId.value}`, async () => {
  if (isNaN(teacherId.value)) return null;

  const result = await supabase
      .from("Teachers")
      .select("*")
      .eq("Id", teacherId.value)
      .single();

  if (!result.data) return null

  const raw = result.data as RawTeacher

  return {
    Id: raw.Id,
    Title: raw.Title,
    LongDescription: currentLang.value === 'it' && raw.LongDescription_it ? raw.LongDescription_it : raw.LongDescription,
    Image: raw.Image
  }
});
</script>

<style scoped>
</style>