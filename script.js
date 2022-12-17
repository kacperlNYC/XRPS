function init()
{
    messageOut = document.getElementById("message");
    tablePlayerOut = document.getElementById("playerTable");
    tableComputerOut = document.getElementById("computerTable");
    deckPlayer = [5,5,5]; // [r,p,s]
    deckComputer = [5,5,5];
    message = "Click on any button to start!";
    isTurnDone = true;

    itemPlayerOut = document.getElementById("playerItem");
    itemComputerOut = document.getElementById("computerItem")
    itemPlayerOut.src = "";
    itemComputerOut.src = "";    

    logTableOut = document.getElementById("logTable");
    logTableOut.innerHTML = "<tr><th>Game Log</th></tr>";

    priorChoice = "";
    choiceRepeats = 0;

    resetTable();
    display();
}

function play(choice)
{
    // 0 Rock
    // 1 Paper
    // 2 Scissors
    if (isTurnDone && !getWinner())
    {
        isTurnDone = false;
        computerChoice = Math.floor(Math.random() * 3)
        while (deckComputer[computerChoice] == 0) // rejects choices that the computer doesnt have
        {
            computerChoice = Math.floor(Math.random() * 3)
        }

        if (choice === "Rock" && deckPlayer[0] > 0)
        {
            if (computerChoice === 0)
            {
                message = "Rock & Rock: Tie"
                animate("rock", "rock")
            }
            else if (computerChoice === 1)
            {
                message = "Rock loses against Paper: Computer Wins"
                deleteItem("Rock", "Player");
                addItem("Rock", "Computer")
                animate("rock", "paper", "Computer")
            }
            else 
            {
                message = "Rock wins against Scissors: Player Wins"
                deleteItem("Scissors", "Computer");
                addItem("Scissors", "Player");
                animate("rock", "scissor", "Player")
            }
        }
        else if (choice === "Paper" && deckPlayer[1] > 0)
        {
            if (computerChoice === 0)
            {
                message = "Paper wins against Rock: Player Wins"
                deleteItem("Rock", "Computer");
                addItem("Rock", "Player")
                animate("paper", "rock", "Player")
            }
            else if (computerChoice === 1)
            {
                message = "Paper & Paper: Tie"
                animate("paper", "paper")
            }
            else 
            {
                message = "Paper loses against Scissors: Computer Wins"
                deleteItem("Paper", "Player");
                addItem("Paper", "Computer");
                animate("paper", "scissor", "Computer")
            }
        }
        else if (choice === "Scissors" && deckPlayer[2] > 0)
        {
            if (computerChoice === 0)
            {
                message = "Scissors loses against Rock: Computer Wins"
                deleteItem("Scissors", "Player");
                addItem("Scissors", "Computer");
                animate("scissor", "rock", "Computer")
            }
            else if (computerChoice === 1)
            {
                message = "Scissors wins against Paper: Player Wins"
                deleteItem("Paper", "Computer");
                addItem("Paper", "Player");
                animate("scissor", "paper", "Player")
            }
            else 
            {
                message = "Scissors & Scissors: Tie"
                animate("scissor", "scissor")
            }
        }

        // Check for weapon breaks
        if (priorChoice == choice)
        {
            choiceRepeats++;
            if (choiceRepeats > 2)
            {
                message += "<i>.\nPlayer's " + choice + " broke!</i>";
                choiceRepeats = 0;
                deleteItem(choice, "Player");
            }
        }
        else
        {
            choiceRepeats = 0;
        }
        priorChoice = choice;

        setTimeout(() => {
            isTurnDone = true;
        }, 2000);
        
        display();
    }
    else if (getWinner())
    {
        message = getWinner() + " won the game!"
        display();
    }
}

