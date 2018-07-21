import gql from "graphql-tag";
import * as React from "react";
import { Mutation } from "react-apollo";
import Button from "./components/Button";
import Input from "./components/Input";

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

export default () => {
  let input: any;
  return (
    <Mutation<IData> mutation={UPDATE_KEY}>
      {(updateSearchKey, { data }) => (
        <div>
          <form
            onSubmit={e => {
              e.preventDefault();
              updateSearchKey({ variables: { text: input.value } });
            }}
          >
            <Input
              innerRef={node => {
                input = node;
              }}
              placeholder="漢字, かな, romaji or English..."
            />
            <Button type="submit">Search</Button>
          </form>
        </div>
      )}
    </Mutation>
  );
};
