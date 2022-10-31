<template>
  <h2>
    <template v-if="isCreation"> Création d'un bâtiment </template>
    <template v-else> Mise à jour du bâtiment </template>
  </h2>
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
      <div
        v-for="[
          keyColumnsGroup,
          columnsGroup,
        ] in batimentService.destructuringColumnsGroup(
          valueSection.columnsGroup
        )"
        :key="keyColumnsGroup"
        class="batiment-update__columns-group"
        :class="
          Object.keys(columnsGroup).length > 1
            ? 'batiment-update__columns-group--several'
            : ''
        "
      >
        <label
          v-for="[
            keyColumn,
            valueColumn,
          ] in batimentService.destructuringColumns(columnsGroup)"
          :key="keyColumn"
          :class="
            keySection.substring(1) +
            '__' +
            keyColumn +
            ' ' +
            (valueColumn.cssClass ? valueColumn.cssClass : '')
          "
        >
          <span v-html="valueColumn.commentaire"></span>
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
                  :src="valueColumn.value.value?._url"
                  :ref="'previsualization' + keyColumn"
                />
                <button
                  v-on:click.prevent="
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
            <template v-else-if="valueColumn.type === TableType.GEOPOINT">
              <!-- See also https://fr.wikipedia.org/wiki/Liste_de_points_extr%C3%AAmes_de_la_France#France_m%C3%A9tropolitaine_et_d%C3%A9partements_d'outre-mer -->
              <input
                :id="'input__' + keyColumn + 'latitude'"
                v-model="latitude"
                type="number"
                step="any"
                :required="valueColumn.validation?.required"
                min="41"
                max="52"
              />
              <input
                :id="'input__' + keyColumn + 'longitude'"
                v-model="longitude"
                type="number"
                step="any"
                :required="valueColumn.validation?.required"
                min="-5.1"
                max="10"
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
    </div>
    <button :disabled="submitPending">Soumettre</button>
    <div v-if="submitPending">En cours d'enregistrement</div>
  </form>
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  watchEffect,
  type ComponentPublicInstance,
  type Ref,
} from "vue";
import type { TypeTableEnum } from "./model/batiment-dropdown";
import BatimentSection from "./model/BatimentSections";
import { Section, TableType } from "./model/Section";

interface IInstance extends ComponentPublicInstance {
  batiment: BatimentSection;
  setLatLong(queryParam: { latitude: number; longitude: number }): void;
  isCreationFunc(isCreation: boolean): void;
  redirectToHomePage(): void;
  filesToRemove: Parse.File[];
}

