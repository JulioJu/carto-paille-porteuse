<script setup lang="ts">
import TheWelcome from "@/components/TheWelcome.vue";
import axios from "axios";

axios.get('https://dummyjson.com/products/')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
</script>

<template>
  <main>
    <TheWelcome />
  </main>
</template>
