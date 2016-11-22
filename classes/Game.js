var Game = function()
{
    var game = this;

    game.currentPicker = 0;
    game.pickingIndex = 1;
    game.players = [];
    game.pickedMissions = [];
    game.missions = [];
    game.totalNrOfMissions = 5;
    game.pickingIndexNoVote = 5;
    game.neededMissions = 3;
    game.result = null;

    game.missionData = {
        "5" : [2,3,2,3,3],
        "6" : [2,3,4,3,4],
        "7" : [2,3,3,4,4],
        "8" : [3,4,4,5,5],
        "9" : [3,4,4,5,5],
        "10" : [3,4,4,5,5]
    };

    game.shufflePlayers = function()
    {
        for (var i = game.players.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = game.players[i];
            game.players[i] = game.players[j];
            game.players[j] = temp;
        }
    };

    game.addPlayer = function(_player)
    {
        game.players.push(_player);
    };

    game.getPlayerPicking = function()
    {
        return game.players[game.currentPicker % game.players.length];
    };

    game.getCurrentMissionNumber = function()
    {
        return game.missions.length;
    };

    game.getNumberOfPlayers = function()
    {
        return game.players.length;
    };

    game.getCurrentMissionSpots = function()
    {
        var missionNumber = game.getCurrentMissionNumber();
        var nrOfPlayers = game.getNumberOfPlayers();
        return game.missionData[nrOfPlayers][missionNumber];
    };

    game.getNumberOfSuccessfulMissions = function()
    {
        var successfulMissions = 0;
        var mission;
        for ( var missionIndex = 0 ; missionIndex < game.missions.length ; missionIndex++ )
        {
            mission = game.missions[missionIndex];
            if ( mission.hasPassed() )
            {
                successfulMissions++;
            }
        }
        return successfulMissions;
    };

    game.getNumberOfFailedMissions = function()
    {
        var failedMissions = 0;
        var mission;
        for ( var missionIndex = 0 ; missionIndex < game.missions.length ; missionIndex++ )
        {
            mission = game.missions[missionIndex];
            if ( mission.hasFailed() )
            {
                failedMissions++;
            }
        }
        return failedMissions;
    };

    game.pickMission = function()
    {
        var playerPicking = game.getPlayerPicking();

        var missionNumber = game.getCurrentMissionNumber();
        var missionSpots = game.getCurrentMissionSpots();
        var mission = new Mission(missionNumber);

        // A player will always put himself on a mission
        mission.addPlayer(playerPicking);

        // Now the player picks the number of people needed
        var pickedPlayer;
        for ( var pickIndex = 1 ; pickIndex < missionSpots ; pickIndex++ )
        {
            pickedPlayer = playerPicking.pickPlayerForMission(game.players,mission);
            mission.addPlayer(pickedPlayer, false);
        }

        game.pickedMissions.push(mission);

        if ( game.pickingIndex == game.pickingIndexNoVote )
        {
            // This mission goes regardless of voting
            mission.doMission();

            game.missions.push(mission);

            game.pickingIndex = 0;
        }
        else
        {
            // Voting happens
            var voteResult = false;
            if ( voteResult )
            {
                // The mission goes
            }
            else
            {
                // Pick goes to the next player
                game.pickingIndex++;
            }
        }
        if ( game.getNumberOfSuccessfulMissions() < game.neededMissions ) {
            if ( game.getNumberOfFailedMissions() < game.neededMissions ) {
                if (game.getCurrentMissionNumber() < game.totalNrOfMissions) {
                    game.currentPicker++;
                    game.pickMission();
                }
            }
            else {
                // Bad guys won
                game.result = false;
            }
        }
        else {
            // Good guys won
            game.result = true;
        }
    };

    /**
     * Starts the game of Avalon
     * with the current roles
     */
    game.start = function()
    {
        // 1. Shuffle roles
        game.shufflePlayers();

        game.pickMission();
    };

    return game;
};