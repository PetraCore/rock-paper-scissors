function getComputerChoice() {
    const choices = ['Rock', 'Paper', 'Scissors'];
    return choices[Math.floor(Math.random() * choices.length)];
}

function testComputerChoice(num) {
    let rockCounter = 0;
    let paperCounter = 0;
    let scissorsCounter = 0;

    console.group("Simulation");
    console.log("Simulating computer choices...")
    for (let i = 0; i < num; i++) {
        let computerChoice = getComputerChoice();

        switch (computerChoice) {
            case 'Rock':
                rockCounter++;
            break;

            case 'Paper':
                paperCounter++;
            break;

            case 'Scissors':
                scissorsCounter++;
            break;
        }
    }

    console.log(`Out of ${num} simulations computer chose:`);
    console.log(`Rock ${rockCounter} times.`);
    console.log(`Paper ${paperCounter} times.`);
    console.log(`Scissors ${scissorsCounter} times.`);
    console.groupEnd();
}

function capitalize(text) {
    if (!text) {
        return '';
    }

    return text[0].toUpperCase() + text.slice(1).toLowerCase();
}

function validateUserInput(input) {
    if(input === null) {
        return null;
    }

    let formattedInput = capitalize(input);

    const choices = ['Rock', 'Paper', 'Scissors']

    while (!choices.includes(formattedInput)) {
        let message = `Wrong input ("${input}") !\nAvailable choices:`;
        for (i in choices) {
            message += ` "${choices[i]}", `;
        }
        message = message.slice(0, message.length - 2) + '.';

        input = prompt(message);
        if (input === null) {
            return null;
        }

        formattedInput = capitalize(input);
    }
    return formattedInput;
}

function getPlayerChoice(message) {
    return validateUserInput(prompt(message));
}

function handleVictory(message) {
    console.log(message);
    alert(message);
    return true;
}

function handleTie(message) {
    console.log("Tie - rematch!");
    return playRound(getPlayerChoice(message), getComputerChoice());
}

function handleDefeat(message) {
    console.log(message);
    alert(message);
    return false;
}

function playRound(playerSelection, computerSelection) {

    playerSelection = validateUserInput(playerSelection); 
    console.log(`Player chose ${playerSelection}.`);
    if (playerSelection !== null) {
        console.log(`Computer chose ${computerSelection}.`);
        alert(`Computer chose ${computerSelection}.`);
    }

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

function game(rounds = 5) {
    let playerPoints = 0;
    let computerPoints = 0;

    for (let i = 0; i < rounds; i++) {

        console.group(`Round ${i+1}`);

        let computerSelection = getComputerChoice();
        let playerSelection = getPlayerChoice('Make your choice.');
        if (playerSelection === null) {
            console.log('Exiting...');
            return;
        }

        let roundResult = playRound(playerSelection, computerSelection);

        if (roundResult === true) {
            playerPoints++;
        } else if (roundResult === false) {
            computerPoints++;
        } else {
            console.log('Exiting...');
            return;
        }
        
        let message = `Round over! Player: ${playerPoints}, Computer: ${computerPoints}.`; 
        console.log(message);
        alert(message);
        console.groupEnd();
    }

    if (playerPoints > computerPoints) {
        console.log('Player won!');
        if(confirm('You win! Next round?')) {
            game(rounds);
        }

    } else if (computerPoints > playerPoints) {
        console.log('Computer won!');
        if (confirm('You lose! Do you want a rematch?')) {
            game(rounds);
        }
    } else {
        console.log('Nobody won - Tie!');
        if (confirm('Tie! Do you want a rematch?')) {
            game(rounds);
        }
    }
}

testComputerChoice(100);

window.addEventListener('load', () => {
    game();
});
