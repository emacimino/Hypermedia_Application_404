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
  }, 3000);
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
    <div class="slider flex h-[100%]">
      <div class="flex mx-auto justify-center relative w-[500px] h-[300px] m-auto">
        <template v-for="(image, index) in images" :key="index">
          <transition name="fade">
            <div v-if="index === currentSliderIndex" class="absolute w-full h-full">
              <!-- Titolo sopra la foto -->
              <div class="absolute top-0 left-0 w-full text-center text-white bg-black bg-opacity-50 py-2 z-40">
                <h2 class="text-xl font-semibold">{{ image.Title }}</h2>
              </div>
              <!-- Immagine -->
              <img :src="image.ImageUrl" :alt="image.Title" class="aspect-[16/9] w-full h-full object-cover" />
            </div>
          </transition>
        </template>

        <!-- next and previous buttons -->
        <i class="fas fa-caret-right absolute right-0 top-1/3 text-4xl m-2 cursor-pointer text-white z-50"
           @click="nextSlide"></i>
        <i class="fas fa-caret-left absolute left-0 top-1/3 text-4xl m-2 cursor-pointer text-white z-50"
           @click="prevSlide"></i>

        <!-- play or pause buttons -->
        <i class="fa-solid fa-circle-play absolute bottom-5 text-3xl m-2 cursor-pointer text-gray-500 z-50"
           @click="playSlider" v-if="isTimerPaused"></i>
        <i class="fa-solid fa-pause absolute bottom-5 text-3xl  m-2 cursor-pointer shadow-2xl text-gray-500 z-50"
           @click="stopSlider" v-else="isTimerPaused"></i>
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