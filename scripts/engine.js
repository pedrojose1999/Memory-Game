const biblicalEmojis = [
    "✝️", "✝️", "🕊️", "🕊️",
    "📖", "📖", "🙏", "🙏",
    "🌟", "🌟", "🛐", "🛐", 
    "⛪", "⛪", "🕎", "🕎"
]; // emojis do jogo

let openCards = [];
let matchedPairs = 0;
const gameContainer = document.querySelector(".game");
const countdownDisplay = document.querySelector(".countdown");

// função de embaralhar as cartas
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// criação do jogo
function createBoard() {
    gameContainer.innerHTML = "";
    openCards = [];
    matchedPairs = 0;

    const shuffledEmojis = [...biblicalEmojis];
    shuffleArray(shuffledEmojis);

    shuffledEmojis.forEach(emoji => {
        let box = document.createElement("div");
        box.className = "item boxOpen"; // para ver as cartas antes de começar
        box.innerHTML = emoji;
        box.onclick = handleClick;
        gameContainer.appendChild(box);
    });

    startCountdown(5); // contagem regressiva para memorizar as cartas
}

// iniciar contagem regressiva antes do jogo começar
function startCountdown(seconds) {
    let timeLeft = seconds;
    countdownDisplay.innerText = `Memorize as cartas: ${timeLeft}s`;

    const timer = setInterval(() => {
        timeLeft--;
        countdownDisplay.innerText = `Memorize as cartas: ${timeLeft}s`;

        if (timeLeft === 0) {
            clearInterval(timer);
            hideCards();
        }
    }, 1000);
}

// esconder as cartas após o tempo de memorização
function hideCards() {
    document.querySelectorAll(".item").forEach(card => {
        card.classList.remove("boxOpen");
    });
    countdownDisplay.innerText = ""; 
}

// lógica ao clicar em uma carta
function handleClick() {
    if (openCards.length < 2 && !this.classList.contains("boxOpen") && !this.classList.contains("boxMatch")) {
        this.classList.add("boxOpen");
        openCards.push(this);
    }

    if (openCards.length === 2) {
        setTimeout(checkMatch, 500);
    }
}

// verificar se as cartas combinam
function checkMatch() {
    if (openCards[0].innerHTML === openCards[1].innerHTML) {
        openCards[0].classList.add("boxMatch");
        openCards[1].classList.add("boxMatch");
        matchedPairs++;

        // verificar se o usuario venceu
        if (matchedPairs === biblicalEmojis.length / 2) {
            setTimeout(() => alert("Parabéns, você venceu! 🎉"), 300);
        }
    } else {
        openCards[0].classList.remove("boxOpen");
        openCards[1].classList.remove("boxOpen");
    }

    openCards = [];
}

// reiniciar o jogo
document.querySelector(".reset").addEventListener("click", createBoard);

// iniciar o jogo
createBoard();
