var game;
var numberOfSimulation = 1000;
var numberSucceeded = 0;

for ( var simulationNumber = 0 ; simulationNumber < numberOfSimulation ; simulationNumber++ )
{
    game = new Game();

    game.addPlayer(new Player(Merlin));
    game.addPlayer(new Player(Percival));
    game.addPlayer(new Player(LoyalServant));
    game.addPlayer(new Player(LoyalServant));

    game.addPlayer(new Player(Morgana));
    game.addPlayer(new Player(Assassin));
    game.addPlayer(new Player(Mordred));

    game.start();


    numberSucceeded += game.result ? 1 : 0;
}

var succeededPercentage = (numberSucceeded/numberOfSimulation)*100;

document.getElementById("percent").innerHTML = succeededPercentage+"%";
