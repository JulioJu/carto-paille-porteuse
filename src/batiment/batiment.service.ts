import type { TypeTableEnum } from "./model/batiment-dropdown";
import type BatimentSection from "./model/BatimentSections";
import { TableType, type Column, type Section } from "./model/Section";
import Parse from "parse/dist/parse.min.js";

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

export default {
  destructuringBatiment,
  destructuringColumns,
  destructuringTableEnum,
  retrieveBatiment,
};
