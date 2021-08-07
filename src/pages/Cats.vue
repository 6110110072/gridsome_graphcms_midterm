<template>
  <layout>
    <div>
      <CatShop />
    </div>
  </layout>
</template>

<script>
import CatShop from "@/components/CatShop.vue"

export default {
  components: {
    CatShop,
  },
}
</script>


<page-query>
  query {
    pageAll:gcms {
      productCats {
        id
        name
        description
        categories {
          name
        }
        price
        images {
          url
        }
        slug
      }
    }

    page1:gcms {
      productCats(first: 3,orderBy:price_ASC) {
        id
        name
        description
        categories {
          name
        }
        price
        images {
          url
        }
        slug
      }
    }

    page2:gcms {
      productCats(skip: 3, first: 3,orderBy:price_ASC) {
        id
        name
        description
        categories {
          name
        }
        price
        images {
          url
        }
        slug
      }
    }
    
    select0_10k:gcms {
      productCats(where: {price_lte: 10000},orderBy:price_ASC) {
        id
        name
        description
        categories {
          name
        }
        price
        images {
          url
        }
        slug
      }
    }

    select10k_40k:gcms {
      productCats (where:{ AND: [{ price_gt: 10000 }, { price_lte: 40000 }] },orderBy:price_ASC) {
        id
        name
        description
        categories {
          name
        }
        price
        images {
          url
        }
        slug
      }
    }

    select40k_70k:gcms {
      productCats (where:{ AND: [{ price_gt: 40000 }, { price_lte: 70000 }] },orderBy:price_ASC) {
        id
        name
        description
        categories {
          name
        }
        price
        images {
          url
        }
        slug
      }
    }

    select70k_grt:gcms {
      productCats (where:{ price_gt: 70000},orderBy:price_ASC) {
        id
        name
        description
        categories {
          name
        }
        price
        images {
          url
        }
        slug
      }
    }

  }


</page-query>