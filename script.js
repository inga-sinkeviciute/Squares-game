let playerWins = 0;
let computerWins = 0;
let round = 1;
let timer;
let playerName = "Player 1";

document
	.getElementById("player-name-input")
	.addEventListener("input", function () {
		playerName = this.value || "Player 1";
	});

document.getElementById("start-button").onclick = function () {
	startGame();
	playAudio();
};

function startGame() {
	const startButton = document.getElementById("start-button");
	startButton.style.visibility = "hidden"; // Hide the button at the beginning

	document.getElementById("player-name-input").style.display = "none";

	document.getElementById("result").innerText = "";
	document.getElementById("time").innerText = "30";
	document.getElementById("round").innerText = round;

	// Play audio when the game starts
	const audio = new Audio("./audio/8bit-music-for-game-68698.mp3");
	audio.play();

	const square = document.getElementById("square");
	square.onclick = function () {
		playerWins++;
		moveSquare();
	};

	moveSquare(); // Player's move
	timer = setInterval(updateTimer, 1000);
}

function moveSquare() {
	const square = document.getElementById("square");
	const maxX = window.innerWidth - square.clientWidth;
	const maxY = window.innerHeight - square.clientHeight;

	const randomX = Math.floor(Math.random() * maxX);
	const randomY = Math.floor(Math.random() * maxY);

	square.style.left = `${randomX}px`;
	square.style.top = `${randomY}px`;
	square.style.backgroundColor = getRandomColor();

	// Computer's move
	setTimeout(() => {
		computerWins++;
		moveSquare();
	}, 30000);
}

function getRandomColor() {
	const letters = "0123456789ABCDEF";
	let color = "#";
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}

	const borderStyle = `3px solid #8c6a6a`;
	const boxShadowStyle = `3px 3px 5px #888888`;

	const square = document.getElementById("square");
	square.style.border = borderStyle;
	square.style.boxShadow = boxShadowStyle;

	return color;
}

function updateTimer() {
	const timeElement = document.getElementById("time");
	let time = parseInt(timeElement.innerText);
	time--;

	if (time === 0) {
		clearInterval(timer);
		endRound();
	} else {
		timeElement.innerText = time;
	}
}

function endRound() {
	const square = document.getElementById("square");
	square.onclick = null;

	const resultElement = document.getElementById("result");
	resultElement.innerText = `Round ${round} ended! ${playerName}: ${playerWins}, Computer: ${computerWins}`;

	// Hide the square at the end of the round
	square.style.display = "none";

	if (round < 10) {
		setTimeout(() => {
			// Make the square visible again at the beginning of the new round
			square.style.display = "block";

			document.getElementById("start-button").style.display = "inline-block";
			document.getElementById("player-name-input").style.display = "block";

			round++;
			startGame(); // Start a new round after a delay
		}, 3000);
	} else {
		// Game finished after 10 rounds
		setTimeout(() => {
			if (playerWins > computerWins) {
				resultElement.innerText = `Game Over! ${playerName} Wins - Rounds: ${playerWins}, Computer Wins: ${computerWins}`;
			} else if (playerWins < computerWins) {
				resultElement.innerText = `Game Over! Computer Wins - Rounds: ${playerWins}, Computer Wins: ${computerWins}`;
			} else {
				resultElement.innerText = `Game Over! It's a Tie - Rounds: ${playerWins}, Computer Wins: ${computerWins}`;
			}
			document.getElementById("start-button").style.display = "inline-block";
		}, 3000);
	}
}

document.getElementById("start-button").onclick = function () {
	startGame(); // Start the game when the button is clicked
};
