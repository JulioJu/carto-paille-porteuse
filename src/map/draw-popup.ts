import "ol/ol.css";
import { Map, Overlay } from "ol";
import type { Router } from "vue-router";

const appendList = (
  list: HTMLUListElement,
  content: string,
  strong = false
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

const disposePopup = (overlay: Overlay, popupCloser: HTMLDivElement) => {
  overlay.setPosition(undefined);
  popupCloser.blur();
};

const registerMapEvents = ({
  map,
  popupContent,
  overlay,
  popupCloser,
  router,
}: {
  map: Map;
  popupContent: HTMLDivElement;
  overlay: Overlay;
  popupCloser: HTMLDivElement;
  router: Router;
}) => {
  // display popup on click
  map.on("click", async (evt) => {
    const feature = map.forEachFeatureAtPixel(evt.pixel, (feature) => {
      return feature;
    });
    if (feature) {
      popupContent.innerHTML = "";
      overlay.setPosition(evt.coordinate);
      const list = document.createElement("ul");
      const name = feature.get("name");
      if (name) {
        appendList(list, `${name}`, true);
      }
      appendList(list, feature.get("usageBatiment"));
      appendList(list, feature.get("surface"));
      const li = document.createElement("li");
      const anchor = document.createElement("a");
      anchor.innerText = "Voir +";
      anchor.classList.add("link-primary");
      anchor.addEventListener("click", (ev: MouseEvent) => {
        ev.preventDefault();
        router.push({
          name: "BatimentDetail",
          params: { batimentId: feature.get("id") },
        });
      });
      li.appendChild(anchor);
      list.appendChild(li);
      popupContent.appendChild(list);
      // TODO not optimized, we retrieve all Batiment to get only a photo
      const aBatiment = {
        photoPrincipale: null,
        photoPrincipaleContentType: null,
      };
      if (aBatiment.photoPrincipale) {
        const photo = new Image();
        photo.style.maxHeight = "5rem";
        photo.classList.add("mt-2");
        photo.alt = "Image du bâtiment";
        photo.src = `data:${aBatiment.photoPrincipaleContentType};base64,${aBatiment.photoPrincipale}`;
        list.appendChild(photo);
      }
    } else {
      disposePopup(overlay, popupCloser);
    }
  });

  // change mouse cursor when over marker
  map.on("pointermove", function (e) {
    const pixel = map.getEventPixel(e.originalEvent);
    const hit = map.hasFeatureAtPixel(pixel);
    (map.getTarget() as HTMLElement).style.cursor = hit ? "pointer" : "";
  });
  // Close the popup when the map is moved
  map.on("movestart", function () {
    disposePopup(overlay, popupCloser);
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
