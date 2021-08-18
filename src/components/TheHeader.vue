<template>
  <header class="header" style="background-color: antiquewhite">
    <div class="header__inner container">
      <!-- <LogoComponent class="header__logo" version="simple" desc="Main Logo" /> -->
      <div class="header__hamburger">
        <button
          ref="hamburger"
          class="hamburger"
          aria-controls="dropdowMenuContent"
          :aria-expanded="ariaExpanded.toString()"
          aria-label="Toggle navigation"
          @click="handleAriaExpanded"
        >
          <span class="hamburger__line line01"></span>
          <span class="hamburger__line line02"></span>
          <span class="hamburger__line line03"></span>
          <span class="hamburger__line line04"></span>
        </button>
      </div>
      <h1>
        <strong>Pets Shop&nbsp;&nbsp;</strong>
        <b-icon icon="shop"></b-icon>
      </h1>
      <div>
        <b-button id="show-btn" class="cart-btn" @click="openModal()">
          Cart
          <b-icon icon="cart2"></b-icon>
          <!-- ({{ countList.length }}) -->
          <span class="countItem">{{ countList.length }}</span>
        </b-button>
        <!-- <button @click="reload">Reload</button> -->

        <b-modal id="bv-modal-example" hide-footer>
          <template #modal-title><strong style="font-size: 25px">Products Cart</strong></template>
          <div class="d-block text-center">
            <span v-if="cartItems">
              <li
                v-for="(product, index) in countList"
                :key="index"
                style="list-style-type: number; text-align: left"
                class="cart-font"
              >
                Name: {{ product.name }} Qty: x{{ product.count }} Price: {{ product.price }} Baht
              </li>
              <br />
              <h3>
                <strong class="price">Total Price : {{ TotalPrice }}</strong>
              </h3>
            </span>
          </div>
          <b-button class="mt-3 delete-btn" block @click="deleteItem()">Delete</b-button>

          <b-button class="mt-3 submit-btn" block @click="$bvModal.hide('bv-modal-example');deleteItem();">
            Confirm
          </b-button>
        </b-modal>
      </div>

      <div id="dropdowMenuContent" class="header__menu">
        <nav class="nav">
          <ul class="nav__list">
            <li v-for="(page, index) in pages" :key="index" class="nav__item">
              <g-link class="nav__link" :to="page.url">
                {{ page.name }}
              </g-link>
            </li>
          </ul>
        </nav>

        <div class="header__socialIcons header__socialIcons--mobile">
          <!-- <SocialIcons parent-component="the Header" /> -->
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import LogoComponent from "@/components/LogoComponent.vue"
import SocialIcons from "@/components/SocialIcons.vue"

import { gsap, Sine, Power1 } from "gsap"

export default {
  components: {
    LogoComponent,
    SocialIcons
  },

  data() {
    return {
      ariaExpanded: false,
      TotalPrice: 0,
      cartItems: [],
      countList: [],
      pages: [
        {
          name: "Home",
          url: "/"
        },

        {
          name: "Cats",
          url: "/cats/"
        },
        {
          name: "Dogs",
          url: "/dogs/"
        },
        {
          name: "Birds",
          url: "/birds/"
        }
      ]
    }
  },
  mounted() {
    const { hamburger } = this.$refs
    const hamburgerMotion = gsap.timeline()

    gsap.set(".nav", { xPercent: -50, yPercent: -50 })
    gsap.set(".nav li", { translateX: -300 })
    gsap.set(".header__socialIcons--mobile", { translateX: 110 })

    hamburgerMotion
      .addLabel("step1")
      .to(".hamburger", 0.4, { backgroundColor: "transparent" }, "step1")
      .to(".line01", 0.4, { translateX: "+=40" }, "step1")
      .to(".line04", 0.4, { translateX: "-=40" }, "step1")
      .to(".header__menu", 0.4, { autoAlpha: 1 }, "step1")
      .addLabel("step2")
      .staggerTo(".nav li", 0.45, { translateX: 0, ease: Sine.easeOut }, 0.3, 0.5)
      .to(".header__socialIcons--mobile", 0.4, { translateX: 0, ease: Sine.easeOut })
      .to(".line02", 0.4, { translateY: "+=5" }, "step2")
      .to(".line03", 0.4, { translateY: "-=4" }, "step2")
      .addLabel("step3")
      .to(".nav li", 1, { marginBottom: "40px", ease: Power1.easeOut }, "step3")
      .to(".line02", 1, { rotation: 45, transformOrigin: "center" }, "step3")
      .to(".line03", 1, { rotation: -45, transformOrigin: "center" }, "step3")
      .reverse()

    hamburger.addEventListener("click", function() {
      hamburgerMotion.reversed(!hamburgerMotion.reversed())
    })

    // Hide menu after clicking on .nav__link
    const navList = document.querySelector(".nav__list")

    const clickNavLinkHandler = gsap.timeline({ paused: true })
    clickNavLinkHandler
      .to(".nav", 0.3, { autoAlpha: 0 }, 0.1, 0)
      .to(".header__socialIcons--mobile", 0.4, { translateX: 110, ease: Sine.easeOut }, 0)
      .to(".pageTransitionOverlay", 0.01, { zIndex: 11 }, 0)
      .to(".pageTransitionOverlay", 0.6, { autoAlpha: 1 }, 0.5)

    navList.addEventListener("click", e => {
      if (!e.target.classList.contains("active--exact")) {
        clickNavLinkHandler.play()
      } else {
        hamburgerMotion.reverse(0)
      }
    })
  },
  methods: {
    handleAriaExpanded() {
      this.ariaExpanded = !this.ariaExpanded
    },
    deleteItem() {
      localStorage.removeItem("product")
    },
    openModal() {
      this.countList = []
      let tempArray = []
      this.cartItems = JSON.parse(localStorage.getItem("product"))

      if (this.cartItems) {
        if (this.cartItems.length > 0) {
          this.cartItems.forEach(res => {
            let count = 1
            tempArray.forEach(resTemp => {
              if (res.id == resTemp.id) {
                count++
                res.price += resTemp.price
              }
            })
            tempArray.push({
              id: res.id,
              name: res.name,
              price: res.price,
              count: count
            })
          })
        }
        tempArray = tempArray.reverse()
      }

      var data = tempArray,
        result = Array.from(
          data.reduce(
            (m, { name, count }) => m.set(name, Math.max(m.get(name) || 0, count)),
            new Map()
          ),
          ([name, count]) => ({ name, count })
        )
      for (let i = 0; i < result.length; i++) {
        console.log(result[i].name)
        for (let j = 0; j < this.cartItems.length; j++) {
          if (result[i].name == this.cartItems[j].name) {
            result[i].price = this.cartItems[j].price
          }
        }
      }

      this.countList = result
      let sum = 0
      for (let i = 0; i < this.countList.length; i++) {
        console.log(this.countList[i].price)
        sum += this.countList[i].price * this.countList[i].count
      }
      this.TotalPrice = sum
      this.$bvModal.show("bv-modal-example")
    }
  }
}
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;1,400&display=swap");

