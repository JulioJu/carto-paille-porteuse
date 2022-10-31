import Store from "@/store";
import Parse from "parse/dist/parse.min.js";
import type { Router } from "vue-router";
import type { TypeTableEnum } from "./model/batiment-dropdown";
import type BatimentSection from "./model/BatimentSections";
import type { IBatimentAPI } from "./model/IBatimentAPI";
import type { Column, Section } from "./model/Section";

const destructuringBatiment = (
  aBatiment: BatimentSection
): [key: string, value: Section][] => Object.entries(aBatiment);

const destructuringColumnsGroup = (
  columns: Section["columnsGroup"]
): [keyColumnsGroup: string, columnsGroup: { [key: string]: Column }][] =>
  Object.entries(columns);

const destructuringColumns = (columns: {
  [key: string]: Column;
}): [key: string, value: Column][] => Object.entries(columns);

const destructuringTableEnum = (
  aTableEnum: TypeTableEnum["enum"]
): [key: string, value: string][] => Object.entries(aTableEnum);

const retrieveABatiment = async (
  id: string,
  batiment: BatimentSection
): Promise<void> => {
  const query = new Parse.Query(Parse.Object.extend("batiment"));
  query.equalTo("objectId", id);
  const batimentRetrieved = await query.first();
  if (batimentRetrieved) {
    Object.values(batiment).forEach((aSection: Section) => {
      Object.values(aSection.columnsGroup).forEach((columnsGroup) => {
        Object.entries(columnsGroup).forEach(([keyColumn, valueColumn]) => {
          const value = batimentRetrieved.get(keyColumn);
          if (value === undefined || value === null) {
            return;
          }
          if (typeof valueColumn.type === "number") {
            valueColumn.value.value = value;
          } else {
            valueColumn.value.value = value?.id;
          }
        });
      });
    });
    batiment.allSections.definition.columnsGroup.objectId.objectId.value.value =
      batimentRetrieved.id;
  } else {
    alert("Nothing found, please try again");
  }
};

const retrieveAllBatiments = async (): Promise<IBatimentAPI[]> => {
  const query = new Parse.Query(Parse.Object.extend("batiment"));
  query.select("latitudeLongitude", "usageBatiment", "surfacePlancher");
  const results = await query.find();
  return results.map((aResult): IBatimentAPI => {
    const aBatiment: IBatimentAPI = {
      id: aResult.id,
      latitudeLongitude: aResult.get("latitudeLongitude"),
      usageBatiment: aResult.get("usageBatiment"),
      nomBatiment: aResult.get("nomBatiment"),
      surfacePlancher: aResult.get("surfacePlancher"),
    };
    return aBatiment;
  });
};

const retrieveAllBatimentsWithCatch = async (
  router: Router
): Promise<IBatimentAPI[]> => {
  try {
    return await retrieveAllBatiments();
  } catch (error: any) {
    // https://github.com/parse-community/parse-server/blob/63d51fa6c87d3d8b9599e892cf04612dbe3ee7a8/spec/ParseUser.spec.js#L2587
    // -->
    if (error.code === 209) {
      Parse.User.logOut();
      Store.user.isAuthenticated.value = false;
      router.push("/login-user");
    } else {
      alert("Error while fetching batiment (see console)");
      console.error(error);
    }
  }
  return [];
};

export default {
  destructuringBatiment,
  destructuringColumnsGroup,
  destructuringColumns,
  destructuringTableEnum,
  retrieveABatiment,
  retrieveAllBatimentsWithCatch,
};
