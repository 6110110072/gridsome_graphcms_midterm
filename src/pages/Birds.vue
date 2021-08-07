<template>
  <layout>
    <div>
      <BirdShop />
    </div>
  </layout>
</template>

<script>
import BirdShop from "@/components/BirdShop.vue"

export default {
  components: {
    BirdShop
  }
}
</script>

<page-query>
  query {
    pageAll:gcms {
      productBirds {
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
      productBirds(first: 3,orderBy:price_ASC) {
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
      productBirds(skip: 3, first: 3,orderBy:price_ASC) {
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
      productBirds(where: {price_lte: 10000},orderBy:price_ASC) {
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
      productBirds (where:{ AND: [{ price_gt: 10000 }, { price_lte: 40000 }] },orderBy:price_ASC) {
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
      productBirds (where:{ AND: [{ price_gt: 40000 }, { price_lte: 70000 }] },orderBy:price_ASC) {
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
      productBirds (where:{ price_gt: 70000},orderBy:price_ASC) {
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
