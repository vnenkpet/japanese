import * as React from "react";
import KanjiDicInfo from "./KanjiDicInfo";
import styled from "./styled-components";

const Text = styled.div`
  font-size: 25px;
`;

const KanjiLink = styled.a`
  cursor: pointer;
  color: ${(props: { active: boolean }) => (props.active ? "orange" : "black")};
`;

interface IProps {
  kanji: [
    {
      text: string;
    }
  ];
  kana: [
    {
      text: string;
    }
  ];
}

export default class Kanji extends React.PureComponent<IProps, any> {
  constructor(props: IProps) {
    super(props);
    this.state = { kanji: null };
  }

  public render() {
    const { kanji, kana } = this.props;
    return (
      <React.Fragment>
        {this.state.kanji && <KanjiDicInfo kanji={this.state.kanji} />}
        <Text>
          {kanji.length ? (
            <ruby>
              {Array.from(kanji[0].text).map(char => {
                if (char.match(/[\u4e00-\u9faf\u3400-\u4dbf]/)) {
                  return (
                    <KanjiLink
                      active={this.state.kanji === char}
                      onClick={() => {
                        this.state.kanji !== char
                          ? this.setState({ kanji: char })
                          : this.setState({ kanji: null });
                      }}
                    >
                      {char}
                    </KanjiLink>
                  );
                }

                return char;
              })}
              <rt>{kana[0].text}</rt>
            </ruby>
          ) : (
            <span>{kana[0].text}</span>
          )}
        </Text>
      </React.Fragment>
    );
  }
}
