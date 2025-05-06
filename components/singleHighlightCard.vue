<template>
  <div :class="$style.property1default">
    <img :class="$style.shapeIcon" alt="" :src="shape1" />
    <img :class="$style.imageIcon" alt="" :src="image2" />
    <img :class="$style.shapeIcon1" alt="" :src="shape2" />

    <div :class="$style.btn">
      <b :class="$style.goSeeOur">{{ buttonText }}</b>
    </div>

    <b :class="$style.craftItYourself">{{ title }}</b>

    <div :class="$style.turnOffWhenSavingOut">
      <div :class="$style.grad" />
      <div :class="$style.pushingItSafeArea" />
      <div :class="$style.safeArea" />
    </div>

    <img :class="$style.property1defaultChild" alt="" src="/Arrow.svg" />
  </div>
</template>

<script setup>
defineProps({
  image2: String,
  shape1: String,
  shape2: String,
  title: {
    type: String,
    default: 'Discover our activity!',
  },
  buttonText: {
    type: String,
    default: 'Go see it!',
  }
})
</script>
<style  module>.imageIcon {
  position: absolute;
  border-radius: 2%;
  top: 10.47%;     /* 201 / 1920 */
  left: 15.56%;    /* 168 / 1080 */
  width: 68.89%;   /* 744 / 1080 */
  height: 53.02%;  /* 1018 / 1920 */
  overflow: hidden;
  object-fit: cover;
}

.shapeIcon {
  position: absolute;
  top: 1.15%;       /* 22 / 1920 */
  left: 46.02%;     /* 497 / 1080 */
  width: 69.53%;    /* 750.8 / 1080 */
  height: 48.61%;   /* 933.4 / 1920 */
  object-fit: contain;
  opacity: 0.3;
}

.shapeIcon1 {
  position: absolute;
  top: 63.49%;      /* 1219 / 1920 */
  left: -2.44%;     /* -26.31 / 1080 */
  width: 38.66%;    /* 417.5 / 1080 */
  height: 43.49%;   /* 834.9 / 1920 */
  object-fit: contain;
  opacity: 0.3;
}

.goSeeOur {
  position: absolute;
  top: 0.78%;       /* 15 / 1920 */
  left: 0%;
  letter-spacing: 0.01em;
  line-height: 110%;
}

.btn {
  position: absolute;
  top: 78.44%;      /* 1506 / 1920 */
  left: 15.56%;     /* 168 / 1080 */
  width: 46.11%;    /* 498 / 1080 */
  height: 3.77%;    /* 130 / 1920 */
}

.craftItYourself {
  position: absolute;
  top: 64.11%;      /* 1231 / 1920 */
  left: 15.56%;     /* 168 / 1080 */
  font-size: 3vw; /* 128/1920 -> meglio usare vw per testo responsive */
  line-height: 90%;
  display: inline-block;
  text-align: left;
  width: 83.7%;     /* 904 / 1080 */
  height: 8.4%;    /* 238 / 1920 */
}

.grad {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0%;
  right: 0%;
  bottom: 0%;
  left: 0%;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0) 21.35%, rgba(0, 0, 0, 0) 86.41%, rgba(0, 0, 0, 0.15));
}

.pushingItSafeArea {
  position: absolute;
  height: 81.09%;   /* (1920 - 363) / 1920 */
  width: 91.48%;    /* (1080 - 92) / 1080 */
  top: 10.16%;      /* 195 / 1920 */
  right: 4.26%;     /* 46 / 1080 */
  bottom: 8.75%;    /* 168 / 1920 */
  left: 4.26%;      /* 46 / 1080 */
  background-color: rgba(87, 99, 242, 0.1);
  border: 0.19vw solid #404df2;
  box-sizing: border-box;
}

.safeArea {
  position: absolute;
  height: 74.17%;   /* (1920 - 496) / 1920 */
  width: 82.78%;    /* (1080 - 186) / 1080 */
  top: 12.81%;      /* 246 / 1920 */
  right: 8.61%;     /* 93 / 1080 */
  bottom: 13.02%;   /* 250 / 1920 */
  left: 8.61%;      /* 93 / 1080 */
  background-color: rgba(87, 99, 242, 0.1);
  border: 0.19vw solid #404df2;
  box-sizing: border-box;
}

.turnOffWhenSavingOut {
  position: absolute;
  top: -0.26%;      /* -5 / 1920 */
  left: 0px;
  width: 100%;
  height: 100%;
  display: none;
}

.property1defaultChild {
  position: absolute;
  top: 81.2%;       /* 1561 / 1920 */
  left: 73.15%;     /* 790 / 1080 */
  max-height: 100%;
  width: 3.8%;      /* 41 / 1080 */
}

.property1default {
  width: 100%;
  position: relative;
  border-radius: 0.28vw; /* 3 / 1080 */
  background-color: #0769a2;
  height: 45.57vw; /* 1739 / 1920 ≈ 90.57% of 1080vw (used to preserve aspect ratio) */
  overflow: hidden;
  text-align: center;
  font-size: 2.81vw;  /* 54 / 1920 */
  color: #ffe5b4;
  font-family: 'Rounded Mplus 1c Bold';
}


</style>