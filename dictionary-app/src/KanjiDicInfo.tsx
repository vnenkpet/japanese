import gql from "graphql-tag";
import * as React from "react";
import { Query } from "react-apollo";
import styled from "./styled-components";

interface IData {
  kanji: {
    kanji: string;
    kana: [string];
    gloss: [string];
  };
}

interface IVariables {
  kanji: string;
}

const GET_KANJIDIC = gql`
  query getKanjidicInformation($kanji: String!) {
    kanji: getKanjiDicInformation(kanji: $kanji) {
      kanji
      kana
      gloss
    }
  }
`;

const KanjiDicInfoWrapper = styled.div`
  padding: 20px;
`;

const KanjiDisplay = styled.div`
  font-size: 50px;
`;

export default ({ kanji }: { kanji: string }) => {
  return (
    <Query<IData, IVariables> query={GET_KANJIDIC} variables={{ kanji }}>
      {({ data, loading, error }) => {
        if (loading) {
          return <KanjiDicInfoWrapper>Loading...</KanjiDicInfoWrapper>;
        }
        if (error) {
          return <KanjiDicInfoWrapper>{error.toString}</KanjiDicInfoWrapper>;
        }
        return (
          <KanjiDicInfoWrapper>
            <div>Kanji Info</div>
            <KanjiDisplay>{data.kanji.kanji}</KanjiDisplay>
            <div>Readings: {data.kanji.kana.join("; ")}</div>
            <div>Meanings: {data.kanji.gloss.join("; ")}</div>
          </KanjiDicInfoWrapper>
        );
      }}
    </Query>
  );
};
