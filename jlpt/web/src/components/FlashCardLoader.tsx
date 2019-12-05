import React, { useState, useEffect } from "react";
import { IVocabularyEntry, vocabularyService } from "../services/vocabulary";
import { FlashCardStateContainer } from "./FlashCardStateContainer";

export const FlashCardLoader: React.FC<{}> = () => {
  const [entries, setEntries] = useState<IVocabularyEntry[]>();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const loadFlashcardsSet = async () => {
    const entries = await Promise.all(
      [1, 2, 3, 4].map(() => vocabularyService.findRandomEntry())
    );
    console.log(
      `Loaded new set of ${entries.length} entries: ${entries!
        .map(entry => entry.kanji || entry.kana)
        .join(", ")}`
    );

    setEntries(entries.concat(entries)); // show list of 3 entries three times to enforce memorization
    setSelectedIndex(0);
  };

  useEffect(() => {
    !entries && loadFlashcardsSet();
  }, [entries, selectedIndex]);

  return (
    <>
      {entries && entries.length && (
        <FlashCardStateContainer
          key={entries[selectedIndex].id}
          entry={entries[selectedIndex]}
          selectNext={() => {
            selectedIndex === entries.length - 1
              ? loadFlashcardsSet()
              : setSelectedIndex(selectedIndex + 1);
          }}
        />
      )}
    </>
  );
};
