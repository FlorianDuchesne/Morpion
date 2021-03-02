let cells = document.querySelectorAll("td");
var J1 = {
  symbole: '<i class="fas fa-times"></i>',
  score: 0,
};
var J2 = {
  symbole: '<i class="fas fa-circle"></i>',
  score: 0,
};
var JActuel = J1.symbole;
var JPrecedent = J2.symbole;
let state = [];
victory = false;
var compteur = 0;

document.querySelector("button").addEventListener("click", function (event) {
  score();
});

function score() {
  state = [];
  compteur = 0;
  victory = false;
  document.querySelector("h2").innerHTML = "C'est au tour de " + JActuel;
  document.querySelector("#joueur1 .symbole").innerHTML = J1.symbole;
  document.querySelector("#joueur1 .score").innerHTML = J1.score;
  document.querySelector("#joueur2 .symbole").innerHTML = J2.symbole;
  document.querySelector("#joueur2 .score").innerHTML = J2.score;

  for (let i = 0; i < cells.length; i++) {
    cells[i].innerHTML = "";
  }
}

for (let i = 0; i < cells.length; i++) {
  document.querySelector("h2").innerHTML = "C'est au tour de " + J1.pseudo;
  score();
  let cell = cells[i];
  cell.addEventListener("click", function () {
    compteur++;
    if (!victory && this.innerHTML === "") {
      JActuel === J1.symbole
        ? (this.innerHTML = J1.symbole)
        : (this.innerHTML = J2.symbole);
      JActuel === J1.symbole
        ? (state[i] = J1.symbole)
        : (state[i] = J2.symbole);
      JActuel === J1.symbole
        ? (JPrecedent = J1.symbole)
        : (JPrecedent = J2.symbole);
      JActuel === J1.symbole ? (JActuel = J2.symbole) : (JActuel = J1.symbole);
      document.querySelector("h2").innerHTML = "C'est au tour de " + JActuel;
      if (compteur >= 5) {
        checkVictory();
        if (compteur === 9 && !victory)
          document.querySelector("h2").innerHTML = "Match nul !";
      }
    }
  });
}

function checkVictory() {
  for (let i of [0, 3, 6]) {
    if (
      state[i] === JPrecedent &&
      state[i] === state[i + 1] &&
      state[i + 1] === state[i + 2]
    ) {
      victoire();
    }
  }

  for (let i of [0, 1, 2]) {
    if (
      state[i] === JPrecedent &&
      state[i] === state[i + 3] &&
      state[i + 3] === state[i + 6]
    ) {
      victoire();
    }
  }
  if (
    (state[0] === JPrecedent &&
      state[0] === state[4] &&
      state[4] === state[8]) ||
    (state[2] === JPrecedent && state[2] === state[4] && state[4] === state[6])
  ) {
    victoire();
  }
}

function victoire() {
  victory = true;
  document.querySelector("h2").innerHTML = JPrecedent + " a gagné !";
  JPrecedent === J1.symbole
    ? (J1.score = J1.score + 1)
    : (J2.score = J2.score + 1);
}
