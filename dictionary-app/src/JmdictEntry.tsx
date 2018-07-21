import * as React from "react";
import IJmdictEntry from "./schema/IJmdictEntry";

export default ({ kana, kanji, sense }: IJmdictEntry) => (
  <div>
    <div>
      {kanji.length ? `${kanji[0].text} (${kana[0].text})` : kana[0].text}
    </div>
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
  </div>
);
