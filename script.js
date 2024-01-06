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

testComputerChoice(100);

let computerSelection = getComputerChoice();
console.log(`Computer chose ${computerSelection}.`);