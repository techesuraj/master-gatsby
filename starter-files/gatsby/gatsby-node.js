import path from "path";
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

export async function createPages(params) {
  // Create pages dynamically
  // 1. Pizzas
  // 2. Toppings
  // 3. Slicemaster
  await turnPizzasIntoPages(params);
}
