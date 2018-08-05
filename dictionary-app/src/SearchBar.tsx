import { Input } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { Formik } from "formik";
import gql from "graphql-tag";
import * as React from "react";
import { Mutation } from "react-apollo";
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

const StyledTextField = styled(Input)`
  input { 
    color: white; 
  }
`

export default class SearchBar extends React.Component {
  constructor(props: object) {
    super(props);
  }

  public render() {
    return (
      <Mutation<IData> mutation={UPDATE_KEY}>
        {(updateSearchKey, { data }) => (
          <Formik 
            onSubmit={(values) => updateSearchKey({variables: {text: values.searchKey}})} 
            initialValues={{ searchKey: "" }} 
            render={({values, handleChange, handleBlur, handleSubmit}) => (
              <form onSubmit={handleSubmit}>
                <StyledTextField 
                  placeholder="漢字, かな, romaji or English..."
                  value={values.searchKey}
                  name="searchKey"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disableUnderline={true}
                />
                <Button color="inherit" type="submit">Search</Button>
              </form>
            )}
          />
        )}
      </Mutation>
    );
  }
}
