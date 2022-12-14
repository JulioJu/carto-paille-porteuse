import type { Map, MapBrowserEvent } from "ol";
import { toLonLat } from "ol/proj";
import type { Router } from "vue-router";

let refToRegisterFunc: any;

const registerFunc = (map: Map, router: Router, evt: MapBrowserEvent<any>) => {
  const feature = map.forEachFeatureAtPixel(evt.pixel, (feature) => {
    return feature;
  });
  if (!feature) {
    const coordinate = evt.coordinate;
    const coordLongLat = toLonLat(coordinate);
    router.push({
      path: "/batiment/new",
      query: {
        lat: coordLongLat[1].toString(),
        long: coordLongLat[0].toString(),
      },
    });
  }
};

const unregister = (map: Map, div: HTMLDivElement) => {
  map.un("dblclick", refToRegisterFunc);
  div.classList.remove("map-container--add");
};

const register = (map: Map, router: Router, div: HTMLDivElement) => {
  refToRegisterFunc = registerFunc.bind(this, map, router);
  map.once("dblclick", refToRegisterFunc);
  div.classList.add("map-container--add");
};

export default {
  register,
  unregister,
};
