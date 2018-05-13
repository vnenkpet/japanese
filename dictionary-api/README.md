# Dictionary API

A GraphQL dictionary API for Japanese language.

## Run

> This server requires to be connected to a mongo database generated
using the [Database Generator Script](../database-generator)

Development mode:
`npm run debug`

Production mode:
`npm start`

Tests:
`npm tests`

[GraphQL Schema](src/models/schema.graphql)

## Graphql Endpoint

`GET /graphql?query=GRAPHQL_QUERY`

### Example queries:

1. Get first 10 JMDICT dictionary entries matching keyword "train" and display it's kanji and translations:

    ```graphql
    { 
        jmdictEntries (key: "train", limit: 10) { 
            kanji { text } 
            sense { gloss { text } } 
        } 
    }
    ```

2. Get first 10 JMNEDICT entries matching keyword "hiroshima" and display it's kanji and translations,
including detailed Kanji information from KANJIDIC:

    ```graphql
    { 
        jmnedictEntries (key: "hiroshima", limit: 10) { 
            kanji { text, kanjidicEntries { kanji, kana, } } 
            translation { translation { text } } 
        } 
    }
    ```