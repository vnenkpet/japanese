# Dictionary API

A GraphQL/REST dictionary API for Japanese language.


```graphql
type Query {
    jmdictEntries(key: String!, limit: Int): [JmdictEntry] # search entries by key (key can be kanji, kana, romaji or English)
}

interface Node {
    id: String
}

type JmdictEntry implements Node {
    id: String
    jmdictId: ID!
    kanji: [Kanji]
    kana: [Kana]
    sense: [Sense]
}

type Kanji {
    text: String!
    common: Boolean!
}

type Kana {
    text: String!
    common: Boolean!
}

type Sense {
    gloss: [Gloss]
}

type Gloss {
    text: String!
    lang: String!
}
```