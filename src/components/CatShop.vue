<template>
  <div class="shoppy">
    <br />
    <br />
    <h1 class="text-title">Cats</h1>

    <b-button id="show-btn" class="cart-btn" @click="select0_10k()">
      0 - 10,000 Baht
      <b-icon icon="cart"></b-icon>
    </b-button>

    <b-button id="show-btn" class="cart-btn" @click="select10k_40k()">
      10,001 - 40,000 Baht
      <b-icon icon="cart"></b-icon>
    </b-button>

    <b-button id="show-btn" class="cart-btn" @click="select40k_70k()">
      40,001 - 70,000 Baht
      <b-icon icon="cart"></b-icon>
    </b-button>

    <b-button id="show-btn" class="cart-btn" @click="select70k_grt()">
      Greater than 70,000 Baht
      <b-icon icon="cart"></b-icon>
    </b-button>

    <b-pagination
      v-model="currentPage"
      @click.native="selectPage(currentPage)"
      :total-rows="rows"
      :per-page="perPage"
      align="center"
    ></b-pagination>

    <h1>currentPage: {{ currentPage }}</h1>

    <div v-if="this.$page.pageAll.productCats" class="product-grid text-center">
      <div class="text-center">
        <div class="post-feed">
          <!-- <div v-for="product in products.slice(perPage*(currentPage-1), perPage*currentPage)" :key="product.id" class="flex-col"> -->
          <div v-for="product in this.products" :key="product.id" class="flex-col">
            <b-card-group deck>
              <b-card
                v-for="images in product.images"
                :title="product.name"
                :img-src="images.url"
                img-alt="Image"
                img-top
                tag="article"
                style=" padding: 20px;max-width: 20rem; min-height: 36rem; max-height: 36rem; border-radius: 10px;"
                class="text-center"
              >
                <b-card-text>
                  <h5>{{ product.price }} ฿.</h5>
                  {{ product.description }}
                </b-card-text>
                <b-card-text class="categoty-text">
                  <span>
                    <b-icon icon="star-fill"></b-icon>
                    {{ product.categories[0].name }}
                  </span>
                </b-card-text>
                <template #footer>
                  <b-button href="#" variant="primary" @click="addToCart(product)">
                    <b-icon icon="cart-plus"></b-icon>
                    Add to Cart
                  </b-button>
                </template>
              </b-card>
            </b-card-group>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      perPage: 3,
      currentPage: 1,
      cartItems: [],
      x: [],
      lll: 1,
      products: [
        {
          name: "",
          description: "",
          categories: {
            name: ""
          },
          price: "",
          images: [
            {
              url: ""
            }
          ],
          slug: ""
        }
      ]
    }
  },
  created() {
    this.products = this.$page.page1.productCats
  },
  computed: {
    rows() {
      return this.$page.pageAll.productCats.length
    }
  },
  methods: {
    addToCart(itemToAdd) {
      this.cartItems = JSON.parse(localStorage.getItem("product"))
      if (this.cartItems == null) {
        this.cartItems = []
      }
      this.cartItems.push(itemToAdd)
      localStorage.setItem("product", JSON.stringify(this.cartItems))
      // console.log(this.products)

      // this.cartItems.push(window.localStorage.getItem("product"))
    },
    selectPage(page) {
      if (page == 1) {
        this.products = this.$page.page1.productCats
      }
      if (page == 2) {
        this.products = this.$page.page2.productCats
      }
    },
    select0_10k() {
      this.products = this.$page.select0_10k.productCats
    },
    select10k_40k() {
      this.products = this.$page.select10k_40k.productCats
    },
    select40k_70k() {
      this.products = this.$page.select40k_70k.productCats
    },
    select70k_grt() {
      this.products = this.$page.select70k_grt.productCats
    }
  }
}
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;1,400&display=swap");
.card {
  max-height: 36rem !important;
}
h5 {
  color: #ff901e;
}
.card-footer {
  background-color: transparent;
}
.card-body .card-title {
  font-weight: bold;
  text-align: left;
  color: #703200;
}
.card-body .card-text {
  font-family: "Kanit", sans-serif;
  font-weight: bold;
  text-align: left;
}
.text-title {
  padding-top: 4rem;
  font-weight: bold;
  text-align: center;
}
.flex-col {
  padding-top: 5px;
  padding-bottom: 5px;
}
</style>
