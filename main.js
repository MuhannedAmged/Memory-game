const cards = document.querySelectorAll(".card");
let cardType = "";
let cardNumberActive = 0;

function win() {
  let numberCardMacth = 0;
  cards.forEach((card) => {
    if (card.classList.contains("match")) {
      numberCardMacth++;
    }
  });
  if (numberCardMacth === cards.length) {
    setTimeout(() => {
      alert("Congratulations, you won!");
    }, 200);
  }
  console.log("points:", numberCardMacth, cards.length);
}

function shuffleList() {
  const container = document.querySelector(".container");
  const cards = Array.from(container.querySelectorAll(".card"));
  cards.sort(() => Math.random() - 0.5);
  cards.forEach((card) => container.appendChild(card));
}

function replay() {
  cards.forEach((card) => {
    card.classList.remove("active");
    card.classList.remove("match");
  });
  cardNumberActive = 0;
  cardType = "";
  setTimeout(() => {
    shuffleList();
  }, 200);
}

shuffleList();

// function clickCard(card) {
//   if (card.classList.contains("match") || card.classList.contains("active")) {
//     return;
//   }
//   if (cardNumberActive < 2) {
//     card.classList.add("active");
//     cardNumberActive++;
//   }
// };

cards.forEach(function (card) {
  card.addEventListener("click", () => {
    if (card.classList.contains("match") || card.classList.contains("active")) {
      return;
    }
    if (cardNumberActive < 2) {
      card.classList.add("active");
      cardNumberActive++;
    }
    if (cardType === "") {
      cardType = card.getAttribute("type");
      return;
    } else {
      if (cardType == card.getAttribute("type") && cardNumberActive >= 2) {
        document.querySelectorAll(".active").forEach((card) => {
          if (card.getAttribute("type") == cardType) {
            card.classList.add("match");
            return;
          }
        });
      } else {
        setTimeout(function () {
          cards.forEach(function (card) {
            if (card.classList.contains("match")) {
              return;
            }
            card.classList.remove("active");
          });
        }, 300);
      }
      cardType = "";
      if (cardNumberActive == 2) {
        setTimeout(() => {
          cardNumberActive = 0;
        }, 350);
      }
      win();
    }
  });
});
