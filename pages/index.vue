<template>
  <div :class="$style.container">
    <b :class="$style.hathaYogaCourse">{{ t('pages.index.hathaTitle') }}</b>
    <img :class="$style.image22Icon" alt="" src="/Home%20room.png" />
  </div>
  <div :class="$style.aboutUs">
    <Presentation
        :title="t('pages.index.section1.title')"
        :paragraphs="t('pages.index.section1.description')"
        image="/presentation1.png"
        :reverse="true"
    />
  </div>
  <div :class="$style.aboutUs">
    <Presentation
        :title="t('pages.index.section2.title')"
        :paragraphs="t('pages.index.section2.description')"
        image="/calendar.png"
        :reverse="false"
    />
  </div>
  <div :class="$style.prices">
    <packet
        v-for="(item, index) in packets"
        :key="index"
        :type="item.type"
        :price="item.price"
    />
  </div>
</template>

<script setup lang="ts">
import { useLanguage } from '../composables/useLanguage'
import packet from '../components/packet.vue'

const { t } = useLanguage()

const packets = Array.from({ length: 8 }, (_, i) => ({
  price: `500$`,
  type: `Pacchetto ${i + 1}`
}))
</script>

<style module>
.aboutUs {
  width: 100%;
  position: relative;
  background-color: #fff;
  overflow: hidden;
  text-align: left;
  font-size: 64px;
  color: #1f3a5f;
  font-family: Inter;
}

.container {
  position: relative;
  display: inline-block;
}

.image22Icon {
  width: 100%;
  height: auto;
  display: block;
}
.calendarIcon {
  width: 50%;
  position: relative;
  max-width: 100%;
  overflow: hidden;
  height: 876px;
}

.prices {
  width: 100%;
  position: relative;
  background-color: #fff;
  overflow: hidden;
  text-align: center;
  font-size: 48px;
  color: #000;
  font-family: Inter;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  justify-items: center;
}
.hathaYogaCourse {
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(-100px, 200px);
  color: #1f3a5f;
  padding: 8px;
  font-size: 64px;
}
</style>
