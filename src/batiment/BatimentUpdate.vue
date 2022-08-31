<template>
  <h2>Créer ou</h2>
  {{ created }}
  {{ batiment.latitude }}
  {{ batiment.longitude }}
</template>
<script lang="ts">
import { defineComponent, type ComponentPublicInstance } from "vue";

interface IInstance extends ComponentPublicInstance {
  created: string;
  retrieveBatiment(id: string): void;
  setBatiment({ latitude }: { latitude: number; longitude: number }): void;
}

type batimentUpdateVue = {
  created: string;
  batiment: { latitude?: number; longitude?: number };
};

export default defineComponent({
  data: (): batimentUpdateVue => {
    return {
      created: "",
      batiment: {},
    };
  },
  methods: {
    retrieveBatiment(id: string) {
      console.debug(id);
    },
    setBatiment({
      latitude,
      longitude,
    }: {
      latitude: number;
      longitude: number;
    }) {
      this.batiment.latitude = latitude;
      this.batiment.longitude = longitude;
      console.debug("vue-route::from::", this.batiment);
      console.debug("vue-route::from::", this.batiment.latitude);
    },
  },
  beforeRouteEnter(to, _, next) {
    next((vm) => {
      const instance = vm as IInstance;
      instance.created = "titi";
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
        instance.setBatiment({
          latitude: Number(to.query.long.toString()),
          longitude: Number(to.query.lat.toString()),
        });
      }
    });
  },
});
</script>
