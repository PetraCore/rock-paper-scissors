const playerChoiceBox = document.querySelector('#playerChoice');
const computerChoiceBox = document.querySelector('#computerChoice');
const roundResultBox = document.querySelector('#roundResult');
const scoreBox = document.querySelector('#score');

function getComputerChoice() {
    const choices = ['Rock', 'Paper', 'Scissors'];
    return choices[Math.floor(Math.random() * choices.length)];
}

function handleVictory(message) {
    roundResultBox.textContent = message;
    return true;
}

function handleTie(message) {
    roundResultBox.textContent = message;
}

function handleDefeat(message) {
    roundResultBox.textContent = message;
    return false;
}

function playRound(playerSelection, computerSelection) {
    playerChoiceBox.textContent = `You choose ${playerSelection}`;
    computerChoiceBox.textContent = `Computer chooses ${computerSelection}`;

    const VICTORY_MESSAGE = `You Win! ${playerSelection} beats ${computerSelection}`;
    const TIE_MESSAGE = `Tie! Let's have a rematch - make your move!`;
    const DEFEAT_MESSAGE = `You Lose! ${computerSelection} beats ${playerSelection}`;

    switch(playerSelection) {
        case 'Rock':
            switch(computerSelection) {
                case 'Rock':
                    return handleTie(TIE_MESSAGE);
                break;

                case 'Paper':
                    return handleDefeat(DEFEAT_MESSAGE);
                break;

                case 'Scissors':
                    return handleVictory(VICTORY_MESSAGE);
                break;
            }
        break;

        case 'Paper':
            switch(computerSelection) {
                case 'Rock':
                    return handleVictory(VICTORY_MESSAGE);
                break;

                case 'Paper':
                    return handleTie(TIE_MESSAGE);
                break;

                case 'Scissors':
                    return handleDefeat(DEFEAT_MESSAGE);
                break;
            }
        break;

        case 'Scissors':
            switch(computerSelection) {
                case 'Rock':
                    return handleDefeat(DEFEAT_MESSAGE);
                break;

                case 'Paper':
                    return handleVictory(VICTORY_MESSAGE);
                break;

                case 'Scissors':
                    return handleTie(TIE_MESSAGE);
                break;
            }
        break;
    } 

    return null;
}

let playerPoints = 0;
let computerPoints = 0;
let roundCounter = 0;

function game(event, rounds = 5) {
    const targetId = event.target.id;
    let roundResult;

    switch (targetId) {
        case 'rockBtn':
            roundResult = playRound('Rock', getComputerChoice());
        break;
        case 'paperBtn':
            roundResult = playRound('Paper', getComputerChoice());
        break;
        case 'scissorsBtn':
            roundResult = playRound('Scissors', getComputerChoice());
        break;
        default: return;
    }

    if (roundResult === true) {
        playerPoints++;
    } else if (roundResult === false) {
        computerPoints++;
    } else {
        return;
    }

    scoreBox.textContent = `You: ${playerPoints} | Computer: ${computerPoints}`;

    roundCounter++;
    if(roundCounter < rounds) {
        return;
    }

    gameOver();
}

function gameOver() {
    const choiceButtons = document.querySelectorAll('#options > button');
    choiceButtons.forEach((button) => {
        button.disabled = true;
    });

    const infoBoxes = document.querySelectorAll('.info');
    infoBoxes.forEach(element => {
        element.setAttribute('class', 'info faded');
    });

    const resetBtn = document.createElement('button');
    resetBtn.addEventListener('click', resetGame);
    resetBtn.setAttribute('class', 'gameOver');

    const gameOverBox = document.createElement('div');
    gameOverBox.setAttribute('class', 'gameOver info');
    gameOverBox.textContent = 'Game Over: ';

    if (playerPoints > computerPoints) {
        gameOverBox.textContent += 'You win!';
        resetBtn.textContent = "Next round?";
    } else if (computerPoints > playerPoints) {
        gameOverBox.textContent += 'Computer wins!';
        resetBtn.textContent = "Revenge?";
    } else {
        gameOverBox.textContent += 'Tie!';
        resetBtn.textContent = "Rematch?";
    }


    const body = document.querySelector('body');
    body.appendChild(gameOverBox);
    body.appendChild(resetBtn);
}

function resetGame() {
    playerPoints = 0;
    computerPoints = 0;
    roundCounter = 0;

    const endGameUI = document.querySelectorAll('.gameOver');
    endGameUI.forEach(element => {
        element.remove(); 
    });

    const infoBoxes = document.querySelectorAll('.info');
    infoBoxes.forEach(element => {
        element.textContent = (element.id === 'score')
        ? `You: ${playerPoints} | Computer: ${computerPoints}`
        : '';
        element.setAttribute('class', 'info');
    });

    const choiceButtons = document.querySelectorAll('#options > button');
    choiceButtons.forEach((button) => {
        button.disabled = false;
    });
}

const options = document.querySelector('#options');

options.addEventListener('click', game);