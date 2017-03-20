var Lover =
{
    isGood: true,
    name: "Lover",
    pickPlayerForMission : function(_game, _player, _players, _mission)
    {
        var loverPicks = _players;

        // A lover will always with the other lover
        if ( _mission.isFifthPick() ) {
            var player, playerIndex;
            for (playerIndex = 0; playerIndex < _players.length; playerIndex++) {
                player = _players[playerIndex];
                if ( player.isRole(Lover)) {
                    loverPicks = [player];
                }
            }
        }
        else
        {
            //TODO: Add strategy for lovers
        }

        return _player.pickRandomPlayerForMission(loverPicks);
    }
};