import * as React from "react";
import IDictionaryEntry, {
  SOURCE_TYPE
} from "./../../../../../schema/IDictionaryEntry";
import styled from "./../../../../../styled-components";
import tagToEnglish from "./../../../../../utils/tagToEnglish";
import Kanji from "./Kanji";

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

const Misc = styled.div`
  opacity: 0.8;
  font-size: 12px;
`;

const Dialect = styled.div`
  opacity: 0.8;
  font-size: 12px;
`;

const Info = styled.div`
  opacity: 0.8;
  font-size: 12px;
`;

const Type = styled.div`
  opacity: 0.8;
  font-size: 12px;
`;

const Jlpt = styled.span`
  font-size: 10px;
  font-weight: bold;
  text-transform: uppercase;
`;

const DictionaryEntry: React.SFC<IDictionaryEntry> = ({
  jlpt,
  kana,
  kanji,
  sense,
  translation,
  source,
  bingSearchResults
}) => (
  <Row>
    <Kanji
      kanji={kanji}
      kana={kana}
      usuallyKana={sense ? sense[0].misc.indexOf("uk") !== -1 : false}
    />
    {jlpt && <Jlpt>JLPT {jlpt}</Jlpt>}
    <ul>
      {source === SOURCE_TYPE.jmdict
        ? sense.map((item, index) => {
            return (
              <Item key={index}>
                {item.gloss.map(gloss => gloss.text).join("; ")}
                <PartOfSpeech>
                  <strong>{item.partOfSpeech.join(", ")}</strong>
                  {" - "}
                  {item.partOfSpeech.map(tagToEnglish).join(", ")}
                </PartOfSpeech>
                {item.misc.length ? (
                  <Misc>({item.misc.map(tagToEnglish).join("; ")})</Misc>
                ) : (
                  ""
                )}
                {item.dialect.length ? (
                  <Dialect>
                    ({item.dialect.map(tagToEnglish).join("; ")})
                  </Dialect>
                ) : (
                  ""
                )}
                {item.info.length ? <Info>({item.info.join("; ")})</Info> : ""}
              </Item>
            );
          })
        : ""}
      {source === SOURCE_TYPE.jmnedict
        ? translation.map((item, index) => {
            return (
              <Item key={index}>
                {item.translation.map(transl => transl.text).join("; ")}
                <Type>{item.type.join("; ")}</Type>
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

export default DictionaryEntry;
