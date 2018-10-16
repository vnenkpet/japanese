import gql from "graphql-tag";

export default gql`
  query search($key: String!, $cursor: String = null) {
    connection: searchEntriesConnection(key: $key, first: 10, after: $cursor) {
      totalCount
      edges {
        node {
          id
          kanji {
            text
          }
          kana {
            text
          }
          sense {
            partOfSpeech
            misc
            dialect
            info
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
          jlpt
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
