var Player = function(_role)
{
    var player = this;

    player.role = _role;

    player.isGood = function()
    {
        return player.role.isGood;
    };

    player.isGoodInTheEyesOfMerlin = function()
    {
        return player.role != "Morgana" || player.role != "Assassin" || player.role != "Bad Lancelot";
    };

    player.getMissionVote = function(mission)
    {
        // If this function is not implemented picks will always be based on goodness
        if ( player.role.getMissionVote )
        {
            return player.role.getMissionVote(mission);
        }
        return player.role.isGood; // Dumbed down version for now
    };

    player.pickRandomPlayerForMission = function(players, mission)
    {
        var randomPlayerIndex, pickedPlayer;
        do
        {
            randomPlayerIndex = Math.floor(Math.random()*players.length);
            pickedPlayer = players[randomPlayerIndex];
        } while ( !mission.hasPlayer(pickedPlayer) );
        return pickedPlayer;
    };

    player.pickPlayerForMission = function(players,mission)
    {
        // If this function is not implemented picks will always be random
        if ( player.role.pickPlayerForMission )
        {
            return player.role.pickPlayerForMission(players,mission);
        }
        return player.pickRandomPlayerForMission(players,mission);
    };

    return player;
};