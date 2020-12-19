import { Link } from "gatsby";
import Img from "gatsby-image";
import React from "react";
import styled from "styled-components";
import Nav from "../components/Nav";
import Pagination from "../components/Pagination";
import SEO from "../components/SEO";
const SlicemasterGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;
const SlicemasterStyle = styled.div`
  a {
    text-decoration: none;
  }
  .gatsby-image-wrapper {
    height: 400px;
  }
  h2 {
    transform: rotate(-2deg);
    text-align: center;
    font-size: 4rem;
    margin-bottom: -2rem;
    position: relative;
    z-index: 2;
  }
  .description {
    background: var(--yellow);
    padding: 1rem;
    margin: 2rem;
    margin-top: -6rem;
    z-index: 2;
    position: relative;
    transform: repeat(1deg);
    text-align: center;
  }
`;
export default function SlicemastersPage({ data, pageContext }) {
  const slicemasters = data.slicemaster.nodes;
  return (
    <>
      <SEO title={`Slicemaster - Page ${pageContext.current || 1}`}></SEO>
      <Pagination
        pageSize={4}
        totalCount={data.slicemaster.totalCount}
        currentPage={pageContext.current || 1}
        skip={pageContext.skip}
        base={`/slicemasters`}
      />
      <SlicemasterGrid>
        {slicemasters.map((person) => (
          <SlicemasterStyle>
            <Link to={`/slicemaster/${person.slug.current}`}>
              <h2>
                <span className="mark">{person.name}</span>
              </h2>
            </Link>
            <Img fluid={person.image.asset.fluid} />
            <p className="description">{person.description}</p>
          </SlicemasterStyle>
        ))}
      </SlicemasterGrid>
    </>
  );
}
export const query = graphql`
  query($skip: Int = 0, $pageSize: Int = 4) {
    slicemaster: allSanityPerson(limit: $pageSize, skip: $skip) {
      totalCount
      nodes {
        id
        name
        slug {
          current
        }
        description
        image {
          asset {
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
