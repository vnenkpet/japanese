import Paper from "@material-ui/core/Paper";
import Popover from "@material-ui/core/Popover";
import * as React from "react";
import styled from "../../../../../styled-components";
import KanjiDicInfo from "./KanjiDicInfo";

const Text = styled.div`
  font-size: 25px;
`;

const KanjiLink = styled.a`
  cursor: pointer;
  color: ${(props: { active: boolean }) =>
    props.active ? "#ff6200" : "black"};
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
  usuallyKana: boolean;
}

interface IState {
  kanji: string;
  anchorEl: any;
}

export default class Kanji extends React.PureComponent<IProps, IState> {
  public state: Readonly<IState> = {
    anchorEl: null,
    kanji: null
  };

  public render() {
    const { kanji, kana, usuallyKana } = this.props;
    const { anchorEl } = this.state;

    return (
      <>
        {this.state.kanji && (
          <Popover
            open={true}
            anchorEl={anchorEl}
            onClose={this.handleClose}
            anchorOrigin={{
              horizontal: "center",
              vertical: "bottom"
            }}
            transformOrigin={{
              horizontal: "center",
              vertical: "top"
            }}
          >
            <Paper>
              <KanjiDicInfo kanji={this.state.kanji} />
            </Paper>
          </Popover>
        )}
        <Text>
          {kanji.length && !usuallyKana ? (
            <ruby>
              {Array.from(kanji[0].text).map((char, index) => {
                if (char.match(/[\u4e00-\u9faf\u3400-\u4dbf]/)) {
                  return (
                    <KanjiLink
                      key={index}
                      active={this.state.kanji === char}
                      onClick={this.handleClick.bind(this, char)}
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
      </>
    );
  }

  private handleClose = () => {
    this.setState({
      anchorEl: null,
      kanji: null
    });
  };

  private handleClick(char: string, e: Event) {
    const { currentTarget } = e;
    this.setState({
      anchorEl: currentTarget,
      kanji: this.state.kanji !== char ? char : null
    });
  }
}
