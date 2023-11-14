let playerWins = 0;
let computerWins = 0;
let round = 1;
let timer;
let playerName = "Player 1";
let audio;

// Event listener. Interactina su HTML, kai i inputa isivedu varda. Jei tuscia palieku, raso 'Player 1
document
	.getElementById("player-name-input")
	.addEventListener("input", function () {
		playerName = this.value || "Player 1";
	});

document.getElementById("show-instructions-button").onclick = function () {
	// Show the instructions container and hide the show instructions button
	document.getElementById("instructions-container").style.display = "flex";
	this.style.display = "none";
};

document.getElementById("start-button").onclick = function () {
	// Hide the instructions and show instructions button when the game starts
	document.getElementById("instructions-container").style.display = "none";
	document.getElementById("show-instructions-button").style.display =
		"inline-block";
	startGame();
	playAudio();
};

document.getElementById("start-button").onclick = function () {
	// Hide the instructions when the game starts
	document.getElementById("instructions-container").style.display = "none";
	startGame();
	playAudio();
};
//Button click event. Klausosi 'click event'. Funckija suveikia paspaudus mygtuka. Tai paleidziu muzikele ir prasideda zaidimas.
document.getElementById("start-button").onclick = function () {
	startGame();
	playAudio();
};

function startGame() {
	// slepiam mygtuka po to kai paspaudi zaisti
	const startButton = document.getElementById("start-button");
	startButton.style.visibility = "hidden";

	// player name input slepiam
	document.getElementById("player-name-input").style.display = "none";

	// rezultatus isvalom is buvusiu roundu
	document.getElementById("result").innerText = "";

	// 30s laikmatis ir roundu skaicius
	document.getElementById("time").innerText = "30";
	document.getElementById("round").innerText = round;

	// muzikele groja
	// Check if there is an existing audio instance
	if (audio) {
		if (!audio.paused) {
			audio.pause(); // Stop the audio if it's playing
		}
		audio.currentTime = 0; // Rewind to the beginning
	}

	// Create a new audio instance
	audio = new Audio("./audio/8bit-music-for-game-68698.mp3");
	audio.play(); // Start the audio

	// click event ant kvadrato perrasomas ir pajudinti square is vietos.
	const square = document.getElementById("square");
	square.onclick = function () {
		playerWins++;
		moveSquare();
	};

	moveSquare(); // Player's move
	timer = setInterval(updateTimer, 1000);
}

function moveSquare() {
	// kvadrato elementa paima
	const square = document.getElementById("square");

	// kad langelyje isitektu, neitu uz ribu
	const maxX = window.innerWidth - square.clientWidth;
	const maxY = window.innerHeight - square.clientHeight;

	// sugeneruoja random kvadrato pozicijas
	const randomX = Math.floor(Math.random() * maxX);
	const randomY = Math.floor(Math.random() * maxY);

	// random judejimas plius random spalva
	square.style.left = `${randomX}px`;
	square.style.top = `${randomY}px`;
	square.style.backgroundColor = getRandomColor();

	// Computer's move. Ivedziau delay, nes kitu atveju labai jau mane aplosinejo :D
	setTimeout(() => {
		computerWins++;
		moveSquare();
	}, 30000);
}

// spalvos generatorius
function getRandomColor() {
	const letters = "0123456789ABCDEF";
	let color = "#";
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}

	// priedejau dar border ir shadow, nes profesionaliau atrode
	const borderStyle = `3px solid #8c6a6a`;
	const boxShadowStyle = `3px 3px 5px #888888`;

	const square = document.getElementById("square");
	square.style.border = borderStyle;
	square.style.boxShadow = boxShadowStyle;

	return color;
}

function updateTimer() {
	// time elementa per ID pasiimam
	const timeElement = document.getElementById("time");

	// current time value ir mazint
	let time = parseInt(timeElement.innerText);
	time--;
	// patikrinam ar nuli pasieke
	if (time === 0) {
		clearInterval(timer);
		endRound();
	} else {
		timeElement.innerText = time;
	}
}

function endRound() {
	const square = document.getElementById("square");

	// Remove the click event handler from the square
	square.onclick = null;

	// Get the result element by its ID
	const resultElement = document.getElementById("result");
	// Display the result for the current round
	resultElement.innerText = `Round ${round} ended! ${playerName}: ${playerWins}, Computer: ${computerWins}`;

	// Hide the square at the end of the round
	square.style.display = "none";

	// Check if there are more rounds to play
	if (round < 10) {
		setTimeout(() => {
			// Make the square visible again at the beginning of the new round
			square.style.display = "block";

			document.getElementById("start-button").style.display = "inline-block";
			document.getElementById("player-name-input").style.display = "block";

			round++;
			startGame(); // Start a new round after a delay
		}, 5000);
	} else {
		// Game finished after 10 rounds
		setTimeout(() => {
			// Determine the winner based on the number of rounds won
			if (playerWins > computerWins) {
				resultElement.innerText = `Game Over! ${playerName} Wins - Rounds: ${playerWins}, Computer Wins: ${computerWins}`;
			} else if (playerWins < computerWins) {
				resultElement.innerText = `Game Over! Computer Wins - Rounds: ${playerWins}, Computer Wins: ${computerWins}`;
			} else {
				resultElement.innerText = `Game Over! It's a Tie - Rounds: ${playerWins}, Computer Wins: ${computerWins}`;
			}
			// Make the start button visible
			document.getElementById("start-button").style.display = "inline-block";
		}, 5000);
	}
}

document.getElementById("start-button").onclick = function () {
	startGame(); // Start the game when the button is clicked
};
