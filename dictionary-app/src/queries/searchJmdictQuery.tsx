import gql from "graphql-tag";

export default gql`
  query search($key: String!, $cursor: String = null) {
    connection: searchEntries(key: $key, first: 10, after: $cursor) {
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
          translation {
            translation {
              text
            }
            type
          }
          source
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
