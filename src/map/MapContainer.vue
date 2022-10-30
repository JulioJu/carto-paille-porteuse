<!-- Inspired from https://openlayers.org/en/latest/examples/popup.html -->
<template>
  <section>
    <template v-if="isEditMode">
      <div class="text-info">
        Double cliquer sur la carte pour ajouter un bâti
      </div>
      <div class="text-danger mb-3">
        Nous recommendons de positionner le bâti à une certaine distance de sa
        position exacte.
      </div>
    </template>
    <button
      @click.prevent="toggleEditionMode"
      class="btn btn-primary jh-create-entity mb-3"
    >
      <template v-if="!isEditMode">
        <font-awesome-icon icon="plus"></font-awesome-icon>
        <span> Basculer en mode ajout d'un bâti </span>
      </template>
      <template v-else>
        <span> Basculer en mode normal </span>
      </template>
    </button>
    <div class="map-container" ref="mapRoot"></div>
    <div ref="popup" class="ol-popup">
      <a ref="popupCloser" class="ol-popup-closer"></a>
      <div ref="popupContent"></div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import "ol/ol.css";

import TileLayer from "ol/layer/Tile";
import Map from "ol/Map";
import { fromLonLat } from "ol/proj";
import OSM from "ol/source/OSM";
import View from "ol/View";

import drawIcon from "./draw-icon";
import drawPopup from "./draw-popup";
import eventRetrieveCoordAndNavigate from "./event-retrieve-coord-and-navigate";
import { onMounted, ref } from "vue";
import batimentService from "@/batiment/batiment.service";
import { useRouter } from "vue-router";

const router = useRouter();

// https://openlayers.org/en/latest/doc/faq.html#why-is-my-map-centered-on-the-gulf-of-guinea-or-africa-the-ocean-null-island-
// https://openlayers.org/en/latest/doc/faq.html#why-is-the-order-of-a-coordinate-lon-lat-and-not-lat-lon-
const franceLonLat = [2.2137, 46.2276];

let isEditMode = false;

const mapRoot = ref<HTMLDivElement>();
const popup = ref<HTMLDivElement>();
const popupCloser = ref<HTMLDivElement>();
const popupContent = ref<HTMLDivElement>();
let map: Map;

onMounted(async () => {
  map = new Map({
    target: mapRoot.value,
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
    ],
    view: new View({
      zoom: 1,
      center: fromLonLat(franceLonLat),
      extent: [
        -1944469.271982851, 4954231.814876032, 2437325.1855209903,
        6679563.3825181695,
      ],
    }),
  });

  const batiments = await batimentService.retrieveAllBatiments(router);
  batiments.forEach((aBatiment) => {
    const icon = drawIcon(aBatiment);
    map.addLayer(icon);
  });
  drawPopup({
    map: map,
    popup: popup.value as HTMLDivElement,
    popupCloser: popupCloser.value as HTMLDivElement,
    popupContent: popupContent.value as HTMLDivElement,
    router,
  });
});

const toggleEditionMode = (): void => {
  if (!isEditMode) {
    eventRetrieveCoordAndNavigate.register(
      map,
      router,
      mapRoot.value as HTMLDivElement
    );
  } else {
    eventRetrieveCoordAndNavigate.unregister(
      map,
      mapRoot.value as HTMLDivElement
    );
  }
  isEditMode = !isEditMode;
};
</script>

<style scoped="true" lang="scss">
.map-container {
  width: 100%;
  height: 80vh;
}

.map-container--add {
  cursor: pointer;
}

/** Inspired from https://openlayers.org/en/latest/examples/popup.html */
.ol-popup {
  position: absolute;
  background-color: white;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #cccccc;
  bottom: 12px;
  left: -50px;
  min-width: 280px;
}
.ol-popup:after,
.ol-popup:before {
  top: 100%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}
.ol-popup:after {
  border-top-color: white;
  border-width: 10px;
  left: 48px;
  margin-left: -10px;
}
.ol-popup:before {
  border-top-color: #cccccc;
  border-width: 11px;
  left: 48px;
  margin-left: -11px;
}
.ol-popup-closer {
  text-decoration: none;
  position: absolute;
  top: 2px;
  right: 8px;
}
.ol-popup-closer:after {
  content: "✖";
}
</style>
