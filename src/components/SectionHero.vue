<template>
  <section class="hero">
    <div class="hero__contentWrapper">
      <img src="../assets/img/jpg/index-page3.jpg" class="center" />
      <p class="hero__heading">Pets Shop</p>
      <h1 class="hero__extraLead">
        <strong>Pets Shop</strong>
        <span class="text-description">
          A team who has passion in lovely pet and want to build the best online pet supplies for
          dog, cat, bird and all kinds of pets. Pet lover is able to search, compare and shopping in
          our online store with convenient and more affordable. We hope you and your pet enjoy with
          us.
        </span>
      </h1>
    </div>

    <!-- <SocialIcons class="hero__socialIcons" parent-component="the Hero" /> -->

    <!-- <div class="hero__scrollBtn">
      <font-awesome :icon="['fas', 'arrow-down']" />
    </div> -->
  </section>
</template>

<script>
import SocialIcons from "@/components/SocialIcons.vue"

export default {
  components: {
    SocialIcons
  }
}
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;1,400&display=swap");
.text-description {
  font-family: "Kanit", sans-serif;
  font-weight: bold;
}
.hero {
  position: relative;
  display: grid;
  overflow: hidden;
  height: 100vh;
  grid-template-columns: 1fr 60px 1fr;
  grid-template-rows: 2fr 1fr 1fr;
  grid-template-areas:
    ". . ."
    "contentWrapper contentWrapper contentWrapper"
    "socialIcons scrollBtn .";
  @media (min-width: $breakpoint-lg) {
    grid-template-columns: 1fr 4fr 60px 5fr;
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-areas:
      ". . . ."
      ". contentWrapper contentWrapper contentWrapper"
      "socialIcons . scrollBtn .";
  }

  &__contentWrapper {
    position: relative;
    grid-area: contentWrapper;
    align-self: center;
    margin-left: 1rem;
    &:before {
      position: absolute;
      z-index: $layer-negative-z-index;
      top: 50%;
      left: 10px;
      font-size: 250px;
      content: "";
      color: $color-text-alt;
      transition: color $duration-animation-base ease;
      transform: translateY(-50%);
      @media (min-width: $breakpoint-lg) {
        font-size: 360px;
      }
    }
    &:hover:before {
      color: rgba($color-secondary, 0.3);
    }
  }

  &__heading {
    @extend %typography-xxlarge;
    margin: 0 0 0 -0.07em;
    font-size: 80px;
  }
  &__extraLead {
    @extend %typography-small;
    margin-top: 0;
  }

  &__socialIcons {
    grid-area: socialIcons;
    align-self: end;
    margin-bottom: 13vh;
    display: flex;
    justify-content: flex-start;
    @media (min-width: $breakpoint-lg) {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
  }

  &__scrollBtn {
    grid-area: scrollBtn;
    justify-self: center;
    align-self: end;
    margin-bottom: 13vh;
  }

  .center {
    margin-right: auto;
    margin-left: auto;
    display: block;
    width: 50%;
    border-radius: 10px;
  }
}
</style>
