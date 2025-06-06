<script setup>
import {ref, onMounted, onUnmounted, computed} from 'vue';
import { defineProps } from 'vue';

// Props
const props = defineProps({
  images: {
    type: Array,
    required: true,
  }
});


const currentSliderIndex = ref(0);
let intervalId;
const isTimerPaused = ref(false);

const nextSlide = () => {
  currentSliderIndex.value = (currentSliderIndex.value + 1) % props.images.length;
  if (!isTimerPaused.value) startSlider();
};

const prevSlide = () => {
  currentSliderIndex.value = (currentSliderIndex.value - 1 + props.images.length) % props.images.length;
  if (!isTimerPaused.value) startSlider();
};

const startSlider = () => {
  clearInterval(intervalId);
  intervalId = setInterval(() => {
    nextSlide();
  }, 5000);
};

const playSlider = () => {
  isTimerPaused.value = false;
  startSlider();
};

const stopSlider = () => {
  clearInterval(intervalId);
  isTimerPaused.value = true;
};

onMounted(() => {
  startSlider();
});

onUnmounted(() => {
  clearInterval(intervalId);
});


</script>



<template>
  <div >
    <div class="flex relative w-full h-full">
      <div class="flex mx-auto justify-center items-center w-full h-full px-4">
        <template v-for="(image, index) in images" :key="index">
          <transition name="slide" mode="out-in">
            <div v-if="index === currentSliderIndex" class="absolute inset-0">
              <div class="relative w-full aspect-video max-h-[80vh] overflow-hidden rounded-lg shadow-md transition-all duration-500 ease-in-out">
                <nuxt-link :to="`/activityPage/${image.Course_Id}`" class="linkWrapper">
                  <h2 class="absolute bottom-4 left-4 z-[20] text-[#1F3A5F] text-4xl sm:text-5xl font-bold bg-blue-300/50 px-4 py-2 rounded hover:scale-105 group cursor-pointer active:scale-105 group hover:[text-shadow:0_0_10px_rgba(31,58,95,0.5)]">
                    {{ image.Title }}
                  </h2>
                </nuxt-link>
                <img
                    :src="image.ImageUrl"
                    :alt="image.Title"
                    class="w-full h-full object-cover block"
                />
              </div>
            </div>
          </transition>
        </template>


        <!-- Pulsanti -->
        <i class="fas fa-caret-right absolute right-0 top-1/3 text-4xl m-2 cursor-pointer text-white z-50"
           @click="nextSlide"></i>
        <i class="fas fa-caret-left absolute left-0 top-1/3 text-4xl m-2 cursor-pointer text-white z-50"
           @click="prevSlide"></i>

        <!-- Play/Pause -->
        <i class="fa-solid fa-circle-play absolute bottom-5 text-3xl m-2 cursor-pointer text-gray-500 z-50"
           @click="playSlider" v-if="isTimerPaused"></i>
        <i class="fa-solid fa-pause absolute bottom-5 text-3xl m-2 cursor-pointer text-gray-500 z-50"
           @click="stopSlider" v-else></i>
      </div>
    </div>
  </div>

</template>



<style>
:global(.linkWrapper) {
  text-decoration: none;
  color: inherit;
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.6s ease;
  position: absolute;
  width: 100%;
}

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

</style>