import "ol/ol.css";

import { Map, Overlay } from "ol";

import type { Router } from "vue-router";
import type { FeatureLike } from "ol/Feature";

const appendList = (
  list: HTMLUListElement,
  content: string,
  strong = false,
) => {
  if (content === undefined) {
    return;
  }
  const li = document.createElement("li");
  if (!strong) {
    li.innerHTML = content;
  } else {
    const strong = document.createElement("strong");
    strong.innerHTML = content;
    strong.style.fontSize = "1.2em";
    li.appendChild(strong);
  }
  list.appendChild(li);
};

const addSeeMoreLink = (list: HTMLUListElement, id: string, router: Router) => {
  const anchor = document.createElement("a");
  anchor.innerText = "Voir +";
  anchor.classList.add("link-primary");
  anchor.addEventListener("click", (ev: MouseEvent) => {
    ev.preventDefault();
    router.push({
      name: "BatimentDetail",
      params: { batimentId: id },
    });
  });
  const li = document.createElement("li");
  li.appendChild(anchor);
  list.appendChild(li);
};

const createList = (param: {
  router: Router;
  feature: FeatureLike;
}): HTMLUListElement => {
  const list = document.createElement("ul");
  appendList(list, param.feature.get("name"), true);
  appendList(list, param.feature.get("usageBatiment"));
  appendList(list, param.feature.get("surface"));
  addSeeMoreLink(list, param.feature.get("id"), param.router);
  return list;
};

const addPrincipalePhoto = (
  popup: HTMLDivElement,
  photoPrincipaleSrc: string,
) => {
  if (photoPrincipaleSrc === undefined) {
    return;
  }
  const photo = new Image();
  photo.style.maxHeight = "5rem";
  photo.classList.add("mt-2");
  photo.alt = "Image du bâtiment";
  photo.src = photoPrincipaleSrc;
  popup.appendChild(photo);
};

const disposePopup = (overlay: Overlay, popupCloser: HTMLDivElement) => {
  overlay.setPosition(undefined);
  popupCloser.blur();
};

const registerMapEvents = (param: {
  map: Map;
  popupContent: HTMLDivElement;
  overlay: Overlay;
  popupCloser: HTMLDivElement;
  router: Router;
}) => {
  // display popup on click
  param.map.on("click", async (evt) => {
    const feature = param.map.forEachFeatureAtPixel(evt.pixel, (feature) => {
      return feature;
    });
    if (feature) {
      param.popupContent.innerHTML = "";
      param.overlay.setPosition(evt.coordinate);
      param.popupContent.appendChild(
        createList({ router: param.router, feature }),
      );
      addPrincipalePhoto(param.popupContent, feature.get("photoPrincipaleSrc"));
    } else {
      disposePopup(param.overlay, param.popupCloser);
    }
  });

  // change mouse cursor when over marker
  param.map.on("pointermove", function (e) {
    const pixel = param.map.getEventPixel(e.originalEvent);
    const hit = param.map.hasFeatureAtPixel(pixel);
    (param.map.getTarget() as HTMLElement).style.cursor = hit ? "pointer" : "";
  });
  // Close the popup when the map is moved
  param.map.on("movestart", function () {
    disposePopup(param.overlay, param.popupCloser);
  });
};

/**
 * Inspired from
 * https://openlayers.org/en/latest/examples/icon.html
 * https://openlayers.org/en/latest/examples/popup.html
 */
export default ({
  map,
  popup,
  popupCloser,
  popupContent,
  router,
}: {
  map: Map;
  popup: HTMLDivElement;
  popupCloser: HTMLDivElement;
  popupContent: HTMLDivElement;
  router: Router;
}) => {
  const overlay = new Overlay({
    element: popup,
    autoPan: true,
  });
  map.addOverlay(overlay);

  popupCloser.onclick = () => {
    disposePopup(overlay, popupCloser);
    return false;
  };

  registerMapEvents({
    map,
    popupContent,
    overlay,
    popupCloser,
    router,
  });
};
