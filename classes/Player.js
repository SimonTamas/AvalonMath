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
        return player.role !== Morgana && player.role !== Assassin;
    };

    player.isSeenByPercival = function()
    {
        return player.role == Morgana || player.role == Merlin;
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

    player.pickRandomPlayerForMission = function(_players)
    {
        var randomPlayerIndex = Math.floor(Math.random()*_players.length);
        return _players[randomPlayerIndex];
    };

    player.pickPlayerForMission = function(_players,_mission)
    {
        // If this function is not implemented picks will always be random
        if ( player.role.pickPlayerForMission )
        {
            return player.role.pickPlayerForMission(player,_players,_mission);
        }
        return player.pickRandomPlayerForMission(_players);
    };

    return player;
};