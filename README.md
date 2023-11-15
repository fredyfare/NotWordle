<div align="center">
  <img src="/IMAGES/NotWordle.png" alt="NotWordle Image">
</div>

# Wordle Clone in React

This project was made following the [Build a Wordle Clone in REACTJS](https://www.youtube.com/watch?v=WDTNwmXUz2c) tutorial by [PedroTech](https://github.com/machadop1407) and deployed on Vercel <img src="/IMAGES/Vercel-Dark.svg" width=16 alt="Vercel Icon">. Go take a look of it: [NotWordle](https://not-wordle-navy.vercel.app/) <img src="/public/favicon.ico" width=16 alt="W Icon">.

### Things that you can learn with this tutorial:

- useEffect hook
- useContext hook
- useCallback hook
- Conditional rendering
- Matrix rendering

### Bugs fixed within this tutorial: 

Here are the bugs that I encountered while following the tutorial:

- Letters that are on the word, but not in the right position were not being displayed in yellow. (Changed to uppercase the correct word in almost const of the Letter.jsx file)
  
  **Before**
  ``` javascript
   const almost =
    !correct && letter !== "" && correctWord.includes(letter);
  ```
  **After**
  ``` javascript
   const almost =
    !correct && letter !== "" && correctWord.toUpperCase().includes(letter);
  ``` 
- GameOver component not being displayed when you guessed the correct word in any attempt. (Changed the todaysWord from words.js file to uppercas)

    **Before**
  ``` javascript
   todaysWord = wordArray[Math.floor(Math.random() * wordArray.length)];
  ```
  **After**
  ``` javascript
   todaysWord = wordArray[Math.floor(Math.random() * wordArray.length)].toUpperCase();
  ```
- If the word that you entered is not a word, but it is the sixth attempt, it stills count as an attempt and the game over is triggered. (Not fixed yet)

  **In the next images you can see the bugs thah where mentioned before**
