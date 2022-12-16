function init()
{
    messageOut = document.getElementById("message");
    tablePlayerOut = document.getElementById("playerTable");
    tableComputerOut = document.getElementById("computerTable");
    deckPlayer = [5,5,5]; // [r,p,s]
    deckComputer = [5,5,5];
    message = "";
    
    resetTable();
}

function resetTable()
{
    tablePlayerOut.innerHTML =  "<tr><th>Rock</th><th>Paper</th><th>Scissor</th></tr>"
    tableComputerOut.innerHTML =  "<tr><th>Rock</th><th>Paper</th><th>Scissor</th></tr>"

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
}

function play(choice)
{
    computerChoice = Math.floor(Math.random() * 3)
    // 0 Rock
    // 1 Paper
    // 2 Scissors
    if (choice === "Rock")
    {
        if (computerChoice === 0)
        {
            message = "Rock & Rock: Tie"
        }
        else if (computerChoice === 1)
        {
            message = "Rock loses to Paper: Computer Wins"
        }
        else 
        {
            message = "Rock wins to Scissors: Player Wins"
        }
    }
    else if (choice === "Paper")
    {
        if (computerChoice === 0)
        {
            message = "Paper wins to Rock: Player Wins"
        }
        else if (computerChoice === 1)
        {
            message = "Paper & Paper: Tie"
        }
        else 
        {
            message = "Paper loses to Scissors: Computer Wins"
        }
    }
    else
    {
        if (computerChoice === 0)
        {
            message = "Scissors loses to Rock: Computer Wins"
        }
        else if (computerChoice === 1)
        {
            message = "Scissors wins to Paper: Player Wins"
        }
        else 
        {
            message = "Scissors & Scissors: Tie"
        }
    }
    
    display();
}

function display()
{
    messageOut.innerHTML = message;
}