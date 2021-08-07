<template>
  <layout>
    <div>
      <DogShop />
    </div>
  </layout>
</template>

<script>
import DogShop from "@/components/DogShop.vue"

export default {
  components: {
    DogShop
  },
}

</script>

<page-query>
  query {
    pageAll:gcms {
      productDogs {
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
      productDogs(first: 3,orderBy:price_ASC) {
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
      productDogs(skip: 3, first: 3,orderBy:price_ASC) {
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
      productDogs(where: {price_lte: 10000},orderBy:price_ASC) {
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
      productDogs (where:{ AND: [{ price_gt: 10000 }, { price_lte: 40000 }] },orderBy:price_ASC) {
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
      productDogs (where:{ AND: [{ price_gt: 40000 }, { price_lte: 70000 }] },orderBy:price_ASC) {
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
      productDogs (where:{ price_gt: 70000},orderBy:price_ASC) {
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
