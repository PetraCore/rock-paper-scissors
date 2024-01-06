console.log("Test...");

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
    return text[0].toUpperCase() + text.slice(1).toLowerCase();
}

function validateUserInput(input) {
    let formattedInput = capitalize(input);

    const choices = ['Rock', 'Paper', 'Scissors']

    while (!choices.includes(formattedInput)) {
        let message = `Wrong input ("${input}")! Available choices:`;
        for (i in choices) {
            message += ` "${choices[i]}",`;
        }

        input = prompt(message);
        formattedInput = capitalize(input);
    }
    return formattedInput;
}

function handleTie(message) {
    let playerSelection = validateUserInput(prompt(message));
    return playRound(playerSelection, getComputerChoice());
}

function playRound(playerSelection, computerSelection) {

    playerSelection = validateUserInput(playerSelection); 

    const WIN_MESSAGE = `You Win! ${playerSelection} beats ${computerSelection}`;
    const TIE_MESSAGE = `Tie! Let's have a rematch - make your move!`;
    const DEFEAT_MESSAGE = `You Lose! ${computerSelection} beats ${playerSelection}`;

    switch(playerSelection) {
        case 'Rock':
            switch(computerSelection) {
                case 'Rock':
                    return handleTie(TIE_MESSAGE);
                break;

                case 'Paper':
                    console.log(DEFEAT_MESSAGE);
                    return 0;
                break;

                case 'Scissors':
                    console.log(WIN_MESSAGE);
                    return 1;
                break;
            }
        break;

        case 'Paper':
            switch(computerSelection) {
                case 'Rock':
                    console.log(WIN_MESSAGE);
                    return 1;
                break;

                case 'Paper':
                    return handleTie(TIE_MESSAGE);
                break;

                case 'Scissors':
                    console.log(DEFEAT_MESSAGE);
                    return 0;
                break;
            }
        break;

        case 'Scissors':
            switch(computerSelection) {
                case 'Rock':
                    console.log(DEFEAT_MESSAGE);
                    return 0;
                break;

                case 'Paper':
                    console.log(WIN_MESSAGE);
                    return 1;
                break;

                case 'Scissors':
                    return handleTie(TIE_MESSAGE);
                break;
            }
        break;
    } 
}

testComputerChoice(100);

let computerSelection = getComputerChoice();
console.log(`Computer chose ${computerSelection}.`);

playRound('SDHEJHR', computerSelection);