<template>
  <div :class="$style.barraFooter">
    <div :class="$style.whiteLotusCenter">White Lotus Center</div>
    <div :class="$style.socialIcon">
      <Icon name="mdi:facebook" :class="$style.responsiveIcon" />
      <Icon name="mdi:instagram" :class="$style.responsiveIcon" />
      <Icon name="mdi:youtube" :class="$style.responsiveIcon" />
    </div>
  </div>
</template>

<style module>
.barraFooter {
  width: 100%;
  height: 7vw;
  background-color: #d0f0fd;
  padding-left: 5vw;
  box-sizing: border-box;
}
.whiteLotusCenter {
  font-size: 2vw;
  line-height: 150%;
  color: #1f3a5f;
}
.socialIcon {
  display: flex;
  gap: 16px;
  color: #1f3a5f;
}
.responsiveIcon {
  font-size: 2vw;
}


@media (max-width: 760px) {
  .barraFooter {
    height: 17vw;
  }
  .whiteLotusCenter {
    font-size: 5vw;
  }
  .responsiveIcon {
    font-size: 5.5vw;
  }
}
</style>
