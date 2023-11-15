import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";

function Letter({ letterPos, attemptVal }) {
  const { board, correctWord, currAttempt, setDisabledLetters } =
    useContext(AppContext);

  const letter = board[attemptVal][letterPos];

  const [animationDelay, setAnimationDelay] = useState(0); // Estado para el retraso de la animación

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

    // Calcula el retraso basado en la posición y el intento
    const delay = letterPos * 0.1 + attemptVal * 0.1;
    setAnimationDelay(delay);
  }, [currAttempt.attempt]);

  return (
    <div
      className="letter"
      id={letterState}
      style={{ animationDelay: `${animationDelay}s` }}
    >
      {letter}
    </div>
  );
}

export default Letter;
