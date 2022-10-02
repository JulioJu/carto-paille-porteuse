<template>
  <form class="login-user" @submit.prevent="onSubmit">
    <input type="email" v-model="form.email" placeholder="email" />
    <input type="password" v-model="form.password" placeholder="password" />
    <button>Se connecter</button>
  </form>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import Parse from "parse/dist/parse.min.js";
import Store from "@/store";
import { useRouter } from "vue-router";

const router = useRouter();

const form = reactive({
  email: "",
  password: "",
});
const onSubmit = async () => {
  try {
    const user = await Parse.User.logIn(form.email, form.password);
    alert("Connexion réussie");
    console.info(user);
    user.add("connections", new Date().toString());
    user.save();
    Store.user.isAuthenticated.value = true;
    router.push("/");
  } catch (error: any) {
    alert("Error: " + error.code + " " + error.message);
  }
};
</script>

<style scoped lang="css">
.login-user {
  max-width: 30rem;
  display: grid;
  grid-template-rows: repeat(3, auto);
  grid-gap: 2rem;
}
</style>
