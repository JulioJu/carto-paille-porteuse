import "ol/ol.css";

import { Feature } from "ol";
import Point from "ol/geom/Point";
import VectorLayer from "ol/layer/Vector";
import { transform } from "ol/proj";
import VectorSource from "ol/source/Vector";
import { Icon, Style } from "ol/style";
import type { IBatimentAPI } from "../batiment/model/IBatimentAPI";
import { TableEnum } from "@/batiment/model/batiment-dropdown";
import GreenCastleFromOpenLayers from "@/assets/images/green_castle_from_openlayers.png";

/** Inspired from https://openlayers.org/en/latest/examples/icon.html */
export default (aBatiment: IBatimentAPI) => {
  const icon = new Image(32, 48);
  /** Download from https://openlayers.org/en/latest/examples/data/icon.png (licence CC-BY 3.0) */
  icon.src = GreenCastleFromOpenLayers;
  const iconFeature = new Feature({
    geometry: new Point(
      transform(
        [
          aBatiment.latitudeLongitude.longitude,
          aBatiment.latitudeLongitude.latitude,
        ],
        "EPSG:4326",
        "EPSG:3857",
      ),
    ),
    id: aBatiment.id,
    name: aBatiment.nomBatiment,
    usageBatiment: aBatiment.usageBatiment
      ? TableEnum.UsageBatiment.enum[aBatiment.usageBatiment.id]
      : undefined,
    surface: aBatiment.surfacePlancher
      ? `${aBatiment.surfacePlancher} m²`
      : undefined,
    photoPrincipaleSrc: aBatiment.photoPrincipale
      ? aBatiment.photoPrincipale._url
      : undefined,
  });

  const iconStyle = new Style({
    image: new Icon({
      anchor: [0.5, 46],
      anchorXUnits: "fraction",
      anchorYUnits: "pixels",
      img: icon,
      imgSize: [icon.width, icon.height],
      scale: 0.4,
    }),
  });

  iconFeature.setStyle(iconStyle);

  const vectorSource = new VectorSource({
    features: [iconFeature],
  });

  return new VectorLayer({
    source: vectorSource,
  });
};
