import gql from "graphql-tag";
import * as React from "react";
import { Mutation } from "react-apollo";
import Button from "./components/Button";
import Input from "./components/Input";
import styled from "./styled-components";

interface IData {
  updateSearchKey: {
    text: string;
  };
}

const UPDATE_KEY = gql`
  mutation updateSearchKey($text: String) {
    updateSearchKey(text: $text) @client {
      text
    }
  }
`;

const Help = styled.div`
  font-size: 12px;
  opacity: 0.8;
`;

const Pre = styled.span`
  font-size: 12px;
  opacity: 1;
  font-family: monospace;
  background: #00000018;
  border-radius: 4px;
  padding: 1px;
`;

export default class SearchBar extends React.Component {
  private input: any;

  constructor(props: object) {
    super(props);
  }

  public render() {
    return (
      <Mutation<IData> mutation={UPDATE_KEY}>
        {(updateSearchKey, { data }) => (
          <div>
            <form
              onSubmit={e => {
                e.preventDefault();
                updateSearchKey({ variables: { text: this.input.value } });
              }}
            >
              <Input
                innerRef={node => {
                  this.input = node;
                }}
                placeholder="漢字, かな, romaji or English..."
              />
              <Button type="submit">Search</Button>
            </form>
            <Help>
              <strong>* Tip</strong>: you can use JS-style regex. Try{" "}
              <Pre>/^電.+$/</Pre> to get words beginning with "電" (note that
              regex search is very slow).
            </Help>
          </div>
        )}
      </Mutation>
    );
  }
}
