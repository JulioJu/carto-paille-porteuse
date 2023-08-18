<!-- Inspired from https://openlayers.org/en/latest/examples/popup.html -->
<template>
  <section>
    <div class="loading" v-if="loading">
      <strong>Chargement des points</strong>
      <div class="lds-hourglass"></div>
    </div>
    <template v-if="isAuthenticated">
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
          <!-- <font-awesome-icon icon="plus"></font-awesome-icon> -->
          <span> Basculer en mode ajout d'un bâti </span>
        </template>
        <template v-else>
          <span> Basculer en mode normal </span>
        </template>
      </button>
    </template>
    <template v-else>
      <div>Pour ajouter un bâti, veuillez vous connecter.</div>
    </template>
    <div
      class="map-container"
      :class="isEditMode ? '' : 'map-container--add'"
      ref="mapRoot"
    ></div>
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
import Store from "@/store";

const router = useRouter();

const loading = ref(true);

const isAuthenticated = Store.user.isAuthenticated;

// https://openlayers.org/en/latest/doc/faq.html#why-is-my-map-centered-on-the-gulf-of-guinea-or-africa-the-ocean-null-island-
// https://openlayers.org/en/latest/doc/faq.html#why-is-the-order-of-a-coordinate-lon-lat-and-not-lat-lon-
const franceLonLat = [2.2137, 46.2276];

const isEditMode = ref<boolean>(false);

const mapRoot = ref<HTMLDivElement>();
const popup = ref<HTMLDivElement>();
const popupCloser = ref<HTMLDivElement>();
const popupContent = ref<HTMLDivElement>();
let map: Map;

onMounted(async () => {
  // (2023-18-16) since the beginning of the project in 2012,
  // On Firefox, if we retrieve batiments before draw map, we don't see icons
  // the first time we type url https://cartopailleporteuse.b4a.app/)
  // * This bug does not occur
  //    * on Chromium.
  //    * If we refresh page
  //    * If we change browser window size this bug does
  const batiments = await batimentService.retrieveAllBatimentsWithCatch(
    router,
    [
      "latitudeLongitude",
      "usageBatiment",
      "surfacePlancher",
      "photoPrincipale",
    ],
  );

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
  loading.value = false;
});

const toggleEditionMode = (): void => {
  if (!isEditMode.value) {
    eventRetrieveCoordAndNavigate.register(
      map,
      router,
      mapRoot.value as HTMLDivElement,
    );
  } else {
    eventRetrieveCoordAndNavigate.unregister(
      map,
      mapRoot.value as HTMLDivElement,
    );
  }
  isEditMode.value = !isEditMode.value;
};
</script>

<style scoped="true" lang="scss">
.loading {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1000;
  color: maroon;
  .lds-hourglass {
    /** https://loading.io/css/ */
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
    &:after {
      content: " ";
      display: block;
      border-radius: 50%;
      width: 0;
      height: 0;
      margin: 8px;
      box-sizing: border-box;
      border: 32px solid #fff;
      border-color: #fff transparent #fff transparent;
      animation: lds-hourglass 1.2s infinite;
    }
    @keyframes lds-hourglass {
      0% {
        transform: rotate(0);
        animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
      }
      50% {
        transform: rotate(900deg);
        animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      }
      100% {
        transform: rotate(1800deg);
      }
    }
  }
}

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
