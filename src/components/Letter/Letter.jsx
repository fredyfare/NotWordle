import React, { useContext, useEffect } from "react";
import { AppContext } from "../../App";

function Letter({ letterPos, attemptVal }) {
  const {
    board,
    correctWord,
    currAttempt,
    setDisabledLetters,
    setAlmostLetters,
    setCorrectLetters,
  } = useContext(AppContext);

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
    } else if (letterState === "almost") {
      setAlmostLetters((prev) => [...prev, letter]);
    } else if (letterState === "correct") {
      setCorrectLetters((prev) => [...prev, letter]);
    }
  }, [currAttempt.attempt]);

  let animationDel;
  if (letter !== "") {
    animationDel = letterPos * 0.2; //flip delay animation
  } else {
    animationDel = attemptVal * 0.1 + letterPos * 0.1; //bounce delaya animation
  }

  return (
    <div
      className="letter l"
      id={letterState}
      style={{ animationDelay: `${animationDel}s` }}
    >
      {letter}
    </div>
  );
}

export default Letter;
