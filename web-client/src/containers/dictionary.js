import React from "react";
import { connect } from "react-redux";
import { search, startLoading, reset } from "../actions/dictionary";

import gql from "graphql-tag";
import { Query } from "react-apollo";

const GET_ENTRIES = gql`
  query search($searchKey: String!) {
    entries: searchJmdictEntries(key: $searchKey, limit: 10) {
      kanji {
        text
      }
      kana {
        text
      }
      sense {
        gloss {
          text
        }
      }
    }
    names: searchJmnedictEntries(key: $searchKey, limit: 10) {
      kanji {
        text
      }
      kana {
        text
      }
      translation {
        translation {
          text
        }
      }
    }
  }
`;

let timer = null;

const Component = ({
  items,
  searchKey,
  isLoading,
  search,
  startLoading,
  reset
}) => (
  <div className="dictionary_wrapper">
    <input
      className="dictionary_search_bar"
      onKeyUp={evt => {
        startLoading();
        clearTimeout(timer);
        const key = evt.target.value;
        timer = setTimeout(() => {
          key ? search(key) : reset();
        }, 250);
      }}
      placeholder="search..."
    />
    <Query query={GET_ENTRIES} variables={{ searchKey }}>
      {({ loading, error, data }) => {
        if (loading)
          return <div className="dictionary_loading">Loading...</div>;
        if (error)
          return (
            <div className="dictionary_error">Error! ${error.message}</div>
          );

        return (
          <div className="dictionary_results_wrapper">
            <div className="dictionary_results_jmdict">
              {data.entries.map(entry => (
                <div className="dictionary_results_row">
                  {entry.kanji.length ? (
                    <div>
                      <div className="dictionary_results_kana">
                        {entry.kana[0].text}
                      </div>
                      <div className="dictionary_results_kanji">
                        {entry.kanji[0].text}
                      </div>
                    </div>
                  ) : (
                    <div className="dictionary_results_kanji">
                      {entry.kana[0].text}
                    </div>
                  )}
                  <div className="dictionary_results_sense">
                    {entry.sense.map(s => {
                      return (
                        <div className="dictionary_results_gloss">
                          • {s.gloss.map(gloss => gloss.text).join("; ")}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            <div className="dictionary_results_jmnedict">
              {data.names.map(entry => (
                <div className="dictionary_results_row">
                  {entry.kanji.length ? (
                    <div>
                      <div className="dictionary_results_kana">
                        {entry.kana[0].text}
                      </div>
                      <div className="dictionary_results_kanji">
                        {entry.kanji[0].text}
                      </div>
                    </div>
                  ) : (
                    <div className="dictionary_results_kanji">
                      {entry.kana[0].text}
                    </div>
                  )}{" "}
                  <div className="dictionary_results_sense">
                    {entry.translation.map(s => {
                      return (
                        <div className="dictionary_results_gloss">
                          • {s.translation.map(gloss => gloss.text).join("; ")}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }}
    </Query>
  </div>
);

const mapStateToProps = ({ dictionary }, ownProps) => {
  return {
    items: dictionary.items,
    searchKey: dictionary.key,
    isLoading: dictionary.isLoading
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    search: key => {
      dispatch(search(key));
    },
    startLoading: () => {
      dispatch(startLoading());
    },
    reset: () => {
      dispatch(reset());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
