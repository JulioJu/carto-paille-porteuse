<template>
  <form class="login-user" @submit.prevent="onSubmit">
    <div
      v-for="valueSection in Object.values(batiment)"
      :key="valueSection.commentaire"
    >
      <h3>
        {{ valueSection.commentaire }}
      </h3>
      <label
        v-for="[keyColumn, valueColumn] in destructuringColumn(
          valueSection.columns
        )"
        :key="keyColumn"
      >
        {{ valueColumn.commentaire }}
        <template v-if="typeof valueColumn.type === 'number'">
          <input
            v-if="valueColumn.type === TableType.STRING"
            v-model="valueColumn.value.value"
            type="text"
            :required="valueColumn.validation?.required"
            :maxlength="valueColumn.validation?.maxlength"
          />
          <textarea
            v-else-if="valueColumn.type === TableType.TEXTAREA"
            v-model="valueColumn.value.value"
            :required="valueColumn.validation?.required"
          />
          <input
            v-else-if="valueColumn.type === TableType.BOOLEAN"
            v-model="valueColumn.value.value"
            type="checkbox"
            :required="valueColumn.validation?.required"
          />
          <input
            v-else-if="valueColumn.type === TableType.NUMBER"
            v-model="valueColumn.value.value"
            type="number"
            step="any"
            :required="valueColumn.validation?.required"
            :min="valueColumn.validation?.min"
            :max="valueColumn.validation?.max"
          />
          <input
            v-else-if="valueColumn.type === TableType.NATURAL_NUMBER"
            v-model="valueColumn.value.value"
            type="number"
            :required="valueColumn.validation?.required"
            :min="valueColumn.validation?.min"
            :max="valueColumn.validation?.max"
          />
          <input
            v-else-if="valueColumn.type === TableType.DATE"
            v-model="valueColumn.value.value"
            type="date"
            :required="valueColumn.validation?.required"
            :min="valueColumn.validation?.min"
            :max="valueColumn.validation?.max"
          />
          <input
            v-else-if="valueColumn.type === TableType.IMAGE"
            type="file"
            v-on:change="setFileData($event)"
            accept="image/*"
            :required="valueColumn.validation?.required"
          />
        </template>
        <template v-else>
          <select
            v-model="valueColumn.value.value"
            :required="valueColumn.validation?.required"
          >
            <option
              :value="valueColumn.type.name"
              :label="valueColumn.type.name"
            ></option>
            <option
              :value="valueColumn.type.commentaire"
              :label="valueColumn.type.commentaire"
            ></option>
            <option
              v-for="[keyEnum, labelEnum] in destructuringTableEnum(
                valueColumn.type.enum
              )"
              :key="keyEnum"
              :value="keyEnum"
              :label="labelEnum"
            ></option>
          </select>
        </template>
        <br />
      </label>
    </div>
    <button>Soumettre</button>
  </form>
</template>
<script lang="ts">
import { defineComponent, type ComponentPublicInstance } from "vue";
import type { TypeTableEnum } from "./model/batiment-dropdown";
import BatimentSection from "./model/BatimentSections";
import { TableType, type Column } from "./model/Section";

interface IInstance extends ComponentPublicInstance {
  retrieveBatiment(id: string): void;
  setLatLong({
    latitude,
    longitude,
  }: {
    latitude: string;
    longitude: string;
  }): void;
}

export default defineComponent({
  beforeRouteEnter(to, _, next) {
    next((vm) => {
      const instance = vm as IInstance;
      if (to.params.batimentId) {
        // For instance http://127.0.0.1:5173/batiment/2961/edit
        instance.retrieveBatiment(to.params.batimentId as string);
      }

      if (
        to.query.lat &&
        to.query.long &&
        !isNaN(Number(to.query.lat)) &&
        !isNaN(Number(to.query.long)) &&
        Number(to.query.lat) >= -90 &&
        Number(to.query.lat) <= 90 &&
        Number(to.query.long) >= -90 &&
        Number(to.query.long) <= 90
      ) {
        console.debug(to.query.lat, to.query.long, "yoyo");
        instance.setLatLong({
          latitude: to.query.lat.toString(),
          longitude: to.query.long.toString(),
        });
      }
    });
  },
});
</script>
<script setup lang="ts">
const batiment = new BatimentSection();

const setLatLong = ({
  latitude,
  longitude,
}: {
  latitude: string;
  longitude: string;
}) => {
  batiment.allSections.definition.columns.latitude.value.value = latitude;
  batiment.allSections.definition.columns.longitude.value.value = longitude;
};

const retrieveBatiment = (id: string) => {
  console.debug(id);
};

/**
 * Otherwise into template we have error `valueColumn is of type unknown`
 */
const destructuringColumn = (aColumn: Column) => Object.entries(aColumn);

/**
 * Otherwise into template we have error `valueColumn is of type unknown`
 */
const destructuringTableEnum = (aTableEnum: TypeTableEnum["enum"]) =>
  Object.entries(aTableEnum);

const onSubmit = () => {
  console.debug(batiment.allSections.definition.columns.latitude.value.value);
};

const setFileData = (event: any) => {
  console.debug("setFileData");
  if (event && event.target.files && event.target.files[0]) {
    const file = event.target.files[0];
    if (!/^image\//.test(file.type)) {
      return;
    }
  }
};
defineExpose({ setLatLong, retrieveBatiment });
</script>
