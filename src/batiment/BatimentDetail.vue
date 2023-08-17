<template>
  <br />
  <template v-if="batiment.isOwner">
    <RouterLink :to="'/batiment/' + batiment.id + '/edit'">Éditer</RouterLink>
    <br />
    <button v-on:click.prevent="deleteCurrentBatiment()">
      Supprimer le bâtiment
    </button>
  </template>
  <div
    v-for="[keySection, valueSection] in batimentService.destructuringBatiment(
      batiment,
    )"
    :key="keySection"
    :class="keySection.substring(1)"
  >
    <h3>{{ valueSection.commentaire }}</h3>
    <dl>
      <div
        v-for="[
          keyColumnsGroup,
          columnsGroup,
        ] in batimentService.destructuringColumnsGroup(
          valueSection.columnsGroup,
        )"
        :key="keyColumnsGroup"
        class="batiment-detail__columns-group"
        :class="
          Object.keys(columnsGroup).length > 1
            ? 'batiment-detail__columns-group--several'
            : ''
        "
      >
        <div
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
          <template v-if="typeof valueColumn.type === 'number'">
            <dt v-html="valueColumn.commentaire"></dt>
            <dd>
              <template v-if="valueColumn.type === TableType.IMAGE">
                <img
                  v-if="valueColumn.vueRef.value"
                  :src="valueColumn.vueRef.value?._url"
                  class="batiment-detail__previsualization"
                />
                <template v-else> Aucune </template>
              </template>
              <template v-else-if="valueColumn.type === TableType.BOOLEAN">
                <template v-if="valueColumn.vueRef.value"> Vrai </template>
                <template v-else> Faux </template>
              </template>
              <template v-else-if="valueColumn.type === TableType.DATE">
                <template v-if="valueColumn.vueRef.value">
                  {{ valueColumn.vueRef.value?.toDateString() }}
                </template>
                <template v-else> Inconnu </template>
              </template>
              <template v-else-if="valueColumn.type === TableType.GEOPOINT">
                {{ valueColumn.vueRef.value?.latitude }},
                {{ valueColumn.vueRef.value?.longitude }}
              </template>
              <template v-else-if="valueColumn.type === TableType.USER">
                <template
                  v-if="
                    valueColumn.vueRef.value?.id === Parse.User.current()?.id
                  "
                >
                  Vous avez créé cet bâtit, vous pouvez le modifier
                </template>
                <template v-else>
                  Vous n'avez pas enregistré cet bâtit, vous ne pouvez ni le
                  modifier, ni le supprimer
                </template>
              </template>
              <template v-else>
                <template v-if="valueColumn.vueRef.value">
                  {{ valueColumn.vueRef.value }}
                </template>
                <template v-else> Néant </template>
              </template>
            </dd>
          </template>
          <template v-else>
            <dt>{{ valueColumn.commentaire }}</dt>
            <dd>
              <template v-if="valueColumn.vueRef.value">
                {{ valueColumn.type.enum[valueColumn.vueRef.value] }}
              </template>
              <template v-else> Néant </template>
            </dd>
          </template>
        </div>
      </div>
    </dl>
  </div>
</template>
<script lang="ts">
import { defineComponent, type ComponentPublicInstance } from "vue";
import BatimentSection from "./model/BatimentSections";
import { TableType } from "./model/Section";
import batimentService from "./batiment.service";
import Parse from "parse/dist/parse.min.js";
import { useRouter } from "vue-router";

interface IInstance extends ComponentPublicInstance {
  batiment: BatimentSection;
}

export default defineComponent({
  beforeRouteEnter(to, _, next) {
    next((vm) => {
      const instance = vm as IInstance;
      if (to.params.batimentId) {
        // For instance http://127.0.0.1:5173/batiment/2961/edit
        batimentService.retrieveABatiment(
          to.params.batimentId as string,
          instance.batiment,
        );
      }
    });
  },
});
</script>
<script setup lang="ts">
const batiment = new BatimentSection();

const router = useRouter();

const deleteCurrentBatiment = async () => {
  const confirmation = confirm(
    "Êtes-vous certain de vouloir supprimer ce bâtiment (oppération irréversible)",
  );
  const batimentToDelete = new Parse.Object("batiment");
  if (!confirmation) {
    return;
  }
  batimentToDelete.id = batiment.id as string;
  try {
    await batimentToDelete.destroy();
    router.push("/");
  } catch (error: any) {
    console.error(error);
    alert("Failed to delete object");
  }
};

defineExpose({ batiment });
</script>
<style lang="scss" scoped>
.batiment-detail {
  &__columns-group {
    width: 1024px;
    &:nth-child(even) {
      background-color: #fff;
    }
    &:nth-child(odd) {
      background-color: #ccc;
    }
  }
  &__previsualization {
    height: 20.25rem;
  }
}
</style>
