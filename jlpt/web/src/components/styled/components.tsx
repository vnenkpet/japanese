import styled from "styled-components";

interface ShowableProps {
  show?: boolean;
}

export const Wrapper = styled.div<ShowableProps>`
  transition: opacity 1s;
  opacity: ${props => (props.show ? 1 : 0)};
`;

export const Kanji = styled.div<ShowableProps>`
  font-size: 1.5em;
  transition: opacity 1s;
  opacity: ${props => (props.show ? 1 : 0)};
`;

export const Furigana = styled.rt<ShowableProps>`
  font-size: 0.7em;
  transition: opacity 1s;
  opacity: ${props => (props.show ? 1 : 0)};
`;

export const Meaning = styled.div<ShowableProps>`
  font-size: 0.7em;
  margin-bottom: 20px;
  transition: opacity 1s;
  opacity: ${props => (props.show ? 1 : 0)};
`;

export const Jlpt = styled.div<ShowableProps>`
  font-size: 0.5em;
  transition: opacity 1s;
  opacity: ${props => (props.show ? 1 : 0)};
`;
