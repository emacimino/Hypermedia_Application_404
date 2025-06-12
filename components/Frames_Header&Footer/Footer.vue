<template>
  <div class = "bg-blue-100" :class="$style.barraFooter">
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
  height: 7rem;
  padding-left: 4rem;
  box-sizing: border-box;
}
.whiteLotusCenter {
  font-size: 2rem;
  line-height: 150%;
  color: #1f3a5f;
}
.socialIcon {
  display: flex;
  gap: 16px;
  color: #1f3a5f;
}
.responsiveIcon {
  font-size: 2rem;
}


@media (max-width: 768px) {
  .barraFooter {
    height: 4rem;
    padding-left: 2.5rem;
  }
  .whiteLotusCenter {
    font-size: 1.75rem;
  }
  .responsiveIcon {
    font-size: 1.75rem;
  }
}

@media (min-width: 2560px){
  .barraFooter {
    height: 12rem;
  }
  .whiteLotusCenter {
    font-size: 3.5rem;
  }
  .responsiveIcon {
    font-size: 3.5rem;
  }
}
</style>
