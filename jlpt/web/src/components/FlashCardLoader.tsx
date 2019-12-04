import React, { useState, useEffect } from "react";
import { IVocabularyEntry, vocabularyService } from "../services/vocabulary";
import { FlashCardsContainer } from "./FlashCardsContainer";

export const FlashCardLoader: React.FC<{}> = () => {
  const [entry, setEntry] = useState<IVocabularyEntry>();

  useEffect(() => {
    async function updateFlashCard() {
      setEntry(await vocabularyService.findRandomEntry());
    }

    if (!entry) {
      updateFlashCard();
    }
  }, [entry]);

  return (
    <>
      {entry && (
        <FlashCardsContainer
          key={entry.id}
          entry={entry}
          loadRandomEntry={() => {
            async function updateFlashCard() {
              setEntry(await vocabularyService.findRandomEntry());
            }
            updateFlashCard();
          }}
        />
      )}
    </>
  );
};
