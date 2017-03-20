var Player = function(_role)
{
    var player = this;

    player.role = _role;
    player.playedClearFails = 0;

    player.isGood = function()
    {
        return player.role.isGood;
    };

    player.isBad = function()
    {
        return !player.role.isGood;
    };

    player.isGoodInTheEyesOfMerlin = function()
    {
        return player.role !== Morgana && player.role !== Assassin;
    };

    player.isSeenByPercival = function()
    {
        return player.role == Morgana || player.role == Merlin;
    };

    player.isRole = function(_role)
    {
        return _role == player.role;
    };

    /**
     * Returns whether the player voted success
     * @param {Game} game
     * @param {Mission} mission
     * @returns {Boolean}
     */
    player.getMissionVote = function(game,mission)
    {
        // 1. Vote is based on role
        var successVote = player.role.isGood;

        // 1.1 Or if the role has a special
        // way of the dealing with the vote
        // based on the current mission
        if ( player.role.getMissionVote )
        {
            successVote = player.role.getMissionVote(game,player,mission);
        }

        // 2. If it is very clear to the bad guys that his person
        // failed the mission then increment the players failed count
        if ( !successVote && !mission.hasAnotherBadGuyBesides(player) )
        {
            player.playedClearFails++;
        }

        // 3. Return the vote
        return successVote;
    };

    player.pickRandomPlayerForMission = function(_players)
    {
        var randomPlayerIndex = Math.floor(Math.random()*_players.length);
        return _players[randomPlayerIndex];
    };

    /**
     * Pick a new player
     * for the mission
     * @param {Game} _game
     * @param {Player[]} _players
     * @param {Mission} _mission
     * @returns {*}
     */
    player.pickPlayerForMission = function(_game,_players,_mission)
    {
        // If this function is not implemented picks will always be random
        if ( player.role.pickPlayerForMission )
        {
            return player.role.pickPlayerForMission(_game,player,_players,_mission);
        }
        return player.pickRandomPlayerForMission(_players);
    };

    return player;
};