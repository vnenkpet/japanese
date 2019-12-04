import React from "react";
import "./App.css";
import { FlashCardLoader } from "./components/FlashCardLoader";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <FlashCardLoader />
      </header>
    </div>
  );
};

export default App;
