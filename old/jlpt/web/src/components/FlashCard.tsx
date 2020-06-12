import React from "react";
import { IVocabularyEntry, VocabularyEntryType } from "../services/vocabulary";
import { DisplayState } from "./FlashCardStateContainer";
import { Wrapper, Kanji, Furigana, Meaning, Jlpt } from "./styled/components";

interface Props {
  entry: IVocabularyEntry;
  state: DisplayState;
}

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
            {entry.meaning.replace(/,/g, ", ")}
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
            {entry.meaning.replace(/,/g, ", ")}
          </Meaning>
          <Jlpt show={state >= DisplayState.jlpt && !hide}>
            JLPT N{entry.jlpt}
          </Jlpt>
        </>
      )}
    </Wrapper>
  );
};
