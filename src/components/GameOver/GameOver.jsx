import React, { useContext } from "react";
import { AppContext } from "../../App";

function GameOver() {
  const { gameOver, currAttempt, correctWord } = useContext(AppContext);

  return (
    <div className="gameOver">
      <h3>
        {gameOver.guessedWord
          ? "YOU CORRECTLY GUESSED THE WORD"
          : "OH! YOU DIDN'T GUESSED THE WORD, GOOD LUCK NEXT TIME"}
      </h3>
      <h1>Correct: {correctWord}</h1>
      {gameOver.guessedWord ? (
        <h3>You guessed in {currAttempt.attempt} attempts</h3>
      ) : null}
    </div>
  );
}

export default GameOver;
