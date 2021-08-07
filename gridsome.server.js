// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

// module.exports = function (api) {
//   api.loadSource(({ addCollection }) => {
//     // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
//   })

//   api.createPages(({ createPage }) => {
//     // Use the Pages API here: https://gridsome.org/docs/pages-api/
//   })
// }

module.exports = function (api) {

  api.createPages(async ({ graphql, createPage }) => {
    const { data } = await graphql(`
    {
      gcms {
        productCats {
          id
          name
          description 
          categories{
            name
          }
          price
          images {
            url
          }
          slug
        }

        productDogs {
          id
          name
          description 
          categories{
            name
          }
          price
          images {
            url
          }
          slug
        }

        productBirds {
          id
          name
          description 
          categories{
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
  `);
    let i = 0;
    data.gcms.productCats.forEach(node => {

      i += 1;
      createPage({
        path: `/productCats/${i}`,
        component: './src/components/CatShop.vue',
        context: {
          id: node.id,
          name: node.name,
          description: node.description,
          price: node.price,
          images: node.images,
          slug: node.slug,
          n: 0,
          st: "/productCats/4",
        },
      });
    });

    data.gcms.productDogs.forEach(node => {
      createPage({
        path: `/productDogs/${node.id}`,
        component: './src/pages/Index.vue',
        context: {
          id: node.id,
          name: node.name,
          description: node.description,
          price: node.price,
          images: node.images,
          slug: node.slug,
        }
      })
    })

    data.gcms.productBirds.forEach(node => {
      createPage({
        path: `/productBirds/${node.id}`,
        component: './src/pages/Index.vue',
        context: {
          id: node.id,
          name: node.name,
          description: node.description,
          price: node.price,
          images: node.images,
          slug: node.slug,
          n: 0
        },
        queryVariables: {
          p: 3,
        }

      })
    })

  });



};
