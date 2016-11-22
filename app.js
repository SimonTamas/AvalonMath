var game;
var numberOfSimulation = 10000;
var results = [];

for ( var simulationNumber = 0 ; simulationNumber < numberOfSimulation ; simulationNumber++ )
{
    game = new Game();

    game.addPlayer(new Player(Merlin));
    game.addPlayer(new Player(Percival));
    game.addPlayer(new Player(LoyalServant));
    game.addPlayer(new Player(LoyalServant));

    game.addPlayer(new Player(Mordred));
    game.addPlayer(new Player(Morgana));
    game.addPlayer(new Player(Assassin));

    game.start();

    results.push(game.result);
}

var succeeded = 0;
for ( var resultIndex = 0 ; resultIndex < results.length ; resultIndex++ )
{
    if ( results[resultIndex])
    {
        succeeded++;
    }
}

// 100% ...... numberOfSimulations
// x ............. succeeded

var succeededPercentage = (100*succeeded)/numberOfSimulation;

console.log(succeededPercentage+"%");
