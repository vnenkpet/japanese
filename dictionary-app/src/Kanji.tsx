import Paper from "@material-ui/core/Paper";
import Popover from "@material-ui/core/Popover";
import * as React from "react";
import KanjiDicInfo from "./KanjiDicInfo";
import styled from "./styled-components";

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
}

interface IState {
  kanji: string;
  anchorEl: any;
}

export default class Kanji extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { kanji: null, anchorEl: null };
  }

  public render() {
    const { kanji, kana } = this.props;
    const { anchorEl } = this.state;
    return (
      <React.Fragment>
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
          {kanji.length ? (
            <ruby>
              {Array.from(kanji[0].text).map(char => {
                if (char.match(/[\u4e00-\u9faf\u3400-\u4dbf]/)) {
                  return (
                    <KanjiLink
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
      </React.Fragment>
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
    this.state.kanji !== char
      ? this.setState({
          anchorEl: currentTarget,
          kanji: char
        })
      : this.setState({
          anchorEl: currentTarget,
          kanji: null
        });
  }
}