.priceRange {
  padding: 20px;
  background-color: #f8eee0;
  border-radius: 15px;
}

.countItem {
  margin-left: 10px;
  float: right;
  width: 25px;
  height: 25px;
  background-color: #e68b6e;
  border-radius: 50%;
}
.btn-primary {
  color: #fff !important;
  background-color: #4b91f8 !important;
  border-color: #4b91f8 !important;
}
.cat-icon {
  color: #ffcb5d;
}
.page-item > button,
.page-item > span {
  color: rgb(171 116 84) !important;
  background-color: #fff !important;

  /* color: #1d7e05; */
}

.active > button {
  color: #fff !important;
  background-color: rgb(171 116 84) !important;
  border-color: rgb(171 116 84) !important;
}

.cart-font {
  font-family: "Kanit", sans-serif;
  font-weight: bold;
}
.price {
  /* color: #ff901e */
  color: black;
}
.modal-body {
  background-color: #e3d0c4;
}
.modal-header {
  background-color: cornsilk;
}
.close {
  font-size: 30px;
  background-color: transparent;
  border: none;
}
.cart-btn {
  background-color: #a80a02 !important;
}
.cart-btn:hover {
  background-color: #8a0801 !important;
}
.cart-btn:focus {
  background-color: #8a0801 !important;
}
.cart-btn:active {
  background-color: #8a0801 !important;
}
.submit-btn {
  float: right;
  background-color: #2ca30f !important;
}
.delete-btn {
  float: left;
  background-color: #d92714 !important;
}
.submit-btn:hover {
  float: right;
  background-color: #1d7e05 !important;
}
.delete-btn:hover {
  float: left;
  background-color: #b61b0a !important;
}
</style>
<style lang="scss" scoped>
.header {
  position: fixed;
  z-index: $layer-header-z-index;
  top: 0;
  right: 0;
  left: 0;

  &__inner {
    padding-top: 1em;
    padding-bottom: 1em;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  &__logo {
    z-index: $layer-hamburger-z-index;
    width: 50px;
  }

  &__hamburger {
    z-index: $layer-hamburger-z-index;
  }

  &__menu {
    position: absolute;
    z-index: $layer-dropdown-z-index;
    top: 0;
    left: 0;
    visibility: hidden;
    width: 100vw;
    height: 100vh;
    background: $color-menu-gradient;
  }

  &__socialIcons {
    &--mobile {
      position: absolute;
      right: 1rem;
      bottom: 1rem;
    }
  }
}

.hamburger {
  padding: 2px;
  display: flex;
  overflow: hidden;
  width: 40px;
  height: 40px;
  flex-direction: column;
  justify-content: space-around;
  background-color: transparent;
  border: none;
  border-radius: 5px;
  transition: box-shadow $duration-animation-base linear;
  cursor: pointer;

  &__line {
    display: block;
    width: 36px;
    height: 2px;
    background-color: $color-black;
    transition: background-color $duration-animation-base linear;

    &.line01,
    &.line04 {
      width: 18px;
    }
    &.line01 {
      align-self: flex-end;
    }
  }
  &:hover {
    .hamburger__line {
      background-color: $color-primary;
    }
  }
  &:focus {
    @extend %custom-outline;
  }
}

.nav {
  position: absolute;
  top: 50%;
  left: 50%;
  overflow: hidden;

  &__list {
    margin: 0;
    padding: 2em 0.5em;
  }

  &__item {
    list-style-type: none;
    @extend %typography-xxlarge;
  }

  &__link {
    padding: 0.5em;
    text-decoration: none;
    border-radius: 5px;
  }
}

.nav .active--exact {
  text-decoration: underline;
}
</style>
