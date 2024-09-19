const keyboard = document.querySelector(".keyboard");
const hint_text = document.querySelector(".hint b");
const secretWord = document.querySelector(".secretWord");
const img = document.querySelector(".img img");
const gameModal = document.querySelector(".game-modal");
const play_again = document.querySelector(".play-again");
let current_word, correct_letters, wrong;
const reset = () => {
  correct_letters = new Set();
  wrong = 0;
  img.src = `img/hangman-0.svg`;
  secretWord.innerHTML = current_word
    .split("")
    .map(
      (letter) =>
        `<li class="letter">${correct_letters.has(letter) ? letter : ""}</li>`
    )
    .join("");
  keyboard
    .querySelectorAll("button")
    .forEach((button) => (button.disabled = false));
  gameModal.classList.remove("show");
};
const game_over = (win) => {
  gameModal.querySelector("img").src = `img/${win ? "win" : "lose"}.gif`;
  gameModal.querySelector("h4").textContent = win ? "congrats" : "game over";
  gameModal.classList.add("show");
};
const clickletter = (button, clickedletter) => {
  if (current_word.includes(clickedletter)) {
    console.log(true);
    correct_letters.add(clickedletter);
  } else {
    console.log(false);
    wrong++;
    img.src = `img/hangman-${wrong}.svg`;
  }
  button.disabled = true;
  if (wrong === 6) {
    return game_over(false);
  }
  if (correct_letters.size === new Set(current_word.split("")).size) {
    return game_over(true);
  }
  secretWord.querySelectorAll(".letter").forEach((element, index) => {
    const letter = current_word[index];
    element.textContent = correct_letters.has(letter) ? letter : "";
  });
};
const create_keyboard = () => {
  for (let index = 97; index <= 122; index++) {
    const button = document.createElement("button");
    button.textContent = String.fromCharCode(index);
    keyboard.appendChild(button);
    button.addEventListener("click", (event) =>
      clickletter(event.target, String.fromCharCode(index))
    );
  }
};
create_keyboard();
const random_word = () => {
  const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
  current_word = word;
  hint_text.textContent = hint;
  reset();
};
random_word();
play_again.addEventListener("click", random_word);
