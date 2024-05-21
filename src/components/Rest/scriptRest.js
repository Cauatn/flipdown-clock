let stoped = false;
let rest = false;
let timeRest = 0;
let studyTime = 0;

export function StartRest(time) {
  rest = true;
  timeRest = time;
  console.log("Start Rest");
}

export function Stop() {
  rest = false;
  console.log("Stop");
}

export function Reset() {
  timeRest = 0;
  flipAllCards(timeRest);
  rest = false;
  console.log("Reset");
}

setInterval(() => {
  if (rest) {
    if (!stoped && timeRest > 0) {
      timeRest--;
      flipAllCards(timeRest);
    }
  }
}, 1000);

function flipAllCards(time) {
  const seconds = time % 60;
  const minutes = Math.floor(time / 60) % 60;
  const hours = Math.floor(time / 3600);

  flip(
    document.querySelector("[data-hours-tens-rest]"),
    Math.floor(hours / 10)
  );
  flip(document.querySelector("[data-hours-ones-rest]"), hours % 10);
  flip(
    document.querySelector("[data-minutes-tens-rest]"),
    Math.floor(minutes / 10)
  );
  flip(document.querySelector("[data-minutes-ones-rest]"), minutes % 10);
  flip(
    document.querySelector("[data-seconds-tens-rest]"),
    Math.floor(seconds / 10)
  );
  flip(document.querySelector("[data-seconds-ones-rest]"), seconds % 10);
}

function flip(flipCard, newNumber) {
  const topHalf = flipCard.querySelector(".top");
  const startNumber = parseInt(topHalf.textContent);
  if (newNumber === startNumber) return;

  const bottomHalf = flipCard.querySelector(".bottom");
  const topFlip = document.createElement("div");
  topFlip.classList.add("top-flip");
  const bottomFlip = document.createElement("div");
  bottomFlip.classList.add("bottom-flip");

  top.textContent = startNumber;
  bottomHalf.textContent = startNumber;
  topFlip.textContent = startNumber;
  bottomFlip.textContent = newNumber;

  topFlip.addEventListener("animationstart", (e) => {
    topHalf.textContent = newNumber;
  });
  topFlip.addEventListener("animationend", (e) => {
    topFlip.remove();
  });
  bottomFlip.addEventListener("animationend", (e) => {
    bottomHalf.textContent = newNumber;
    bottomFlip.remove();
  });
  flipCard.append(topFlip, bottomFlip);
}
