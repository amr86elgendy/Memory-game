/** @format */

document
  .querySelector(".control-buttons span")
  .addEventListener("click", function () {
    let name = prompt("What's Your Name ?");
    document.querySelector(".control-buttons").remove();
    if (name == "" || name == null) {
      document.querySelector(".name span").innerHTML = "Unknown";
    } else {
      document.querySelector(".name span").innerHTML = name;
    }
  });

const cards = document.querySelectorAll(".memory-card");
let hasFlippedCard = false,
  lockBoard = false,
  firstCard,
  secondCard;

(function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * cards.length);
    card.style.order = randomPos;
  });
})();

cards.forEach((card) => card.addEventListener("click", flipCard));

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");
  //First Click
  if (hasFlippedCard === false || !hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }
  //Second Click
  hasFlippedCard = false;
  secondCard = this;

  checkForMatch();
}
function checkForMatch() {
  if (firstCard.dataset.icon === secondCard.dataset.icon) {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    resetBoard();
  } else {
    lockBoard = true;
    document.querySelector(".tries span").innerHTML =
      parseInt(document.querySelector(".tries span").innerHTML) + 1;
    setTimeout(() => {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");

      resetBoard();
    }, 1500);
  }
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}
