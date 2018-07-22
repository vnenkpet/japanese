import * as React from "react";
import IJmdictEntry from "./schema/IJmdictEntry";
import styled from "./styled-components";

const Text = styled.div`
  font-size: 20px;
`;

const Row = styled.div`
  margin-top: 20px;
`;

export default ({ kana, kanji, sense }: IJmdictEntry) => (
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
      {sense.map((item, index) => {
        return (
          <li key={index}>
            {item.gloss.map(gloss => gloss.text).join("; ")} ({item.partOfSpeech.join(
              ", "
            )})
          </li>
        );
      })}
    </ul>
  </Row>
);
