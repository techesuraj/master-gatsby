import { useStaticQuery, Link } from "gatsby";
import React from "react";
import styled from "styled-components";
const ToppingsStyles = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
  a {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 0 1rem;
    align-items: center;
    padding: 5px;
    background: var(--grey);
    border-radius: 2px;
    .count {
      background: white;
      padding: 12px 5px;
    }
    .active {
      background: var(--yellow);
    }
  }
`;

function countPizzasInToppings(pizzas) {
  const counts = pizzas
    .map((pizza) => pizza.toppings)
    .flat()
    .reduce((acc, topping) => {
      // Check if this is an existing topping
      if (topping !== null) {
        const existingTopping = acc[topping.id];
        if (existingTopping) {
          // If it is increment by 1
          existingTopping.count += 1;
        } else {
          // Otherwise create a new entry in our acc and set it to one
          acc[topping.id] = {
            id: topping.id,
            name: topping.name,
            count: 1,
          };
        }
      }
      return acc;
    }, {});
  // sort them based on the count;
  const sortedToppings = Object.values(counts).sort(
    (a, b) => b.count - a.count
  );
  return sortedToppings;
}

export default function ToppingsFilter() {
  // We have to use to static queries if we want fetching data in components
  // Get a list of the all toppings
  // Get a list of all the pizzas with their toppings
  const { pizzas } = useStaticQuery(graphql`
    query {
      pizzas: allSanityPizza {
        nodes {
          toppings {
            id
            name
          }
        }
      }
    }
  `);
  const toppingsWithCounts = countPizzasInToppings(pizzas.nodes);

  // Count how many pizzas are in each topping
  // Loop over the list of toppings and display the toppings and the count of the pizzas in that toppings
  return (
    <ToppingsStyles>
      {toppingsWithCounts.map((topping) => (
        <Link to={`/toppings/${topping.name}`} key={topping.id}>
          <span className="name">{topping.name}</span>
          <span>{topping.count}</span>
        </Link>
      ))}
    </ToppingsStyles>
  );
}
