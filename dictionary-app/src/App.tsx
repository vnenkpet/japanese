import * as React from "react";
import SearchResults from "./SearchResults";

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <div>
          <input placeholder="漢字, かな, romaji or English..." />
        </div>
        <SearchResults searchKey="train" />
      </div>
    );
  }
}

export default App;
