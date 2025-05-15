// Buttons
const buttonNewGame = document.getElementById("button-new-game");
const buttonRollDie = document.getElementById("button-roll-die");
const buttonBankScore = document.getElementById("button-bank-score");

// Player specific elements wrapped in a Class cause I'm a PRO software developer 😎
class Player {
    constructor(playerId) {
        this.playerId = playerId;
        this.currentScore = document.getElementById(`${this.playerId}-current-score`);
        this.totalScore = document.getElementById(`${this.playerId}-total-score`);
        this.label = document.getElementById(`${this.playerId}-label`);
        this.section = document.getElementById(`${this.playerId}-section`);
    }
}

// Create player objects and get their respective html elements
const p1 = new Player("p1");
const p2 = new Player("p2");

// Die image
const dieImg = document.getElementById("die-img");


// Start the Game with Player1 as the activeplayer
let activePlayer = p1;

function switchActivePlayer() {
    activePlayer.section.classList.toggle("active-player");
    activePlayer = (activePlayer === p1) ? p2 : p1;
    activePlayer.section.classList.toggle("active-player");
}

// Die rolling
let dieDots;
function rollDie() {
    return Math.floor(Math.random() * 6) + 1;
}

// increment current score
function incrementCurrentScore(score) {
    let currentScore = Number(activePlayer.currentScore.textContent);
    currentScore += score;
    activePlayer.currentScore.textContent = String(currentScore);
}

function updateDie() {
    
    // roll the die
    dieDots = rollDie();
    // update the image
    dieImg.src = `./assets/dice-${dieDots}.png`;
    dieImg.alt = `Die with ${dieDots} dots`;
    dieImg.classList.remove("hidden");
    dieImg.classList.add("absolute");

    if (dieDots === 1) {
        activePlayer.currentScore.textContent = "0";
        switchActivePlayer();
    }
    else {
        // update player's current score display
        incrementCurrentScore(dieDots);
    }
}
buttonRollDie.addEventListener("click", updateDie)

// Bank the score, reset current score to 0, switch player
function bankScore() {
    activePlayer.totalScore.textContent = String(Number(activePlayer.totalScore.textContent) + Number(activePlayer.currentScore.textContent));
    activePlayer.currentScore.textContent = "0";
    if (Number(activePlayer.totalScore.textContent) >= 20) {activePlayer.label.textContent = "🏆 Winner 🏆"}
    switchActivePlayer();
}
buttonBankScore.addEventListener("click", bankScore);

