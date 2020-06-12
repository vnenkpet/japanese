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

export const FlashCardStateContainer: React.FC<{
  entry: any;
  selectNext: () => void;
}> = ({ entry, selectNext }) => {
  // component initialization
  const [state, setState] = useState<DisplayState>(DisplayState.init);
  const updateState = () => {
    state + 1 > 5 ? selectNext() : setState(state + 1);
  };
  const interval = state > 0 && state < 5 ? 3000 : 300;

  useEffect(() => {
    async function updateFlashCard() {
      setTimeout(updateState, interval);
    }

    updateFlashCard();
  });

  return (
    <>{entry && <FlashCard key={entry.id} entry={entry} state={state} />}</>
  );
};
