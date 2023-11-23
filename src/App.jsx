import React, { useState, createContext, useEffect } from "react";
import Board from "./components/Board/Board";
import Keyboard from "./components/Keyboard/Keyboard";
import GameOver from "./components/GameOver/GameOver";
import Logo from "./components/Logo/Logo";
import { boardDefault } from "./utils/words";
import { generateWordSet } from "./utils/words";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letterPos: 0 });
  const [wordSet, setWordSet] = useState(new Set());
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [correctLetters, setCorrectLetters] = useState([]); // keyboard correct letters
  const [almostLetters, setAlmostLetters] = useState([]); // keyboard almost letters
  const [correctWord, setCorrectWord] = useState("");
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  });
  const [isNewGame, setIsNewGame] = useState(false);
  const [isAnimationInProgress, setIsAnimationInProgress] = useState(false);

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord);
      // setCorrectWord("REACT");
    });
  }, []);

  useEffect(() => {
    if (gameOver.gameOver) {
      const timer = setTimeout(() => {
        setGameOver({ ...gameOver, renderGameOver: true });
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [gameOver.gameOver]);

  const onSelectLetter = (keyVal) => {
    if (currAttempt.letterPos > 4) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos + 1 });
  };

  const onDelete = () => {
    if (currAttempt.letterPos === 0) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = "";
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos - 1 });
  };

  const onEnter = () => {
    let currWord = "";
    if (currAttempt.letterPos !== 5) {
      // toast("Word not in the list", {
      //   position: "top-center",
      //   autoClose: 2000,
      //   hideProgressBar: true,
      //   closeOnClick: true,
      //   pauseOnHover: false,
      //   draggable: false,
      //   progress: undefined,
      //   theme: "dark",
      //   toastId: "1",
      //   transition: Slide,
      //   style: {
      //     background: "#757575",
      //     userSelect: "none",
      //   },
      // });
      return;
    }

    for (let i = 0; i < 5; i++) {
      currWord += board[currAttempt.attempt][i];
    }

    if (wordSet.has(currWord.toLowerCase())) {
      setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 });
      setIsAnimationInProgress(true);
      setTimeout(() => {
        setIsAnimationInProgress(false);
      }, 1000);
    } else {
      toast("Word not in the list", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
        toastId: "1",
        transition: Slide,
        style: {
          background: "#757575",
          userSelect: "none",
        },
      });
    }

    if (currWord === correctWord) {
      toast(correctWord, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
        toastId: "2",
        transition: Slide,
        style: {
          background: "#43a047",
          userSelect: "none",
        },
      });
      setGameOver({ gameOver: true, guessedWord: true });
      setIsAnimationInProgress(true);
      setTimeout(() => {
        setIsAnimationInProgress(false);
      }, 1000);
      return;
    }

    if (currAttempt.attempt === 5 && wordSet.has(currWord.toLowerCase())) {
      toast(correctWord, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
        toastId: "3",
        transition: Slide,
        style: {
          background: "#757575",
          userSelect: "none",
        },
      });
      setIsAnimationInProgress(true);
      setTimeout(() => {
        setIsAnimationInProgress(false);
      }, 1000);
      setGameOver({ gameOver: true, guessedWord: false });
    }
  };

  const handleRestart = async () => {
    const words = await generateWordSet();
    setIsNewGame(true);

    setTimeout(() => {
      setDisabledLetters([]);
      setAlmostLetters([]);
      setCorrectLetters([]);
      setCurrAttempt({ attempt: 0, letterPos: 0 });
      setGameOver({ gameOver: false, guessedWord: false });
      setCorrectWord(words.todaysWord);
    }, 0);
  };

  return (
    <div className="App">
      <nav>
        <Logo />
      </nav>
      <AppContext.Provider
        value={{
          board,
          setBoard,
          currAttempt,
          setCurrAttempt,
          onSelectLetter,
          onDelete,
          onEnter,
          correctWord,
          disabledLetters,
          setDisabledLetters,
          correctLetters,
          setCorrectLetters,
          almostLetters,
          setAlmostLetters,
          gameOver,
          setGameOver,
          setCorrectWord,
          isNewGame,
          setIsNewGame,
          isAnimationInProgress,
        }}
      >
        <div className="game">
          <Board />
          {!toast.isActive() ? <ToastContainer newestOnTop /> : null}
          <Keyboard />
          {gameOver.renderGameOver && (
            <GameOver handleRestart={handleRestart} />
          )}
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
