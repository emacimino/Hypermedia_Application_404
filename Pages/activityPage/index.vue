<template>
    <!-- Replaced static section with modular Presentation component -->
    <Presentation
        title="What do we offer?"
        :paragraphs="[
        'At Serene Flow Yoga, we believe in creating a peaceful space where mind, body, and spirit connect.',
        'Nestled in the heart of the city, our studio offers a calm retreat from the busy world outside — a place where you can breathe, move, and grow at your own pace.',
        'We offer a wide variety of yoga classes suitable for all levels, from complete beginners to experienced practitioners.',
        'Whether you\'re seeking strength, flexibility, balance, or inner peace, you\'ll find a class that suits your needs.'
        ]"

        image="/presentation1.png"
        :reverse="true"
    />
  <elemGrid :activities="activities"></elemGrid>
</template>

<script setup>
import SingleActivityCard from "~/components/singleActivityCard.vue";
import ElemGrid from "~/components/elemGrid.vue";
import {supabase} from "assets/supabase-client.js";
import { useAsyncData } from "#app";

const { data: activities, error } = await useAsyncData("activities", async () => {
  const { data, error } = await supabase.from("Activities").select("*");
  if (error) {
    console.error("Error fetching activities:", error);
    return [];  }
  return data || [];
});

</script>

<style  module>

</style>