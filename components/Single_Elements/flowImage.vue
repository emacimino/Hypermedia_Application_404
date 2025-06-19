<template>

  <div>

    <div class="relative w-full h-full">

      <div class="flex mx-auto justify-center items-center w-full h-full px-4">

        <!-- Loop through all images to create slides -->
        <template v-for="(image, index) in images" :key="index">
          <!-- Apply transition effect depending on direction -->
          <transition :name="direction === 'next' ? 'slide' : 'slide-reverse'" mode="out-in">

            <!-- Show only the active slide -->
            <div v-if="index === currentSliderIndex" class="absolute inset-0">
              <div class="relative w-full aspect-video max-h-[80vh] overflow-hidden rounded-lg shadow-md transition-all duration-500 ease-in-out">

                <!-- Clickable course title linking to its page -->
                <nuxt-link :to="`/activities/${image.Course_Id}`" class="linkWrapper">
                  <h2 class="absolute top-4 left-4 z-[20] text-[#1F3A5F] text-4xl sm:text-5xl font-bold bg-blue-300/50 px-4 py-2 rounded hover:scale-105 group cursor-pointer active:scale-105 group hover:[text-shadow:0_0_10px_rgba(31,58,95,0.5)]">
                    {{ image.Title }}
                  </h2>
                </nuxt-link>

                <!-- Background image for the slide -->
                <img
                    :src="image.ImageUrl"
                    :alt="image.Title"
                    class="w-full h-full object-cover block"
                />

                <!-- Navigation arrows -->
                <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4 z-20">

                  <!-- Left Arrow: previous slide -->
                  <div
                      class="bg-blue-300/60 hover:bg-blue-300/70 p-2 rounded-full cursor-pointer hover:scale-105 active:scale-105"
                      @click="prevSlide"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-[#1F3A5F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  </div>

                  <!-- Right Arrow: next slide -->
                  <div
                      class="bg-blue-300/60 hover:bg-blue-300/70 p-2 rounded-full cursor-pointer hover:scale-105 active:scale-105"
                      @click="nextSlide"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-[#1F3A5F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>

                </div>

              </div>
            </div>

          </transition>
        </template>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { defineProps } from 'vue';


const props = defineProps({
  images: {
    type: Array,
    required: true,
  }
});

// Index of the currently visible slide
const currentSliderIndex = ref(0)

// Direction of the slide transition: 'next' or 'prev'
const direction = ref('next')

// Store interval ID to control automatic slide cycling
let intervalId

// Show the next slide and reset the interval
const nextSlide = () => {
  direction.value = 'next'
  currentSliderIndex.value = (currentSliderIndex.value + 1) % props.images.length
  startSlider()
}

// Show the previous slide and reset the interval
const prevSlide = () => {
  direction.value = 'prev'
  currentSliderIndex.value = (currentSliderIndex.value - 1 + props.images.length) % props.images.length
  startSlider()
}

// Start or restart the automatic slideshow every 5 seconds
const startSlider = () => {
  clearInterval(intervalId)
  intervalId = setInterval(() => {
    nextSlide()
  }, 5000)
}

// Start the slideshow when component is mounted
onMounted(() => {
  startSlider()
})

// Clear the slideshow interval when component is unmounted
onUnmounted(() => {
  clearInterval(intervalId)
})
</script>


<style>
:global(.linkWrapper) {
  text-decoration: none;
  color: inherit;
}

.slide-enter-active,
.slide-leave-active,
.slide-reverse-enter-active,
.slide-reverse-leave-active {
  transition: all 0.6s ease;
  position: absolute;
  width: 100%;
}

/* Slide forward */
.slide-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.slide-enter-to {
  transform: translateX(0%);
  opacity: 1;
}
.slide-leave-from {
  transform: translateX(0%);
  opacity: 1;
}
.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

/* Slide backward */
.slide-reverse-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-reverse-enter-to {
  transform: translateX(0%);
  opacity: 1;
}
.slide-reverse-leave-from {
  transform: translateX(0%);
  opacity: 1;
}
.slide-reverse-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
