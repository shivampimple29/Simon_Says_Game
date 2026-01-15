let userSeq = [];
let gameSeq = [];
let highScore = 0;

let btns = ["red", "cyan", "orange", "purple"];
let started = false;
let lvl = 0;

let h2 = document.querySelector("h2");
let highScoreDisp = document.querySelector("#highScore");

/* ---------- GAME START ---------- */
document.addEventListener("keypress", function () {
  if (!started) {
    started = true;
    levelUp();
  }
});

document.addEventListener("touchstart", function () {
  if (!started) {
    started = true;
    levelUp();
  }
});

/* ---------- FLASH EFFECTS ---------- */
function flash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 100);
}

function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(function () {
    btn.classList.remove("userFlash");
  }, 100);
}

/* ---------- LEVEL UP ---------- */
function levelUp() {
  lvl++;
  h2.innerText = `Level ${lvl}`;

  let rdIdx = Math.floor(Math.random() * btns.length);
  let rdColor = btns[rdIdx];
  let rdBtn = document.querySelector(`.${rdColor}`);

  gameSeq.push(rdColor);
  userSeq = [];

  flash(rdBtn);
}

/* ---------- ANSWER CHECK ---------- */
function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 500);
    }
  } else {
    let finalScore = lvl - 1;

    h2.innerHTML = `GAME OVER! your score is <b>${finalScore}</b>. Press any key to restart.`;

    if (highScore < finalScore) {
      highScore = finalScore;
      highScoreDisp.innerHTML = `Your highest score is ${highScore}`;
    }

    document.body.style.background = "black";
    setTimeout(function () {
      document.body.style.background = "";
    }, 150);

    reset();
  }
}

/* ---------- BUTTON PRESS ---------- */
function btnPress() {
  if (!started) return;

  userFlash(this);

  let userColor = this.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

/* ---------- EVENT LISTENERS ---------- */
let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

/* ---------- RESET ---------- */
function reset() {
  started = false;
  lvl = 0;
  userSeq = [];
  gameSeq = [];
}
