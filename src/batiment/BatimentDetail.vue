<template>
  <div
    v-for="[keySection, valueSection] in batimentService.destructuringBatiment(
      batiment
    )"
    :key="keySection"
    :class="keySection.substring(1)"
  >
    <h3>{{ valueSection.commentaire }}</h3>
    <dl>
      <div
        v-for="[keyColumn, valueColumn] in batimentService.destructuringColumns(
          valueSection.columns
        )"
        :key="keyColumn"
        :class="
          keySection.substring(1) +
          '__' +
          keyColumn +
          ' ' +
          (valueColumn.cssClass ? valueColumn.cssClass : '')
        "
      >
        <template v-if="typeof valueColumn.type === 'number'">
          <dt>{{ valueColumn.commentaire }}</dt>
          <dd>
            <template v-if="valueColumn.type === TableType.IMAGE">
              <img
                v-if="valueColumn.value.value"
                :src="valueColumn.value.value._url"
              />
              <template v-else> Aucune </template>
            </template>
            <template v-else-if="valueColumn.type === TableType.BOOLEAN">
              <template v-if="valueColumn.value.value"> Vrai </template>
              <template v-else> Faux </template>
            </template>
            <template v-else>
              <template v-if="valueColumn.value.value">
                {{ valueColumn.value.value }}
              </template>
              <template v-else> Néant </template>
            </template>
          </dd>
        </template>
        <template v-else>
          <dt>{{ valueColumn.commentaire }}</dt>
          <dd>
            <template v-if="valueColumn.value.value">
              {{ valueColumn.type.enum[valueColumn.value.value.id] }}
            </template>
            <template v-else> Néant </template>
          </dd>
        </template>
      </div>
    </dl>
  </div>
</template>
<script lang="ts">
import { defineComponent, type ComponentPublicInstance } from "vue";
import BatimentSection from "./model/BatimentSections";
import { Section, TableType } from "./model/Section";

interface IInstance extends ComponentPublicInstance {
  retrieveBatiment(id: string): Promise<void>;
}

export default defineComponent({
  beforeRouteEnter(to, _, next) {
    next((vm) => {
      const instance = vm as IInstance;
      if (to.params.batimentId) {
        // For instance http://127.0.0.1:5173/batiment/2961/edit
        instance.retrieveBatiment(to.params.batimentId as string);
      }
    });
  },
});
</script>
<script setup lang="ts">
import Parse from "parse/dist/parse.min.js";
import batimentService from "./batiment.service";

const batiment = new BatimentSection();

const retrieveBatiment = async (id: string) => {
  const query = new Parse.Query(Parse.Object.extend("batiment"));
  query.equalTo("objectId", id);
  try {
    const aBatiment = await query.first();
    if (aBatiment) {
      Object.values(batiment).forEach((section: Section) => {
        Object.entries(section.columns).forEach(([keyColumn, valueColumn]) => {
          valueColumn.value.value = aBatiment.get(keyColumn);
        });
      });
    } else {
      alert("Nothing found, please try again");
    }
  } catch (error) {
    console.error(error);
  }
};

defineExpose({ retrieveBatiment });
</script>
