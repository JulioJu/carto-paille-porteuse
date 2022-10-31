<template>
  <form class="register-user" @submit.prevent="onSubmit">
    <input type="email" v-model="email" placeholder="email" />
    <button>Recevoir un email de réinitialisation de votre mot de passe</button>
  </form>
</template>

<script setup lang="ts">
import Parse from "parse/dist/parse.min.js";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const email = ref("");
const onSubmit = async () => {
  try {
    await Parse.User.requestPasswordReset(email.value);
    alert("Un email vous a été envoyé pour réinitialiser votre mot de passe");
    router.push("/");
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
