import Store from "@/store";
import Parse from "parse/dist/parse.min.js";
import type { Router } from "vue-router";
import type { TypeTableEnum } from "./model/batiment-dropdown";
import type BatimentSection from "./model/BatimentSections";
import type { IBatimentAPI } from "./model/IBatimentAPI";
import { TableType, type Column, type Section } from "./model/Section";

const destructuringBatiment = (
  aBatiment: BatimentSection
): [key: string, value: Section][] => Object.entries(aBatiment);

const destructuringColumns = (
  columns: Section["columns"]
): [key: string, value: Column][] => Object.entries(columns);

const destructuringTableEnum = (
  aTableEnum: TypeTableEnum["enum"]
): [key: string, value: string][] => Object.entries(aTableEnum);

const retrieveBatiment = async (
  id: string,
  batiment: BatimentSection
): Promise<void> => {
  const query = new Parse.Query(Parse.Object.extend("batiment"));
  query.equalTo("objectId", id);
  try {
    const aBatiment = await query.first();
    if (aBatiment) {
      Object.values(batiment).forEach((section: Section) => {
        Object.entries(section.columns).forEach(([keyColumn, valueColumn]) => {
          const value = aBatiment.get(keyColumn);
          if (typeof valueColumn.type === "number") {
            if (valueColumn.type === TableType.IMAGE) {
              valueColumn.value.value = value?._url;
            } else {
              valueColumn.value.value = value;
            }
          } else {
            valueColumn.value.value = value?.id;
          }
        });
      });
    } else {
      alert("Nothing found, please try again");
    }
  } catch (error) {
    console.error(error);
  }
};

const retrieveAllBatiments = async (
  router: Router
): Promise<IBatimentAPI[]> => {
  const query = new Parse.Query(Parse.Object.extend("batiment"));
  query.select("latitudeLongitude", "usageBatiment", "surfacePlancher");
  let batiments: IBatimentAPI[] = [];
  try {
    const results = await query.find();
    batiments = results.map((aResult): IBatimentAPI => {
      const aBatiment: IBatimentAPI = {
        id: aResult.id,
        latitudeLongitude: aResult.get("latitudeLongitude"),
        usageBatiment: aResult.get("usageBatiment"),
        nomBatiment: aResult.get("nomBatiment"),
        surfacePlancher: aResult.get("surfacePlancher"),
      };
      return aBatiment;
    });
  } catch (error: any) {
    // https://github.com/parse-community/parse-server/blob/63d51fa6c87d3d8b9599e892cf04612dbe3ee7a8/spec/ParseUser.spec.js#L2587 -->
    if (error.code === 209) {
      Parse.User.logOut();
      Store.user.isAuthenticated.value = false;
      router.push("/login-user");
    } else {
      alert("Error while fetching batiment (see console)");
      console.error(error);
      return [];
    }
  }
  return batiments;
};

export default {
  destructuringBatiment,
  destructuringColumns,
  destructuringTableEnum,
  retrieveBatiment,
  retrieveAllBatiments,
};
