<template>
  <footer id="footer-container" class="footer-container">
    <section class="footer__hr"></section>
    <FooterMain />
  </footer>
</template>

<script lang="ts">
import FooterMain from "./FooterMain.vue";

export default {
  components: { FooterMain },
};
</script>

<style scoped lang="scss">
$grey-white2: #d6d6d6;
$black-light: #353d47;
$blue: #3077b4;

.footer-container {
  color: $grey-white2;
  background-color: $black-light;
  width: 100%;
  position: absolute;
  left: 0;

  &__hr {
    width: 100%;
    height: 0.2rem;
    background-color: $blue;
  }
}
/** END added by JulioJu */
</style>
