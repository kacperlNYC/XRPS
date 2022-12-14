function init()
{
    tablePlayerOut = document.getElementById("playerTable");
    tableComputerOut = document.getElementById("computerTable");
    deckPlayer = [5,5,5]; // [r,p,s]
    deckComputer = [5,5,5];
    
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