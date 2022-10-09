<template>
  <form class="batiment-update" @submit.prevent="onSubmit">
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
            <div
              class="batiment-update__img-group"
              v-if="valueColumn.value.value"
            >
              <img
                class="batiment-update__previsualization"
                :alt="'Previsualization ' + keyColumn"
                :ref="'previsualization' + keyColumn"
              />
              <button
                v-on:click="
                  clearInputImage(valueColumn.value, 'fileInput' + keyColumn)
                "
              >
                Remove image downloaded
              </button>
            </div>
            <input
              :id="'input__' + keyColumn"
              type="file"
              v-on:change="
                setFileData(
                  $event,
                  valueColumn.value,
                  'previsualization' + keyColumn
                )
              "
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
    setFileData(
      event: any,
      valueColumn: Ref<any>,
      previsualizationRefString: string
    ): void {
      if (event?.target?.files && event.target.files[0]) {
        const file: File = event.target.files[0];
        if (!/^image\//.test(file.type)) {
          alert(`You could upload only an image. Your file is "${file.type}".`);
          return;
        }
        try {
          valueColumn.value = new Parse.File(Date.now().toString(), file);
          const reader = new FileReader();
          reader.addEventListener("load", () => {
            const previsualationRef: any =
              this.$refs[previsualizationRefString];
            previsualationRef[0].src = reader.result;
          });
          reader.onerror = (error) => {
            console.error("Error: ", error);
          };
          reader.readAsDataURL(file);
        } catch (error) {
          alert(
            "Fail to upload your file. Please contact us to submit the error."
          );
          console.error(error);
          return;
        }
      }
    },
  },
});
</script>
<script setup lang="ts">
import Parse from "parse/dist/parse.min.js";
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
<style lang="scss" scoped>
.batiment-update {
  &__img-group {
    display: grid;
    justify-items: start;
  }
  &__previsualization {
    height: 6.25rem;
  }
}
</style>