export default defineComponent({
  beforeRouteEnter(to, _, next) {
    next((vm) => {
      const instance = vm as IInstance;
      if (to.params.batimentId) {
        // For instance http://127.0.0.1:5173/batiment/2961/edit
        batimentService
          .retrieveABatiment(to.params.batimentId as string, instance.batiment)
          .then(() => {
            instance.batiment.autorisationSetToFalse();
            instance.setLatLong({
              latitude: instance.batiment.latitude,
              longitude: instance.batiment.longitude,
            });
          });
        instance.isCreationFunc(false);
      } else if (
        to.query.lat &&
        to.query.long &&
        !isNaN(Number(to.query.lat)) &&
        !isNaN(Number(to.query.long)) &&
        Number(to.query.lat) >= -90 &&
        Number(to.query.lat) <= 90 &&
        Number(to.query.long) >= -90 &&
        Number(to.query.long) <= 90
      ) {
        instance.setLatLong({
          latitude: Number(to.query.lat),
          longitude: Number(to.query.long),
        });
        instance.isCreationFunc(true);
      } else {
        alert("Error in URL, redirect to homepage");
        instance.redirectToHomePage();
      }
    });
  },
  methods: {
    clearInputImage(valueColumn: Ref<any>, inputRefString: string): void {
      if (valueColumn.value?._url) {
        this.filesToRemove.push(reactive(valueColumn.value));
      }
      valueColumn.value = null;
      const inputRef: any = this.$refs[inputRefString];
      if (inputRef && inputRef[0]) {
        inputRef[0].value = null;
      }
    },
    setFileData(
      event: any,
      valueColumn: Ref<Parse.File | null>,
      previsualizationRefString: string
    ): void {
      if (event?.target?.files && event.target.files[0]) {
        const file: File = event.target.files[0];
        if (!/^image\//.test(file.type)) {
          alert(`You could upload only an image. Your file is "${file.type}".`);
          return;
        }
        if (valueColumn.value?._url) {
          this.filesToRemove.push(reactive(valueColumn.value));
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

const latitude = ref<number>();
const longitude = ref<number>();
const isCreation = ref<boolean>();

const redirectToHomePage = () => {
  router.push("/");
};

const setLatLong = (queryParam: { latitude: number; longitude: number }) => {
  latitude.value = queryParam.latitude;
  longitude.value = queryParam.longitude;
};

const isCreationFunc = (isCreationParam: boolean) => {
  isCreation.value = isCreationParam;
};

const filesToRemove: Parse.File[] = [];

watchEffect(() => {
  if (!isNaN(latitude.value as number)) {
    batiment.latitude = Number(latitude.value);
  }
  if (!isNaN(longitude.value as number)) {
    batiment.longitude = Number(longitude.value);
  }
});

const createBatimentToSave = () => {
  const batimentToSave = new Parse.Object("batiment");
  if (batiment.id) {
    batimentToSave.id = batiment.id;
  }
  Object.values(batiment.allSections).forEach((aSection: Section) => {
    Object.values(aSection.columnsGroup).forEach((columnsGroup) => {
      Object.entries(columnsGroup).forEach(([keyColumn, valueColumn]) => {
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
  });
  if (isCreation.value) {
    batimentToSave.set("owner", Parse.User.current());
  }
  return batimentToSave;
};

const submitPending = ref<boolean>(false);

const onSubmit = async () => {
  if (submitPending.value) {
    return;
  }
  if (batiment.autorisation !== true) {
    alert("Vous devez accepter les CGU");
    return;
  }
  submitPending.value = true;
  const allBatiments = await batimentService.retrieveAllBatimentsWithCatch(
    useRouter()
  );
  if (allBatiments.length === 0) {
    alert("Nothing saved");
    submitPending.value = false;
    return;
  }
  if (isCreation.value) {
    let shouldSave = true;
    allBatiments.forEach((aBatiment) => {
      if (
        aBatiment.latitudeLongitude.latitude === Number(latitude.value) ||
        aBatiment.latitudeLongitude.longitude === Number(longitude.value)
      ) {
        alert(
          `A batiment with latitude '${latitude.value}' or '${longitude.value}' already exists. Batiment is not saved.`
        );
        shouldSave = false;
      }
    });
    if (!shouldSave) {
      submitPending.value = false;
      return;
    }
  }
  try {
    const batimentSaved = await createBatimentToSave().save();
    filesToRemove.forEach(async (aFileToRemove) => {
      // Needs master key https://docs.parseplatform.org/js/guide/#deleting-files
      // await aFileToRemove.destroy();
      console.warn(`Please delete ${aFileToRemove._url}`);
    });
    router.push({
      name: "BatimentDetail",
      params: { batimentId: batimentSaved.id },
    });
  } catch (error: any) {
    submitPending.value = false;
    // TODO
    // If unauthorized or forbidden, you should logout
    console.error(error);
    alert("Failed to create new object: " + error.message);
  }
};

defineExpose({
  batiment,
  setLatLong,
  isCreationFunc,
  redirectToHomePage,
  filesToRemove,
});
</script>
<style lang="scss" scoped>
.batiment-update {
  &__columns-group {
    width: 1024px;
    &:nth-child(even) {
      background-color: #fff;
    }
    &:nth-child(odd) {
      background-color: #ccc;
    }
  }
  &__img-group {
    display: grid;
    justify-items: start;
  }
  &__previsualization {
    height: 6.25rem;
  }
  .display-none {
    display: none;
  }
}
</style>
