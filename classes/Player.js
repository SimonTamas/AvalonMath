var Player = function(_role)
{
    var player = this;

    player.role = _role;

    player.isGood = function()
    {
        return player.role.isGood;
    };

    player.getMissionVote = function(mission)
    {
        return player.role.isGood; // Dumbed down version for now
    };

    player.pickPlayerForMission = function(players,mission)
    {
        // If this function is not implemented picks will always be random
        var randomPlayerIndex, pickedPlayer;
        do
        {
            randomPlayerIndex = Math.floor(Math.random()*players.length);
            pickedPlayer = players[randomPlayerIndex];
        } while ( !mission.hasPlayer(pickedPlayer) );
        return pickedPlayer;

    };

    return player;
};