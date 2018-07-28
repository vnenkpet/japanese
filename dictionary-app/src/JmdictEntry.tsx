import * as React from "react";
import IJmdictEntry, { SOURCE_TYPE } from "./schema/IJmdictEntry";
import styled from "./styled-components";

const Text = styled.div`
  font-size: 20px;
`;

const Row = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const WebOccurences = styled.div`
  font-size: 11px;
`;

export default ({
  kana,
  kanji,
  sense,
  translation,
  source,
  bingSearchResults
}: IJmdictEntry) => (
  <Row>
    <Text>
      {kanji.length ? (
        <ruby>
          {kanji[0].text}
          <rt>{kana[0].text}</rt>
        </ruby>
      ) : (
        kana[0].text
      )}
    </Text>
    <ul>
      {source === SOURCE_TYPE.jmdict
        ? sense.map((item, index) => {
            return (
              <li key={index}>
                {item.gloss.map(gloss => gloss.text).join("; ")} ({item.partOfSpeech.join(
                  ", "
                )})
              </li>
            );
          })
        : ""}
      {source === SOURCE_TYPE.jmnedict
        ? translation.map((item, index) => {
            return (
              <li key={index}>
                {item.translation.map(transl => transl.text).join("; ")} ({item.type.join(
                  ", "
                )})
              </li>
            );
          })
        : ""}
    </ul>
    <WebOccurences>
      ~ {bingSearchResults.toLocaleString()} web occurences
    </WebOccurences>
  </Row>
);
