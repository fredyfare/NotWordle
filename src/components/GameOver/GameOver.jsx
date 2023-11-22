import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { AppContext } from "../../App";
import { boardDefault, generateWordSet } from "../../utils/words";

function GameOver() {
  const {
    gameOver,
    currAttempt,
    correctWord,
    setCorrectWord,
    setBoard,
    setCurrAttempt,
    setGameOver,
  } = useContext(AppContext);

  const handleRestart = async () => {
    const words = await generateWordSet();
    setBoard([...boardDefault]);
    setCurrAttempt({ attempt: 0, letterPos: 0 });
    setGameOver({ gameOver: false, guessedWord: false });
    setCorrectWord(words.todaysWord);
  };

  return ReactDOM.createPortal(
    <>
      <div className="background" />
      <div className="overlay" />
      <div className="modal">
        <h3>
          {gameOver.guessedWord
            ? "YOU CORRECTLY GUESSED THE WORD"
            : "OH! YOU DIDN'T GUESSED THE WORD, GOOD LUCK NEXT TIME"}
        </h3>
        <h1>Correct: {correctWord}</h1>
        {gameOver.guessedWord ? (
          <h3>You guessed in {currAttempt.attempt} attempts</h3>
        ) : null}
        {/* <button className="restart-button" onClick={handleRestart}>
          Restart Game
        </button> */}
      </div>
    </>,
    document.getElementById("portal")
  );
}

export default GameOver;
