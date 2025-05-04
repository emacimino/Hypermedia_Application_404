<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";  // Import the useRoute hook

const route = useRoute();  // Access the current route

// Define your contentMap
const contentMap = {
  yoga: {
    title: "🌿 Yoga Course",
    subheading: "Subheading for description or instructions",
    paragraphs: [
      "Discover balance, strength, and inner peace with our guided yoga course...",
      "Led by certified instructors...",
      "Join us to move, breathe, and grow.",
      "🧘‍♀️ Weekly sessions | Small class sizes"
    ],
    imageSrc: "/hathayoga.png"
  },
  pilates: {
    title: "💪 Pilates Class",
    subheading: "Improve posture and flexibility",
    paragraphs: [
      "Pilates helps you build core strength and balance.",
      "Ideal for all levels...",
      "Small groups with expert trainers.",
      "📅 Weekly sessions | All equipment provided"
    ],
    imageSrc: "/pilates.png"
  }
};

// Compute the content based on the route parameter
const content = computed(() => {
  const id = route.params.id as 'yoga' | 'pilates';
  return contentMap[id] || null;
});
</script>

<template>
  <div v-if="content" :class="$style.copyParent">
    <div :class="$style.copy">
      <b :class="$style.yogaCourse">{{ content.title }}</b>
      <div :class="$style.subheadingForDescription">{{ content.subheading }}</div>
      <div :class="$style.paragraph">
        <p
            v-for="(paragraph, i) in content.paragraphs"
            :key="i"
            :class="$style.discoverBalanceStrength"
        >
          {{ paragraph }}
        </p>
      </div>
    </div>
    <img :src="content.imageSrc" :class="$style.image8Icon" />
  </div>
</template>

<style  module>.yogaCourse {
  align-self: stretch;
  position: relative;
  letter-spacing: -0.02em;
}
.subheadingForDescription {
  align-self: stretch;
  position: relative;
  font-size: 24px;
  line-height: 150%;
}
.discoverBalanceStrength {
  margin: 0;
}
.paragraph {
  align-self: stretch;
  position: relative;
  font-size: 20px;
  line-height: 150%;
  font-weight: 500;
}
.copy {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 10%;
}
.image8Icon {
  width: 50%;
  position: relative;
  max-height: 100%;
  object-fit: cover;
}
.copyParent {
  width: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 10% 10% 10% 10%;
  box-sizing: border-box;
  gap: 162px;
  text-align: left;
  font-size: 64px;
  color: #1f3a5f;
  font-family: Inter;
}

</style>