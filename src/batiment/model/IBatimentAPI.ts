import type Parse from "parse/dist/parse.min.js";

export interface IBatimentAPI {
  id: string;
  latitudeLongitude: Parse.GeoPoint;
  nomBatiment: string | undefined;
  usageBatiment: { id: string; className: "UsageBatiment" } | undefined;
  surfacePlancher: number | undefined;
  photoPrincipale: Parse.File | undefined;
}
