<template>
  <div :class="$style.courseGrid">
    <Packet
        v-for="(packet, index) in props.packets"
        :key="index"
        :id="packet.id"
        :price="packet.Price"
        :description="packet.Description"
        :color="packet.Color"
    />
  </div>
</template>

<script setup lang="ts">
import Packet from "~/components/Single_Elements/packet.vue";

interface Packets {
  id: string;
  Price: string;
  Description: string;
  Color: string;
}

const props = defineProps<{
  packets: Packets[];
}>();
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