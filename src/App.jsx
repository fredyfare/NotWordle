import { useState, createContext } from "react";
import Board from "./components/Board/Board";
import Keyboard from "./components/Keyboard/Keyboard";
import { boardDefault } from "./utils/words";
import "./App.css";

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({attempt: 0, letterPos: 0});

  return (
    <div className="App">
      <nav>
        <h1>NotWordle</h1>
      </nav>
      <AppContext.Provider value={{ board, setBoard, currAttempt, setCurrAttempt }}>
        <div className="game">
          <Board />
          <Keyboard />
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
