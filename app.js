import { wordList } from "./app2.js";

// console.log(wordList);

const imgHangman = document.querySelector(".hang img");
const wordEl = document.querySelector(".words");
const keypordEl = document.querySelector(".keybord");
const scoreEl = document.querySelector(".score .correct");
const hintEl = document.querySelector(".paragraph");
const modal = document.querySelector(".modal");
const btnModal = modal.querySelector(".play_again");

let currentWord;
let count = 0;
let maxCount = 6;
let rightLetters = [];

const resetGame = () => {
  count = 0;
  rightLetters = [];
  keypordEl.querySelectorAll("button").forEach((btn) => (btn.disabled = false));
  scoreEl.innerText = `${count} / ${maxCount}`;
  imgHangman.src = `imgs/images/hangman-${count}.svg`;
  wordEl.innerHTML = currentWord
    .split("")
    .map((letter) => ` <li class="letter"></li>`)
    .join("");
  modal.classList.remove("show");
};

const gameOver = (isVictory) => {
  const modalText = isVictory
    ? "You Found The Word: "
    : "The Word Searching Is: ";
  modal.querySelector(".content img").src = `imgs/images/${
    isVictory ? "victory" : "lost"
  }.gif`;
  modal.querySelector(".content h1").innerText = `${
    isVictory ? "Gongrat !" : "Game Over !"
  }`;
  modal.querySelector(
    ".content p"
  ).innerHTML = `<p>${modalText}: <b id="right_word">${currentWord}</b> </p>`;
  modal.classList.add("show");
};

const getRandomWord = () => {
  const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
  console.log(word);
  // console.log(hint);
  currentWord = word;
  hintEl.innerHTML = ` <span class="hint">Hint:</span> ${hint}`;
  resetGame();
};

const initGame = (btn, clickedLetter) => {
  //  console.log(btn, letter, currentWord);
  if (currentWord.includes(clickedLetter)) {
    [...currentWord].forEach((letter, index) => {
      if (letter === clickedLetter) {
        rightLetters.push(letter);
        wordEl.querySelectorAll("li")[index].innerText = letter;
        wordEl.querySelectorAll("li")[index].classList.add("guess");
      }
    });
  } else {
    count++;
  }

  btn.disabled = true;
  scoreEl.innerText = `${count} / ${maxCount}`;
  imgHangman.src = `imgs/images/hangman-${count}.svg`;

  if (count === maxCount) return gameOver(false);
  if (currentWord.length === rightLetters.length) return gameOver(true);
  // console.log(count, maxCount, currentWord, rightLetters)
};

getRandomWord();

for (let i = 97; i < 123; i++) {
  const btn = document.createElement("button");
  // console.log(String.fromCharCode(i));
  btn.innerText = String.fromCharCode(i);

  keypordEl.appendChild(btn);
  btn.addEventListener("click", (e) => {
    // console.log(e.target)
    initGame(e.target, String.fromCharCode(i));
  });
}

btnModal.addEventListener("click", getRandomWord);
