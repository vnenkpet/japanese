import gql from "graphql-tag";

export default gql`
  query search($key: String!, $cursor: String = null) {
    connection: searchJmdictEntries(key: $key, first: 5, after: $cursor) {
      totalCount
      edges {
        node {
          kanji {
            text
          }
          kana {
            text
          }
          sense {
            partOfSpeech
            gloss {
              text
            }
          }
          bingSearchResults
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
      }
    }
  }
`;
