import type Parse from "parse/dist/parse.min.js";

export interface IBatimentAPI {
  id: string;
  latitudeLongitude: Parse.GeoPoint;
  nomBatiment: string | undefined;
  usageBatiment: string | undefined;
  surfacePlancher: number | undefined;
}
