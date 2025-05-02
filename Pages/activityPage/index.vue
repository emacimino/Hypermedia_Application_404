<script setup>
import SingleActivityCard from "~/components/singleActivityCard.vue";

const activities = [
  {
    title: 'Hatha Yoga',
    description: 'Description of fifth product',
    price: '$100 month',
    image: '/hathayoga.png'
  },
  {
    title: 'Mindfulness',
    description: 'Description of fifth product',
    price: '$100 month',
    image: '/hathayoga.png'
  },
  {
    title: 'Meditation course',
    description: 'Description of fifth product',
    price: '$100 month',
    image: '/hathayoga.png'
  },
  {
    title: 'Vinyasa yoga',
    description: 'Description of fifth product',
    price: '$100 month',
    image: '/hathayoga.png'
  },
  {
    title: 'Workshops',
    description: 'Description of fifth product',
    price: '$100 month',
    image: '/hathayoga.png'
  },
  {
    title: 'Seminars',
    description: 'Description of fifth product',
    price: '$100 month',
    image: '/hathayoga.png'
  },
  {
    title: 'Retreats',
    description: 'Description of fifth product',
    price: '$100 month',
    image: '/hathayoga.png'
  },
  {
    title: 'Education',
    description: 'Description of fifth product',
    price: '$100 month',
    image: '/hathayoga.png'
  },
  {
    title: 'Crossfit',
    description: 'Description of fifth product',
    price: '$100 month',
    image: '/hathayoga.png'
  },
  {
    title: 'Pilates',
    description: 'Description of fifth product',
    price: '$100 month',
    image: '/hathayoga.png'
  }
];

</script>

<template>
  <div :class="$style.courseGrid">
    <singleActivityCard
        v-for="(activity, index) in activities"
        :key="index"
        :title="activity.title"
        :description="activity.description"
        :price="activity.price"
        :image="activity.image"
    />
  </div>
</template>
<style  module>.quelloPrima {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0%;
  left: 0%;
  line-height: 150%;
  font-weight: 500;
  display: flex;
  align-items: center;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.breadText {
  width: 332px;
  position: relative;
  height: 41px;
  font-size: 16px;
}
.breadText1 {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 332px;
  height: 41px;
}
.breadcrumbsChild {
  position: absolute;
  top: 30.5px;
  left: 109.5px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-top: 1px solid #1f3a5f;
  box-sizing: border-box;
  width: 54px;
  height: 1px;
}
.breadcrumbs {
  width: 372px;
  position: relative;
  height: 75px;
  overflow: hidden;
  flex-shrink: 0;
  font-size: 16px;
}
.topic {
  align-self: stretch;
  position: relative;
  line-height: 150%;
  font-weight: 500;
}
.items {
  position: absolute;
  top: 48px;
  right: 563px;
  width: 187px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  gap: 24px;
}
.items1 {
  position: absolute;
  top: 48px;
  right: 321px;
  width: 187px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  gap: 24px;
}
.items2 {
  position: absolute;
  top: 48px;
  right: 80px;
  width: 187px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  gap: 24px;
}
.whiteLotusCenter {
  position: absolute;
  top: 52px;
  left: 80px;
  font-size: 24px;
  line-height: 150%;
}
.buttonsIcon {
  width: 40px;
  position: relative;
  border-radius: 4px;
  height: 40px;
  object-fit: cover;
}
.socialIcons {
  position: absolute;
  top: 176px;
  left: 80px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 8px;
}
.navigationFooter {
  width: 1579px;
  position: relative;
  background-color: #d0f0fd;
  height: 264px;
  overflow: hidden;
  flex-shrink: 0;
  font-size: 16px;
}
.imageIcon {
  width: 367px;
  position: relative;
  max-height: 100%;
  object-fit: cover;
}
.hathaYoga {
  align-self: stretch;
  position: relative;
  font-size: 24px;
  line-height: 150%;
  font-weight: 500;
}
.copy {
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 4px;
}
.yogaCours {
  width: 367px;
  height: 518px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 24px;
}
.mindfulnessGrid {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}
.yogaCours3 {
  width: 367px;
  height: 518px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}
.meditation1 {
  height: 204px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}
.workshops {
  height: 518px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}
.retreats1 {
  height: 252px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}
.image9Icon {
  width: 367px;
  position: relative;
  height: 367px;
  object-fit: cover;
}
.pilates {
  height: 177px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}
.pilates1 {
  height: 152px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}
.crossfit {
  height: 518px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.courseGrid {
  display: flex;
  width: 100%;
  position: relative;
  height: 1778px;
  overflow: hidden;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-content: center;
  padding: 10px 103px 10px 91px;
  box-sizing: border-box;
  gap: 100px 80px;
  text-align: left;
  font-size: 20px;
  color: #1f3a5f;
  font-family: Inter;
}


</style>