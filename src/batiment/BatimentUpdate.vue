<template>
  <form class="login-user" @submit.prevent="onSubmit">
    <div
      v-for="[
        keySection,
        valueSection,
      ] in batimentService.destructuringBatiment(batiment)"
      :key="keySection"
      :class="keySection.substring(1)"
    >
      <h3>
        {{ valueSection.commentaire }}
      </h3>
      <label
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
        {{ valueColumn.commentaire }}
        <template v-if="typeof valueColumn.type === 'number'">
          <input
            :id="'input__' + keyColumn"
            v-if="valueColumn.type === TableType.STRING"
            v-model="valueColumn.value.value"
            type="text"
            :required="valueColumn.validation?.required"
            :maxlength="valueColumn.validation?.maxlength"
          />
          <textarea
            :id="'input__' + keyColumn"
            v-else-if="valueColumn.type === TableType.TEXTAREA"
            v-model="valueColumn.value.value"
            :required="valueColumn.validation?.required"
          />
          <input
            :id="'input__' + keyColumn"
            v-else-if="valueColumn.type === TableType.BOOLEAN"
            v-model="valueColumn.value.value"
            type="checkbox"
            :required="valueColumn.validation?.required"
          />
          <input
            :id="'input__' + keyColumn"
            v-else-if="valueColumn.type === TableType.NUMBER"
            v-model="valueColumn.value.value"
            type="number"
            step="any"
            :required="valueColumn.validation?.required"
            :min="valueColumn.validation?.min"
            :max="valueColumn.validation?.max"
          />
          <input
            :id="'input__' + keyColumn"
            v-else-if="valueColumn.type === TableType.NATURAL_NUMBER"
            v-model="valueColumn.value.value"
            type="number"
            :required="valueColumn.validation?.required"
            :min="valueColumn.validation?.min"
            :max="valueColumn.validation?.max"
          />
          <input
            :id="'input__' + keyColumn"
            v-else-if="valueColumn.type === TableType.DATE"
            v-model="valueColumn.value.value"
            type="date"
            :required="valueColumn.validation?.required"
            :min="valueColumn.validation?.min"
            :max="valueColumn.validation?.max"
          />
          <template v-else-if="valueColumn.type === TableType.IMAGE">
            <div v-if="valueColumn.value.value">
              <img
                style="max-height: 100%"
                :src="valueColumn.value.value"
                :alt="'Previsualization ' + keyColumn"
              />
              <button
                type="button"
                v-on:click="
                  clearInputImage(valueColumn.value, 'fileInput' + keyColumn)
                "
              >
                X
              </button>
            </div>
            <input
              :id="'input__' + keyColumn"
              type="file"
              v-on:change="imageService.setFileData($event, valueColumn.value)"
              accept="image/*"
              :required="valueColumn.validation?.required"
              :ref="'fileInput' + keyColumn"
            />
          </template>
        </template>
        <template v-else>
          <select
            :id="'input__' + keyColumn"
            v-model="valueColumn.value.value"
            :required="valueColumn.validation?.required"
          >
            <option
              v-for="[
                keyEnum,
                labelEnum,
              ] in batimentService.destructuringTableEnum(
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
import { defineComponent, type ComponentPublicInstance, type Ref } from "vue";
import type { TypeTableEnum } from "./model/batiment-dropdown";
import BatimentSection from "./model/BatimentSections";
import { Section, TableType } from "./model/Section";

interface IInstance extends ComponentPublicInstance {
  batiment: BatimentSection;
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
        batimentService.retrieveBatiment(
          to.params.batimentId as string,
          instance.batiment
        );
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
  methods: {
    clearInputImage(valueColumn: Ref<any>, inputRefString: string): void {
      valueColumn.value = null;
      const inputRef: any = this.$refs[inputRefString];
      if (inputRef && inputRef[0]) {
        inputRef[0].value = null;
      }
    },
  },
});
</script>
<script setup lang="ts">
import Parse from "parse/dist/parse.min.js";
import imageService from "../services/image-service";
import batimentService from "./batiment.service";
import { useRouter } from "vue-router";

const router = useRouter();

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

const onSubmit = async () => {
  const batimentToSave = new Parse.Object("batiment");
  let shouldBeSaved = true;
  Object.values(batiment.allSections).forEach((aSection: Section) => {
    Object.entries(aSection.columns).forEach(([keyColumn, valueColumn]) => {
      let value = valueColumn.value.value;
      let columnType = valueColumn.type;
      if (value === "" || value === null || value === undefined) {
        return;
      }
      if (typeof columnType === "number") {
        if (
          columnType === TableType.NUMBER ||
          columnType === TableType.NATURAL_NUMBER
        ) {
          value = Number(value);
        } else if (columnType === TableType.DATE) {
          value = new Date(value);
        } else if (columnType === TableType.IMAGE) {
          try {
            value = new Parse.File(Date.now().toString(), { base64: value });
          } catch (error) {
            shouldBeSaved = false;
            alert("Fail to upload your file. Maybe it is not compatible.");
            console.error("Fail to upload your file, details:\n", error);
            return;
          }
        }
        batimentToSave.set(keyColumn, value);
      } else {
        columnType = columnType as TypeTableEnum;
        const pointer = new Parse.Object(columnType.name);
        pointer.id = value;
        batimentToSave.set(keyColumn, pointer);
      }
    });
  });
  if (!shouldBeSaved) {
    return;
  }
  batimentToSave.set("owner", Parse.User.current());
  try {
    const batimentSaved = await batimentToSave.save();
    router.push({
      name: "BatimentDetail",
      params: { batimentId: batimentSaved.id },
    });
  } catch (error: any) {
    // TODO
    // If unauthorized or forbidden, you should logout
    console.error(error);
    alert("Failed to create new object: " + error.message);
  }
};

defineExpose({ batiment, setLatLong });
</script>
