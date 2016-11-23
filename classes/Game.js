var Game = function()
{
    var game = this;

    game.currentPicker = 0;
    game.pickNumber = 1;
    game.players = [];
    game.pickedMissions = [];
    game.missions = [];
    game.result = null;

    game.missionData = {
        spots : {
            "5": [2, 3, 2, 3, 3],
            "6": [2, 3, 4, 3, 4],
            "7": [2, 3, 3, 4, 4],
            "8": [3, 4, 4, 5, 5],
            "9": [3, 4, 4, 5, 5],
            "10": [3, 4, 4, 5, 5]
        },
        requiredFails : {
            "5": [1, 1, 1, 1, 1],
            "6": [1, 1, 1, 1, 1],
            "7": [1, 1, 1, 2, 1],
            "8": [1, 1, 1, 2, 1],
            "9": [1, 1, 1, 2, 1],
            "10": [1, 1, 1, 2, 1]
        }
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
        return game.missionData.spots[nrOfPlayers][missionNumber];
    };

    game.getCurrentMissionRequiredFails = function()
    {
        var missionNumber = game.getCurrentMissionNumber();
        var nrOfPlayers = game.getNumberOfPlayers();
        return game.missionData.requiredFails[nrOfPlayers][missionNumber];
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

    game.getPlayersNotOnMission = function(mission)
    {
        var playersNotOnMission = [];
        var player;
        for ( var playerIndex = 0 ; playerIndex < game.players.length ; playerIndex++ )
        {
            player = game.players[playerIndex];
            if ( !mission.hasPlayer(player))
            {
                playersNotOnMission.push(player);
            }
        }
        return playersNotOnMission;
    };

    game.pickMission = function()
    {
        var playerPicking = game.getPlayerPicking();

        var missionNumber = game.getCurrentMissionNumber();
        var missionSpots = game.getCurrentMissionSpots();
        var missionRequiredFails = game.getCurrentMissionRequiredFails();
        var mission = new Mission(missionNumber, game.pickNumber, missionRequiredFails);

        // A player will always put himself on a mission
        mission.addPlayer(playerPicking, true);

        // Now the player picks the number of people needed
        var pickedPlayer, playersNotAlreadyOnTheMission;
        for ( var pickIndex = 1 ; pickIndex < missionSpots ; pickIndex++ )
        {
            playersNotAlreadyOnTheMission = game.getPlayersNotOnMission(mission);
            pickedPlayer = playerPicking.pickPlayerForMission(playersNotAlreadyOnTheMission,mission);
            mission.addPlayer(pickedPlayer, false);
        }

        game.pickedMissions.push(mission);

        if ( mission.isFifthPick() )
        {
            // This mission goes regardless of voting
            mission.doMission();

            game.missions.push(mission);

            game.pickNumber = 1;
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
                game.pickNumber++;
            }
        }
        if ( game.getNumberOfSuccessfulMissions() < 3 ) {
            if ( game.getNumberOfFailedMissions() <3 ) {
                if (game.getCurrentMissionNumber() < 5) {
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
        // 1. Shuffle players
        game.shufflePlayers();

        game.pickMission();
    };

    return game;
};