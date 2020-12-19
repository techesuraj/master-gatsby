import { graphql } from "gatsby";
import React from "react";
import styled from "styled-components";
import Nav from "../components/Nav";
import SEO from "../components/SEO";
const BeerGridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, mixmax(200px, 1fr));
  gap: 2rem;
`;
export default function BeersPage({ data: { beers } }) {
  return (
    <>
      <SEO title={`Beers! we have ${data.beers.nodes.length}`}></SEO>
      <h2 className="center">
        We have {beers.nodes.length} Beers available. Dine in Only!
      </h2>
      <BeerGridStyles>
        {beers.nodes.map((beer) => {
          const rating = Math.round(beer.rating.average);
          return (
            <div key={beer.key}>
              <img src={beer.image} alt={beer.name} />
              <h3 className="name">{beer.name}</h3>
              {beer.price}
              <p title={`${rating} out of 5 stars`}>
                {`🤩`.repeat(rating)}
                <span style={{ filter: `grayscale(100%)` }}>
                  {`🤩`.repeat(5 - rating)}
                </span>
                <span>({beer.rating.reviews})</span>
              </p>
            </div>
          );
        })}
      </BeerGridStyles>
    </>
  );
}

export const query = graphql`
  query {
    beers: allBeer {
      nodes {
        image
        id
        name
        price
        rating {
          average
          reviews
        }
      }
    }
  }
`;
