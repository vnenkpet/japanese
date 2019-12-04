import React from "react";
import { IVocabularyEntry, VocabularyEntryType } from "../services/vocabulary";
import { DisplayState } from "./FlashCardsContainer";
import styled from "styled-components";

interface Props {
  entry: IVocabularyEntry;
  state: DisplayState;
}

interface ShowableProps {
  show?: boolean;
}

const Wrapper = styled.div<ShowableProps>`
  transition: opacity 1s;
  opacity: ${props => (props.show ? 1 : 0)};
`;

const Kanji = styled.div<ShowableProps>`
  font-size: 1.5em;
  transition: opacity 1s;
  opacity: ${props => (props.show ? 1 : 0)};
`;

const Furigana = styled.rt<ShowableProps>`
  font-size: 0.7em;
  transition: opacity 1s;
  opacity: ${props => (props.show ? 1 : 0)};
`;

const Meaning = styled.div<ShowableProps>`
  font-size: 0.7em;
  margin-bottom: 20px;
  transition: opacity 1s;
  opacity: ${props => (props.show ? 1 : 0)};
`;

const Jlpt = styled.div<ShowableProps>`
  font-size: 0.5em;
  transition: opacity 1s;
  opacity: ${props => (props.show ? 1 : 0)};
`;

export const FlashCard: React.FC<Props> = ({ entry, state }) => {
  const hide = state === DisplayState.init || state === DisplayState.hide;
  return (
    <Wrapper show={!hide}>
      {entry.type === VocabularyEntryType.Kanji && (
        <>
          <Kanji show={!hide}>
            <ruby>
              {entry.kanji}
              <Furigana show={state >= DisplayState.kana && !hide}>
                {entry.kana}
              </Furigana>
            </ruby>
          </Kanji>
          <Meaning show={state >= DisplayState.meaning && !hide}>
            {entry.meaning}
          </Meaning>
          <Jlpt show={state >= DisplayState.jlpt && !hide}>
            JLPT N{entry.jlpt}
          </Jlpt>
        </>
      )}

      {entry.type === VocabularyEntryType.NoKanji && (
        <>
          <Kanji show={state >= DisplayState.kana && !hide}>{entry.kana}</Kanji>
          <Meaning show={state >= DisplayState.meaning && !hide}>
            {entry.meaning}
          </Meaning>
          <Jlpt show={state >= DisplayState.meaning && !hide}>
            JLPT N{entry.jlpt}
          </Jlpt>
        </>
      )}
    </Wrapper>
  );
};
