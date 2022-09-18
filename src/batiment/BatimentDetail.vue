<template>
  <br />
  <RouterLink :to="'/batiment/' + batimentId + '/edit'">Éditer</RouterLink>
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
import { defineComponent, ref, type ComponentPublicInstance } from "vue";
import BatimentSection from "./model/BatimentSections";
import { TableType } from "./model/Section";
import batimentService from "./batiment.service";

interface IInstance extends ComponentPublicInstance {
  batimentId: string;
  batiment: BatimentSection;
}

export default defineComponent({
  beforeRouteEnter(to, _, next) {
    next((vm) => {
      const instance = vm as IInstance;
      if (to.params.batimentId) {
        instance.batimentId = to.params.batimentId as string;
        // For instance http://127.0.0.1:5173/batiment/2961/edit
        batimentService.retrieveBatiment(
          to.params.batimentId as string,
          instance.batiment
        );
      }
    });
  },
});
</script>
<script setup lang="ts">
const batiment = new BatimentSection();
const batimentId = ref<string>("");

defineExpose({ batiment, batimentId });
</script>
