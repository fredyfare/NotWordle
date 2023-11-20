// GameOver.js

import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { AppContext } from "../../App";

function GameOver() {
  const { gameOver, currAttempt, correctWord } = useContext(AppContext);

  const MODAL_STYLES = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "#f6f6f6",
    padding: "50px",
    border: "2px solid #e3e3e3",
    borderRadius: "4px",
    zIndex: 1000, // Asegúrate de un zIndex superior al del fondo semi-transparente
  };

  const OVERLAY_STYLES = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0, 0, 0, 0.5)", // Fondo semitransparente
    zIndex: 999, // Un zIndex inferior al del modal
  };

  const BACKGROUND_STYLES = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.5)", // Fondo semi-transparente
    filter: "blur(3px)", // Efecto de desenfoque opcional
    pointerEvents: "none", // Evita interacciones con elementos detrás del modal
    zIndex: 998, // Un zIndex entre el del modal y el overlay
  };

  return ReactDOM.createPortal(
    <>
      <div style={BACKGROUND_STYLES} />
      <div style={OVERLAY_STYLES} />
      <div className="gameOver" style={MODAL_STYLES}>
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
    </>,
    document.getElementById("portal")
  );
}

export default GameOver;
