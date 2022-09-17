import type { TypeTableEnum } from "./model/batiment-dropdown";
import type BatimentSection from "./model/BatimentSections";
import type { Column, Section } from "./model/Section";

const destructuringBatiment = (
  aBatiment: BatimentSection
): [key: string, value: Section][] => Object.entries(aBatiment);

const destructuringColumns = (
  columns: Section["columns"]
): [key: string, value: Column][] => Object.entries(columns);

const destructuringTableEnum = (
  aTableEnum: TypeTableEnum["enum"]
): [key: string, value: string][] => Object.entries(aTableEnum);

export default {
  destructuringBatiment,
  destructuringColumns,
  destructuringTableEnum,
};
