import { Input } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { Formik } from "formik";
import gql from "graphql-tag";
import * as React from "react";
import { Mutation } from "react-apollo";
import styled from "./styled-components";
import history from "./utils/history";

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

const StyledTextField = styled(Input)`
  input {
    color: white;
  }
`;

export default class SearchBar extends React.PureComponent {
  constructor(props: object) {
    super(props);
  }

  public render() {
    return (
      <Mutation<IData> mutation={UPDATE_KEY}>
        {(updateSearchKey, { data }) => (
          <Formik
            onSubmit={({ searchKey }) => {
              updateSearchKey({ variables: { text: searchKey } });
              history.push(`/search/${searchKey}`);
            }}
            initialValues={{ searchKey: "" }}
            render={({ values, handleChange, handleBlur, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <StyledTextField
                  placeholder="漢字, かな, romaji or English..."
                  value={values.searchKey}
                  name="searchKey"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disableUnderline={true}
                />
                <Button color="inherit" type="submit">
                  Search
                </Button>
              </form>
            )}
          />
        )}
      </Mutation>
    );
  }
}