function deleteItem(item, player)
{
    let table;
    let deck;
    if (player === "Player") 
    {
        table = tablePlayerOut;
        deck = deckPlayer;
    }
    else 
    {
        table = tableComputerOut;
        deck = deckComputer;
    }

    if (item === "Rock" && deck[0] > 0) 
    {
        let row = table.rows[deck[0]];
        row.deleteCell(0);
        row.insertCell(0);
        deck[0]--;
    }
    else if (item === "Paper" && deck[1] > 0)
    {
        let row = table.rows[deck[1]];
        row.deleteCell(1);
        row.insertCell(1);
        deck[1]--;
    }
    else if (item === "Scissors" && deck[2] > 0)
    {
        let row = table.rows[deck[2]];
        row.deleteCell(2);
        row.insertCell(2);
        deck[2]--;
    }
}

function addItem(item, player)
{
    let table;
    let deck;
    if (player === "Player") 
    {
        table = tablePlayerOut;
        deck = deckPlayer;
    }
    else 
    {
        table = tableComputerOut;
        deck = deckComputer;
    }

    if (item === "Rock")
    {
        deck[0]++;
        let row = table.rows[deck[0]];
        row.deleteCell(0);
        row.insertCell(0).innerHTML = "<img src='img/rock.png'>";
    }
    else if (item === "Paper")
    {
        deck[1]++;
        let row = table.rows[deck[1]];
        row.deleteCell(1);
        row.insertCell(1).innerHTML = "<img src='img/paper.png'>";
    }
    else
    {
        deck[2]++;
        let row = table.rows[deck[2]];
        row.deleteCell(2);
        row.insertCell(2).innerHTML = "<img src='img/scissor.png'>";
    }
}

function animate(playerItem, computerItem, winner)
{
    itemPlayerOut.src = "img/" + playerItem +".png"
    itemComputerOut.src = "img/" + computerItem +".png"
    if (winner === "Player")
    {
        itemPlayerOut.className = "";
        requestAnimationFrame((time) => {
            requestAnimationFrame((time) => {
                itemPlayerOut.className = "win";
            });
        });
        itemComputerOut.className = "";
        requestAnimationFrame((time) => {
            requestAnimationFrame((time) => {
                itemComputerOut.className = "lose";
            });
          });
    }
    else if (winner = "Computer")
    {
        itemComputerOut.className = "";
        requestAnimationFrame((time) => {
            requestAnimationFrame((time) => {
                itemComputerOut.className = "win";
            });
        });
        itemPlayerOut.className = "";
        requestAnimationFrame((time) => {
            requestAnimationFrame((time) => {
                itemPlayerOut.className = "lose";
            });
        });
    }
}

function getWinner()
{
    if (deckPlayer[0] + deckPlayer[1] + deckPlayer[2] === 0)
    {
        return "Computer";
    }
    else if (deckComputer[0] + deckComputer[1] + deckComputer[2] === 0)
    {
        return "You";
    }
    else 
    {
        return null;
    }
}

function resetTable()
{
    tablePlayerOut.innerHTML =  "<tr class='header'><th>Rock</th><th>Paper</th><th>Scissor</th></tr>"
    tableComputerOut.innerHTML =  "<tr class='header'><th>Rock</th><th>Paper</th><th>Scissor</th></tr>"

    for (let i = 0; i < 5; i++)
    {
        let rowPlayer = tablePlayerOut.insertRow()
        rowPlayer.insertCell().innerHTML = "<img src='img/rock.png'>"
        rowPlayer.insertCell().innerHTML = "<img src='img/paper.png'>"
        rowPlayer.insertCell().innerHTML = "<img src='img/scissor.png'>"
        
        let rowComputer = tableComputerOut.insertRow()
        rowComputer.insertCell().innerHTML = "<img src='img/rock.png'>"
        rowComputer.insertCell().innerHTML = "<img src='img/paper.png'>"
        rowComputer.insertCell().innerHTML = "<img src='img/scissor.png'>"

    }
    for (let i = 0; i < 5; i++)
    {
        let rowPlayer = tablePlayerOut.insertRow()
        rowPlayer.insertCell()
        rowPlayer.insertCell()
        rowPlayer.insertCell()

        let rowComputer = tableComputerOut.insertRow()
        rowComputer.insertCell()
        rowComputer.insertCell()
        rowComputer.insertCell()
    }
}

function display()
{
    let row =logTableOut.insertRow();
    row.insertCell().innerHTML = message;

    messageOut.innerHTML = message;
}