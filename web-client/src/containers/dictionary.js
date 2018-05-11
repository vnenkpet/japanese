import React from "react";
import { connect } from "react-redux";
import { search, startLoading, reset } from "../actions/dictionary";

let timer = null;

const Component = ({ items, searchKey, isLoading, search, startLoading, reset }) => (
  <div>
    <input
      onKeyUp={evt => {
        startLoading();
        clearTimeout(timer);
        const key = evt.target.value;
        timer = setTimeout(() => {
          key ? search(key) : reset();
        }, 250);
      }}
    />
    {isLoading ? 
      <div>Loading</div>
     : (
      <div>
        {items.map(item => (
          <div key={item.id}>
            {item.kanji} ({item.kana}) {item.meaning}
          </div>
        ))}
      </div>
    )}
  </div>
);

const mapStateToProps = ({ dictionary }, ownProps) => {
  return {
    items: dictionary.items,
    searchKey: dictionary.key,
    isLoading: dictionary.isLoading,
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

export default connect(mapStateToProps, mapDispatchToProps)(Component);
