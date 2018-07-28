import * as React from "react";
import IJmdictEntry, { SOURCE_TYPE } from "./schema/IJmdictEntry";
import styled from "./styled-components";
import tagToEnglish from "./utils/tagToEnglish";

const Text = styled.div`
  font-size: 20px;
`;

const Row = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const WebOccurences = styled.div`
  font-size: 12px;
`;

const PartOfSpeech = styled.div`
  font-size: 12px;
  opacity: 0.8;
`;

const Item = styled.li`
  margin-bottom: 5px;
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
              <Item key={index}>
                {item.gloss.map(gloss => gloss.text).join("; ")}{" "}
                <PartOfSpeech>
                  <strong>{item.partOfSpeech.join(", ")}</strong>
                  {" - "}
                  {item.partOfSpeech.map(tagToEnglish).join(", ")}
                </PartOfSpeech>
              </Item>
            );
          })
        : ""}
      {source === SOURCE_TYPE.jmnedict
        ? translation.map((item, index) => {
            return (
              <Item key={index}>
                {item.translation.map(transl => transl.text).join("; ")} ({item.type.join(
                  ", "
                )})
              </Item>
            );
          })
        : ""}
    </ul>
    <WebOccurences>
      ~ {bingSearchResults.toLocaleString()} web occurences
    </WebOccurences>
  </Row>
);
