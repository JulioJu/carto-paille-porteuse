<template>
  <p>
    Une fois enregistré, veuillez consulter votre boîte mail pour valider votre
    compte.
  </p>
  <form class="register-user" @submit.prevent="onSubmit">
    <em class="div-input--required">champs requit</em>
    <div class="div-input div-input--required">
      <input
        type="pseudo"
        v-model="form.pseudo"
        placeholder="pseudo (peut-être votre prénom + nom)"
        required
      />
    </div>
    <div class="div-input">
      <input type="firstname" v-model="form.firstname" placeholder="Prénom" />
    </div>
    <div class="div-input">
      <input type="lastname" v-model="form.lastname" placeholder="Nom" />
    </div>
    <div class="div-input div-input--required">
      <input type="email" v-model="form.email" placeholder="email" />
    </div>
    <div class="div-input div-input--required">
      <input type="password" v-model="form.password" placeholder="password" />
    </div>
    <label>
      Vous avez lu et vous acceptez les
      <a href="/legal-info">CGU</a>
      <input type="checkbox" v-model="cgu" />
    </label>
    <button>S'enregister</button>
  </form>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import Parse from "parse/dist/parse.min.js";

const cgu = ref(false);

const form = reactive({
  pseudo: "",
  firstname: "",
  lastname: "",
  email: "",
  password: "",
});
const onSubmit = async () => {
  if (cgu.value !== true) {
    alert("Vous devez accepter les CGU");
    return;
  }
  const user = new Parse.User();
  user.set("pseudo", form.pseudo);
  user.set("firstname", form.firstname);
  user.set("lastname", form.lastname);
  user.set("username", Date.now().toString());
  user.set("password", form.password);
  user.set("email", form.email);

  try {
    const userCreated = await user.signUp();
    alert(
      "Utilisateur créé avec succès. Veuillez consulter votre boîte mail pour valider votre compte.",
    );
    console.info(userCreated);
  } catch (error: any) {
    if (error.code === 137) {
      alert(
        `Un autre utilisateur dispose déjà d'un pseudo "${form.pseudo}". Veuillez en choisir un autre.`,
      );
      return;
    }
    alert("Error: " + error.code + " " + error.message);
  }
};
</script>

<style scoped lang="scss">
.register-user {
  max-width: 30rem;
  display: grid;
  grid-template-rows: repeat(3, auto);
  grid-gap: 2rem;
  .div-input {
    display: flex;
    width: 25rem;
    padding-left: 1rem;
    box-sizing: border-box;
    input {
      width: 100%;
    }
    &--required {
      padding-left: 0rem;
      &::before {
        content: "*";
        color: red;
        padding-right: 0.5rem;
      }
    }
  }
}
</style>
