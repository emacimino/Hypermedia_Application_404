<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
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
  <div class="h-screen flex flex-col">
    <div class="slider flex relative w-full h-full">
      <div class="flex mx-auto justify-center items-center w-full h-full px-4">
        <template v-for="(image, index) in images" :key="index">
          <transition name="fade">
            <div v-if="index === currentSliderIndex" class="absolute inset-0">
              <div class="relative w-full aspect-video max-h-[80vh] overflow-hidden rounded-lg shadow-md">
                <h2 class="absolute bottom-4 left-4 z-[100] text-white text-4xl sm:text-5xl font-bold bg-black/50 px-4 py-2 rounded">
                  {{ image.Title }}
                </h2>

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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s, transform 1s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(0);
}
</style>