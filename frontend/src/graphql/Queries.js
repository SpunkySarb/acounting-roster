import { gql } from "@apollo/client";

export const GET_DATA = gql`
  query {
    getData {
      id
      artist
      rate
      streams
      avgpayout
      status
    }
  }
`;

