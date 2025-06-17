<template>
  <div :class="$style.courseGrid">
    <Packet
        v-for="packet in packetStore.packets"
        :id="packet.id"
        :price="packet.price"
        :duration="packet.duration"
        :color="packet.color"
    />
  </div>
</template>

<script setup lang="ts">
import Packet from "~/components/Single_Elements/packet.vue";
import { usePacketStore } from '~/stores/homeRelatedStores/packetStores'
import {useLanguage} from "~/composables/useLanguage";
import {useSupabaseClient} from "#imports";

const packetStore = usePacketStore()
</script>

<style module>
.courseGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr));
  gap: var(--gap);
  padding: var(--padding);
  place-items: center;
}

@media (max-width: 768px) {
  .courseGrid {
    grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
  }
}

@media (min-width: 2560px) {
  .courseGrid {
    grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
  }
}
</style>