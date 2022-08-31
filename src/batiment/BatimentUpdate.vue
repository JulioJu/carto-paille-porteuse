<template>Create or update form {{ batiment.latitutde }}</template>
<script lang="ts">
import { defineComponent, reactive, type ComponentPublicInstance } from "vue";

interface IInstance extends ComponentPublicInstance {
  retrieveBatiment(id: string): void;
  setBatiment({ latitude }: { latitude: string }): void;
}

export default defineComponent({
  beforeRouteEnter(to, _, next) {
    next((vm) => {
      const instance = vm as IInstance;
      if (to.params.batimentId) {
        // For instance http://127.0.0.1:5173/batiment/2961/edit
        instance.retrieveBatiment(to.params.batimentId as string);
      }

      if (
        to.query.lat &&
        to.query.long &&
        !isNaN(Number(to.query.lat)) &&
        !isNaN(Number(to.query.long)) &&
        Number(to.query.lat) >= -90 &&
        Number(to.query.lat) <= 90 &&
        Number(to.query.long) >= -90 &&
        Number(to.query.long) <= 90
      ) {
        console.debug(to.query.lat, to.query.long, "yoyo");
        instance.setBatiment({ latitude: to.query.lat.toString() });
      }
    });
  },
});
</script>
<script setup lang="ts">
const batiment = reactive({ latitutde: "loading", longitude: "loading" });
const setBatiment = ({
  latitude,
  longitude,
}: {
  latitude: string;
  longitude: string;
}) => {
  batiment.latitutde = latitude;
  batiment.longitude = longitude;
  console.debug("vue-route::from::", batiment.latitutde);
};

const retrieveBatiment = (id: string) => {
  console.debug(id);
};

defineExpose({ setBatiment, retrieveBatiment });
</script>
