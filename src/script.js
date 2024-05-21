const countToDate = new Date().setHours(new Date().getHours() + 24);
let previousTimeBetweenDates;
let time = 0;
let started = false;
let stoped = false;
let startedPomodoro = false;
let studyTime = 0;
let isRest = false;

import { StartRest } from "./components/Rest/scriptRest";

export function Start() {
  started = true;
  console.log("Start");
}

export function StartPomodoro(time) {
  startedPomodoro = true;
  studyTime = time;
  console.log("Start Pomodoro");
}

export function Stop() {
  started = false;
  console.log("Stop");
}

export function Reset() {
  time = 0;
  flipAllCards(time);
  started = false;

  console.log("Reset");
}

setInterval(() => {
  if (started) {
    if (!stoped) {
      time++;
      flipAllCards(time);
    }
  }

  if (startedPomodoro) {
    if (!stoped && studyTime > 0) {
      studyTime--;
      flipAllCards(studyTime);
    } else {
      if (studyTime == 0 && !isRest) {
        StartRest(1200);
        isRest = true;
        console.log("Start Rest");
      }
    }
  }
}, 1000);

function flipAllCards(time) {
  const seconds = time % 60;
  const minutes = Math.floor(time / 60) % 60;
  const hours = Math.floor(time / 3600);

  flip(document.querySelector("[data-hours-tens]"), Math.floor(hours / 10));
  flip(document.querySelector("[data-hours-ones]"), hours % 10);
  flip(document.querySelector("[data-minutes-tens]"), Math.floor(minutes / 10));
  flip(document.querySelector("[data-minutes-ones]"), minutes % 10);
  flip(document.querySelector("[data-seconds-tens]"), Math.floor(seconds / 10));
  flip(document.querySelector("[data-seconds-ones]"), seconds % 10);
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
