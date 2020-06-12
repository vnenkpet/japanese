import { Input } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { Formik } from "formik";
import * as React from "react";
import { RouterProps } from "react-router";
import { RouteComponentProps, withRouter } from "react-router-dom";
import styled from "../../../../styled-components";

const StyledTextField = styled(Input)`
  input {
    color: white;
  }
`;

class SearchBar extends React.PureComponent<
  RouteComponentProps<{ searchKey: string }> & RouterProps
> {
  public render() {
    const {
      history,
      match: {
        params: { searchKey }
      }
    } = this.props;
    return (
      <Formik
        onSubmit={({ searchKey: search }) => {
          history.push(`/search/${encodeURIComponent(search)}`);
        }}
        initialValues={{ searchKey }}
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
    );
  }
}

export default withRouter(SearchBar);
