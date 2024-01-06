console.log("Test...");

function getComputerChoice() {
    const choices = ['Rock', 'Paper', 'Scissors'];
    return choices[Math.floor(Math.random() * choices.length)];
}

let computerSelection = getComputerChoice();
console.log(`Computer chose ${computerChoice}.`);
