import React, { useState, useEffect } from "react";
import { FlashCard } from "./FlashCard";

export enum DisplayState {
  init,
  kanji,
  kana,
  meaning,
  jlpt,
  hide
}

export const FlashCardsContainer: React.FC<{
  entry: any;
  loadRandomEntry: () => void;
}> = ({ entry, loadRandomEntry }) => {
  const [state, setState] = useState<DisplayState>(DisplayState.init);

  useEffect(() => {
    async function updateFlashCard() {
      setTimeout(
        async () => {
          let nextState = state + 1;

          if (nextState > 5) {
            nextState = 0;
            loadRandomEntry();
          } else {
            console.log(`setting state ${state}`);
            setState(nextState);
          }
        },
        state > 0 ? 5000 : 1000
      );
    }

    updateFlashCard();
  });

  return (
    <>{entry && <FlashCard key={entry.id} entry={entry} state={state} />}</>
  );
};
