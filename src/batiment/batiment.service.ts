import Store from "@/store";
import Parse from "parse/dist/parse.min.js";
import type { Router } from "vue-router";
import type { TypeTableEnum } from "./model/batiment-dropdown";
import type BatimentSection from "./model/BatimentSections";
import type { IBatimentAPI } from "./model/IBatimentAPI";
import type { Column, ColumnsGroup, Section } from "./model/Section";

const destructuringBatiment = (
  aBatiment: BatimentSection,
): [key: string, value: Section][] => Object.entries(aBatiment);

const destructuringColumnsGroups = (
  columnsGroups: Section["columnsGroups"],
): [key: string, column: ColumnsGroup][] => Object.entries(columnsGroups);

const destructuringColumns = (
  columnsGroup: ColumnsGroup,
): [key: string, column: Column][] => Object.entries(columnsGroup.columns);

const destructuringTableEnum = (
  aTableEnum: TypeTableEnum["enum"],
): [key: string, value: string][] => Object.entries(aTableEnum);

const retrieveABatiment = async (
  id: string,
  batiment: BatimentSection,
): Promise<void> => {
  const query = new Parse.Query(Parse.Object.extend("batiment"));
  query.equalTo("objectId", id);
  const batimentRetrieved = await query.first();
  if (batimentRetrieved) {
    destructuringBatiment(batiment).forEach(([_, aSection]) => {
      destructuringColumnsGroups(aSection.columnsGroups).forEach(
        ([_, columnsGroups]) => {
          destructuringColumns(columnsGroups).forEach(
            ([keyColumn, valueColumn]) => {
              const value = batimentRetrieved.get(keyColumn);
              if (value === undefined || value === null) {
                return;
              }
              if (typeof valueColumn.type === "number") {
                valueColumn.vueRef.value = value;
              } else {
                valueColumn.vueRef.value = value?.id;
              }
            },
          );
        },
      );
    });
    batiment.allSections.definition.columnsGroups.objectIdGroup.columns.objectId.vueRef.value =
      batimentRetrieved.id;
  } else {
    alert("Nothing found, please try again");
  }
};

const retrieveAllBatiments = async (
  querySelect: string[],
): Promise<IBatimentAPI[]> => {
  const query = new Parse.Query(Parse.Object.extend("batiment"));
  query.limit(10000);
  query.select(...querySelect);
  const results = await query.find();
  return results.map((aResult): IBatimentAPI => {
    return {
      id: aResult.id,
      latitudeLongitude: aResult.get("latitudeLongitude"),
      usageBatiment: aResult.get("usageBatiment"),
      nomBatiment: aResult.get("nomBatiment"),
      surfacePlancher: aResult.get("surfacePlancher"),
      photoPrincipale: aResult.get("photoPrincipale"),
    };
  });
};

const retrieveAllBatimentsWithCatch = async (
  router: Router,
  querySelect: string[],
): Promise<IBatimentAPI[]> => {
  try {
    return await retrieveAllBatiments(querySelect);
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
  destructuringColumnsGroup: destructuringColumnsGroups,
  destructuringColumns,
  destructuringTableEnum,
  retrieveABatiment,
  retrieveAllBatimentsWithCatch,
};
