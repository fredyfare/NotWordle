import React, { useContext, useEffect } from "react";
import { AppContext } from "../../App";

function Letter({ letterPos, attemptVal }) {
  const { board, correctWord, currAttempt, setDisabledLetters } =
    useContext(AppContext);

  const letter = board[attemptVal][letterPos];

  const correct = correctWord.toUpperCase()[letterPos] === letter;
  const almost =
    !correct && letter !== "" && correctWord.toUpperCase().includes(letter);

  const letterState =
    currAttempt.attempt > attemptVal &&
    (correct ? "correct" : almost ? "almost" : "error");

  useEffect(() => {
    if (letter !== "" && !correct && !almost) {
      setDisabledLetters((prev) => [...prev, letter]);
    }
  }, [currAttempt.attempt]);

  return (
    <div
      className="letter"
      id={letterState}
      style={{ animationDelay: `${attemptVal * 0.1 + letterPos * 0.1}s` }}
    >
      {letter}
    </div>
  );
}

export default Letter;
