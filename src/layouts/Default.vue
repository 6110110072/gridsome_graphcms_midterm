<template>
  <div class="layout">
    <TheHeader />

    <ThePageTransitionOverlay />

    <div class="pageTransitionWrapper">
      <slot />
      <!-- <TheFooter /> -->
    </div>
  </div>
</template>

<script>
import TheHeader from "@/components/TheHeader.vue"
import TheFooter from "@/components/TheFooter.vue"
import ThePageTransitionOverlay from "@/components/ThePageTransitionOverlay.vue"

export default {
  components: {
    TheHeader,
    TheFooter,
    ThePageTransitionOverlay
  }
}
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Karla&family=Rubik&display=swap");
body {
  margin: 0;
  padding: 0;
  font-family: "Rubik", karla, -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  line-height: 1.5;
}
.layout {
  margin-right: auto;
  margin-left: auto;
  max-width: 1100px;
  // padding-top: 4rem;
  // padding-bottom: 4rem
}
.header {
  margin-bottom: 0.75rem;
  font-weight: 700;
}
.headerText {
  font-size: 4rem;
  text-decoration: none;
  color: #5828e8;
}
.nav__link {
  margin-left: 20px;
}
@media (max-width: 760px) {
  body {
    margin-right: 8px;
    margin-left: 8px;
  }
  .layout {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
}
</style>
