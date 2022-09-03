<template>
  Create or update form {{ latLong.latitutde }}
  <form class="login-user" @submit.prevent="onSubmit">
    <input
      type="string"
      v-model="batiment.allSections.definition.columns.latitude.value.value"
    />
    <button>Form</button>
  </form>
</template>
<script lang="ts">
import { defineComponent, reactive, type ComponentPublicInstance } from "vue";
import BatimentSection from "./model/BatimentSections";

interface IInstance extends ComponentPublicInstance {
  retrieveBatiment(id: string): void;
  setLatLong({
    latitude,
    longitude,
  }: {
    latitude: string;
    longitude: string;
  }): void;
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
        instance.setLatLong({
          latitude: to.query.lat.toString(),
          longitude: to.query.long.toString(),
        });
      }
    });
  },
});
</script>
<script setup lang="ts">
const latLong = reactive({ latitutde: "loading", longitude: "loading" });

const batiment = new BatimentSection();

const setLatLong = ({
  latitude,
  longitude,
}: {
  latitude: string;
  longitude: string;
}) => {
  latLong.latitutde = latitude;
  latLong.longitude = longitude;
  console.debug("vue-route::from::", latLong.latitutde);
};

const retrieveBatiment = (id: string) => {
  console.debug(id);
};

const onSubmit = () => {
  console.debug(batiment.allSections.definition.columns.latitude.value.value);
};

defineExpose({ setLatLong, retrieveBatiment });
</script>
