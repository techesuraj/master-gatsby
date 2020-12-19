import path from "path";
import fetch from "isomorphic-fetch";
import dotenv from "dotenv";
export async function turnPizzasIntoPages({ graphql, actions }) {
  // 1. Get a template for this page
  const pizzaTemplate = path.resolve("./src/templates/Pizza.js");
  // 2. Query all the pizzas
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);
  // 3. Loop over each pizza and create a page for that pizza
  data.pizzas.nodes.forEach((pizza) =>
    actions.createPage({
      // what is the URL for new page
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        suraj: "i am cool",
        slug: pizza.slug.current,
      },
    })
  );
}
export async function turnToppingsIntoPages({ graphql, actions }) {
  // 1. Get the template
  const toppingTemplate = path.resolve("./src/pages/pizzas.js");
  // 2. Query all the toppings
  const { data } = await graphql(`
    query {
      toppings: allSanityToppings {
        nodes {
          id
          name
        }
      }
    }
  `);
  // CreatePage for that toppings
  data.toppings.nodes.forEach((topping) => {
    actions.createPage({
      path: `topping/${topping.name}`,
      component: toppingTemplate,
      context: {
        topping: topping.name,
        toppingRegex: `/${topping.name}/i`,
      },
    });
  });
  // 4. Pass topping data to pizza.js
}
// export async function turnBeersIntoBeersPage({ graphql, actions }) {
//   const beersTemplate = path.resolve("./src/pages/beers.js");
//   const { data } = await graphql(`
//     query {
//       beers: allBeer {
//         nodes {
//           image
//           id
//           name
//         }
//       }
//     }
//   `);
//   actions.createPage({
//     path: "/beers",
//     component: beersTemplate,
//     context: {
//       beers: data.beers.nodesbeer,
//     },
//   });
// }
export async function fetchBeersAndTurnIntoNodes({
  actions,
  createNodeId,
  createContentDigest,
}) {
  // 1.Fetch all beers
  const res = await fetch("https://sampleapis.com/beers/api/ale");
  const beers = await res.json();

  // 2.Loop over each one
  for (const beer of beers) {
    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      children: [],
      internal: {
        type: "Beer",
        mediaType: "application/json",
        contentDigest: createContentDigest(beer),
      },
    };
    // 3.Create a node for that beer
    actions.createNode({
      ...beer,
      ...nodeMeta,
    });
  }
}
export async function turnSlicemasterIntoPages({ graphql, actions }) {
  // 1.Query all the slicemasters
  const { data } = await graphql(`
    query {
      slicemasters: allSanityPerson {
        nodes {
          id
          name
          slug {
            current
          }
        }
        totalCount
      }
    }
  `);
  // TODO: 2. Turn each slicemaster into their own page
  // 3. Figure out how many pages there are based on how many slicemasters there are,and how many per page
  const pageCount = Math.ceil(data.slicemasters.totalCount / 4);
  // 4. Loop from 1 to n and create a page by passing to query in slicemaster
  Array.from({ length: pageCount }).forEach((_, i) => {
    actions.createPage({
      path: `/slicemasters/${i + 1}`,
      component: path.resolve("./src/pages/slicemasters.js"),
      context: {
        skip: i * 4,
        current: i + 1,
        pageSize: 4,
      },
    });
  });
}

export async function turnSlicemasterIntoDescriptionPage({ graphql, actions }) {
  // 1.Query all the slicemasters
  const { data } = await graphql(`
    query {
      slicemasters: allSanityPerson {
        nodes {
          id
          name
          description
          slug {
            current
          }
        }
        totalCount
      }
    }
  `);
  // TODO: 2. Turn each slicemaster into their own page
  // 3. Figure out how many pages there are based on how many slicemasters there are,and how many per page

  // 4. Loop from 1 to n and create a page by passing to query in slicemaster
  data.slicemasters.nodes.forEach((slicemaster) => {
    actions.createPage({
      path: `/slicemaster/${slicemaster.slug.current}`,
      component: path.resolve("./src/templates/Slicemaster.js"),
      context: {
        name: slicemaster.name,
        slug: slicemaster.slug.current,
      },
    });
  });
}
export async function sourceNodes(params) {
  // fetch the list of beers and source them into gatsby api
  await Promise.all([fetchBeersAndTurnIntoNodes(params)]);
}
export async function createPages(params) {
  // Create pages dynamically
  // wait for all promises to be resolved
  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingsIntoPages(params),
    turnSlicemasterIntoPages(params),
    turnSlicemasterIntoDescriptionPage(params),
  ]);
  // 1. Pizzas
  // 2. Toppings
  // 3. Slicemaster
}
