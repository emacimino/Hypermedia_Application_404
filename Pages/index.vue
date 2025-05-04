<template>
  <div>
    <img :class="$style.image22Icon" alt="" src="/image 22.png" />
  </div>
  <div :class="$style.aboutUs">
    <!-- Replaced static section with modular Presentation component -->
    <Presentation
        title="Who we are"
        :paragraphs="[
        'At White Lotus, wellness is a way of life rooted in mindfulness, balance, and a deep sense of community.',
        'Born from the desire to create an inclusive and inspiring space, we offer yoga, meditation, Pilates, and holistic practices to support your journey.',
        'Guided by passion and purpose, every class is designed to help you grow, heal, and reconnect — body, mind, and spirit.'
        ]"
        image="/presentation1.png"
        :reverse="true"
    />
  </div>
  <div :class="$style.aboutUs">
    <Presentation
        title="Who we are"
        :paragraphs="[
        'At White Lotus, wellness is a way of life rooted in mindfulness, balance, and a deep sense of community.',
        'Born from the desire to create an inclusive and inspiring space, we offer yoga, meditation, Pilates, and holistic practices to support your journey.',
        'Guided by passion and purpose, every class is designed to help you grow, heal, and reconnect — body, mind, and spirit.'
        ]"
        image="/calendar.png"
        :reverse="false"
    />
  </div>
  <div :class="$style.prices">
    <div :class="$style.price">
      <div :class="$style.type">
        <div :class="$style.tipoPacchetto">tipo pacchetto</div>
      </div>
      <div :class="$style.wrapper">
        <div :class="$style.div">500$</div>
      </div>
    </div>
    <div :class="$style.price1">
      <div :class="$style.type">
        <div :class="$style.tipoPacchetto">tipo pacchetto</div>
      </div>
      <div :class="$style.wrapper">
        <div :class="$style.div">500$</div>
      </div>
    </div>
    <div :class="$style.price2">
      <div :class="$style.type">
        <div :class="$style.tipoPacchetto">tipo pacchetto</div>
      </div>
      <div :class="$style.wrapper">
        <div :class="$style.div">500$</div>
      </div>
    </div>
    <div :class="$style.price3">
      <div :class="$style.type">
        <div :class="$style.tipoPacchetto">tipo pacchetto</div>
      </div>
      <div :class="$style.wrapper">
        <div :class="$style.div">500$</div>
      </div>
    </div>
    <div :class="$style.price4">
      <div :class="$style.type">
        <div :class="$style.tipoPacchetto">tipo pacchetto</div>
      </div>
      <div :class="$style.wrapper">
        <div :class="$style.div">500$</div>
      </div>
    </div>
    <div :class="$style.price5">
      <div :class="$style.type">
        <div :class="$style.tipoPacchetto">tipo pacchetto</div>
      </div>
      <div :class="$style.wrapper">
        <div :class="$style.div">500$</div>
      </div>
    </div>
    <div :class="$style.price6">
      <div :class="$style.type">
        <div :class="$style.tipoPacchetto">tipo pacchetto</div>
      </div>
      <div :class="$style.wrapper">
        <div :class="$style.div">500$</div>
      </div>
    </div>
    <div :class="$style.price7">
      <div :class="$style.type">
        <div :class="$style.tipoPacchetto">tipo pacchetto</div>
      </div>
      <div :class="$style.wrapper">
        <div :class="$style.div">500$</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Presentation from '../components/presentation.vue'
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
.image22Icon {
   width: 100%;
   position: relative;
   max-width: 100%;
   overflow: hidden;
   max-height: 100%;
   object-fit: cover;
 }
.calendarIcon {
  width: 50%;
  position: relative;
  max-width: 100%;
  overflow: hidden;
  height: 876px;
}


.tipoPacchetto {
  position: absolute;
  top: 0px;
  left: 0px;
  letter-spacing: -0.02em;
  font-weight: 500;
  display: inline-block;
  width: 384px;
  height: 77px;
}
.type {
  position: absolute;
  top: 141px;
  left: 0px;
  width: 384px;
  height: 77px;
  overflow: hidden;
}
.div {
  position: absolute;
  top: 18px;
  left: 0px;
  letter-spacing: -0.02em;
  font-weight: 500;
  display: inline-block;
  width: 384px;
  height: 105px;
}
.wrapper {
  position: absolute;
  top: 0px;
  left: 0px;
  background-color: #ffe5b4;
  width: 384px;
  height: 141px;
  overflow: hidden;
  font-size: 96px;
}
.price {
  position: absolute;
  top: 51px;
  left: 79px;
  background-color: rgba(255, 255, 255, 0);
  width: 384px;
  height: 218px;
  overflow: hidden;
}
.price1 {
  position: absolute;
  top: 53px;
  left: 541px;
  background-color: rgba(255, 255, 255, 0);
  width: 384px;
  height: 218px;
  overflow: hidden;
}
.price2 {
  position: absolute;
  top: 51px;
  left: 999px;
  background-color: rgba(255, 255, 255, 0);
  width: 384px;
  height: 218px;
  overflow: hidden;
}
.price3 {
  position: absolute;
  top: 51px;
  left: 1457px;
  background-color: rgba(255, 255, 255, 0);
  width: 384px;
  height: 218px;
  overflow: hidden;
}
.price4 {
  position: absolute;
  top: 360px;
  left: 79px;
  background-color: rgba(255, 255, 255, 0);
  width: 384px;
  height: 218px;
  overflow: hidden;
}
.price5 {
  position: absolute;
  top: 362px;
  left: 541px;
  background-color: rgba(255, 255, 255, 0);
  width: 384px;
  height: 218px;
  overflow: hidden;
}
.price6 {
  position: absolute;
  top: 360px;
  left: 999px;
  background-color: rgba(255, 255, 255, 0);
  width: 384px;
  height: 218px;
  overflow: hidden;
}
.price7 {
  position: absolute;
  top: 360px;
  left: 1457px;
  background-color: rgba(255, 255, 255, 0);
  width: 384px;
  height: 218px;
  overflow: hidden;
}
.prices {
  width: 100%;
  position: relative;
  background-color: rgba(255, 255, 255, 0);
  height: 795px;
  overflow: hidden;
  text-align: center;
  font-size: 48px;
  color: #000;
  font-family: Inter;
}
</style>
