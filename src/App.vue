<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import parsePlatform from "./services/parse-platform";
import Parse from "parse/dist/parse.min.js";
import Store from "@/store";
import FooterContainer from "./components/footer/FooterContainer.vue";

parsePlatform.initializeParse();

Store.user.isAuthenticated.value =
  Parse.User.current()?.authenticated() === true;

const isAuthenticated = Store.user.isAuthenticated;

const logout = () => {
  Parse.User.logOut();
  Store.user.isAuthenticated.value = false;
};
</script>

<template>
  <div class="wrapper">
    <header>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <template v-if="isAuthenticated">
          <a @click.prevent="logout()">Se déconnecter</a>
        </template>
        <template v-else>
          <RouterLink to="/login-user">Se connecter</RouterLink>
          <RouterLink to="/register-user">S'enregister</RouterLink>
        </template>
      </nav>
    </header>

    <RouterView />

    <FooterContainer></FooterContainer>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
