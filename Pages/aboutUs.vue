<template>
  <div :class="$style.aboutUs">
    <div :class="$style.iconsbasemapsParent">

      <img :class="$style.image20Icon" alt="" src="/image 20.png" />
    </div>
    <img :class="$style.image19Icon" alt="" src="/image 19.png" />
    <div :class="$style.barraHome">

      <div :class="$style.activities" @click="onActivitiesContainerClick">
        <div :class="$style.activities1">Activities</div>
      </div>
      <div :class="$style.teachers">
        <div :class="$style.activitiesWrapper">
          <div :class="$style.activities1">Teachers</div>
        </div>
      </div>
      <div :class="$style.contacts">
        <div :class="$style.activitiesWrapper">
          <div :class="$style.activities1">Highlights</div>
        </div>
      </div>
      <div :class="$style.aboutUs1" @click="onAboutUsContainerClick">
        <div :class="$style.activitiesWrapper">
          <div :class="$style.activities1">About us</div>
        </div>
      </div>
      <!--<img :class="$style.landmarkFlagIcon" alt="" src="landmark_flag.png" /> -->
    </div>
    <div :class="$style.coursesPresentation">
      <b :class="$style.whatDoWe">About us</b>
      <div :class="$style.atSereneFlowContainer">
        <p :class="$style.atYogaCenter">At [Yoga Center Name], we believe that wellness is more than a practice — it's a lifestyle rooted in balance, awareness, and community. Founded with the intention of creating a space where everyone feels welcome, supported, and inspired, our center offers a holistic approach to well-being through yoga, meditation, Pilates, workshops, retreats, and instructor education.</p>
        <p :class="$style.atYogaCenter">Our passionate team of certified instructors brings together diverse backgrounds and specialties, united by a shared commitment to guiding others toward physical strength, mental clarity, and inner peace. Whether you're taking your first class or deepening a long-time practice, you’ll find a nurturing environment that honors your unique journey.</p>
        <p :class="$style.atYogaCenter">From the quiet of a meditation session to the energy of a CrossFit workout, each experience at [Yoga Center Name] is thoughtfully designed to help you grow, heal, and thrive — on and off the mat.</p>
        <p :class="$style.atYogaCenter">🌿 Rooted in mindfulness. Driven by community. Focused on your well-being.</p>
      </div>
    </div>
    <b :class="$style.contacts1">Contacts</b>
    <b :class="$style.addressZenflowYogaContainer">
      <p :class="$style.atYogaCenter">📍 Address  Zenflow Yoga Center  42 Harmony Way  Rivervale, CA 90210  United States</p>
      <p :class="$style.atYogaCenter">📞 Phone  +1 (310) 555-8123</p>
      <p :class="$style.atYogaCenter">📧 Email info@zenflowyoga.com</p>
      <p :class="$style.atYogaCenter">🌐 Website w
        <a :class="$style.wwzenflowyogacom" href="http://www.zenflowyoga.com" target="_blank">
          <span :class="$style.wwzenflowyogacom1">ww.zenflowyoga.com</span>
        </a>
      </p>
      <p :class="$style.atYogaCenter">🕒 Opening Hours</p>
      <p :class="$style.atYogaCenter"> Monday – Friday: 7:00 AM – 9:00 PM</p>
      <p :class="$style.atYogaCenter"> Saturday – Sunday: 8:00 AM – 6:00 PM</p>
    </b>
  </div>
</template>
<script setup lang="ts">
import {useRouter} from "vue-router";

const router = useRouter();

function onActivitiesContainerClick() {
  // Add your code here
}

function onAboutUsContainerClick() {
  router.push("/");
}</script>
<style  module>.iconsbasemaps {
  position: absolute;
  top: 114px;
  left: 900px;
  width: 60px;
  height: 60px;
  overflow: hidden;
}
.image20Icon {
  position: absolute;
  top: 102px;
  left: 760px;
  border-radius: 33px;
  width: 1107px;
  height: 559px;
  object-fit: cover;
}
.iconsbasemapsParent {
  position: absolute;
  top: 1192px;
  left: 0px;
  background-color: #d0f0fd;
  width: 1920px;
  height: 717px;
  overflow: hidden;
}
.image19Icon {
  position: absolute;
  top: 305px;
  left: 947px;
  width: 842px;
  height: 807px;
  object-fit: cover;
}
.image5Icon {
  width: 92px;
  position: relative;
  max-height: 100%;
  object-fit: cover;
}
.activities1 {
  position: absolute;
  width: calc(100% - 59px);
  top: calc(50% - 25.5px);
  left: 29px;
  line-height: 150%;
  font-weight: 500;
  display: inline-block;
  height: 52px;
}
.activities {
  width: 220px;
  position: relative;
  height: 75px;
  overflow: hidden;
  flex-shrink: 0;
  cursor: pointer;
}
.activitiesWrapper {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0%;
  right: 0%;
  bottom: 0%;
  left: 0%;
  overflow: hidden;
}
.teachers {
  width: 220px;
  position: relative;
  height: 75px;
}
.contacts {
  width: 230px;
  position: relative;
  height: 75px;
}
.aboutUs1 {
  width: 220px;
  position: relative;
  height: 75px;
  cursor: pointer;
}
.landmarkFlagIcon {
  width: 139px;
  position: relative;
  max-height: 100%;
  object-fit: cover;
}
.barraHome {
  position: absolute;
  top: 0px;
  left: -26px;
  background-color: #d0f0fd;
  width: 1946px;
  height: 93px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 36px;
  font-family: 'Playfair Display';
}
.whatDoWe {
  width: 770px;
  position: relative;
  letter-spacing: -0.02em;
  display: inline-block;
  height: 94px;
  flex-shrink: 0;
  z-index: 0;
}
.atYogaCenter {
  margin: 0;
}
.atSereneFlowContainer {
  width: 805px;
  position: absolute;
  margin: 0 !important;
  top: 190px;
  left: 36px;
  font-size: 32px;
  letter-spacing: -0.02em;
  font-weight: 500;
  display: inline-block;
  height: 593px;
  z-index: 1;
}
.coursesPresentation {
  position: absolute;
  top: 116px;
  left: 23px;
  width: 1801px;
  height: 1071px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-content: flex-start;
  padding: 48px 26px;
  box-sizing: border-box;
  gap: 0px 119px;
}
.contacts1 {
  position: absolute;
  top: 1192px;
  left: 59px;
  letter-spacing: -0.02em;
  display: inline-block;
  width: 770px;
  height: 76px;
}
.wwzenflowyogacom1 {
  text-decoration: underline;
}
.wwzenflowyogacom {
  color: inherit;
}
.addressZenflowYogaContainer {
  position: absolute;
  top: 1309px;
  left: 49px;
  font-size: 32px;
  letter-spacing: -0.02em;
}
.aboutUs {
  width: 100%;
  position: relative;
  background-color: #fff;
  height: 1909px;
  overflow: hidden;
  text-align: left;
  font-size: 64px;
  color: #1f3a5f;
  font-family: Inter;
}

</style>