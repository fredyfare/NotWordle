import React, { useState, useEffect } from "react";

function Logo() {
  const logos = ["LIKEREACT", "WORLDWIDE", "NOTWORDLE"];
  const correctLogo = "NOTWORDLE";
  const [logoIndex, setLogoIndex] = useState(0);
  const [logoLetters, setLogoLetters] = useState(logos[0].split(""));

  useEffect(() => {
    const interval = setInterval(() => {
      setLogoIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        return nextIndex >= logos.length ? prevIndex : nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [logos.length]);

  useEffect(() => {
    setLogoLetters(logos[logoIndex].split(""));
  }, [logoIndex, logos]);

  const id = (letter, index) => {
    if (!correctLogo.includes(letter)) {
      return "error"; // Si la letra no está en el logo, se considera un error y se muestra en gris
    } else if (letter === correctLogo[index]) {
      return "correct"; // Si la letra está en el logo y en la posición correcta, se muestra en verde
    } else {
      return "almost"; // Si la letra está en el logo pero en la posición incorrecta, se muestra en amarillo
    }
  };

  return (
    <div className="logo-board">
      {logoLetters.map((letter, index) => {
        return (
          <div
            className="logo-letter"
            key={index}
            id={id(letter, index)}
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            {letter}
          </div>
        );
      })}
    </div>
  );
}

export default Logo;
