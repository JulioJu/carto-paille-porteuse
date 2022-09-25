<template>
  <p>
    Une fois enregistré, veuillez consulter votre boîte mail pour valider votre
    compte.
  </p>
  <form class="register-user" @submit.prevent="onSubmit">
    <input type="email" v-model="form.email" placeholder="email" />
    <input type="password" v-model="form.password" placeholder="password" />
    <button>S'enregister</button>
  </form>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import Parse from "parse/dist/parse.min.js";

const form = reactive({
  email: "",
  password: "",
});
const onSubmit = async () => {
  const user = new Parse.User();
  user.set("username", Date.now().toString());
  user.set("password", form.password);
  user.set("email", form.email);

  try {
    const userCreated = await user.signUp();
    alert(
      "Utilisateur créé avec succès. Veuillez consulter votre boîte mail pour valider votre compte."
    );
    console.info(userCreated);
  } catch (error: any) {
    alert("Error: " + error.code + " " + error.message);
  }
};
</script>

<style scoped lang="css">
.register-user {
  max-width: 30rem;
  display: grid;
  grid-template-rows: repeat(3, auto);
  grid-gap: 2rem;
}
</style>
