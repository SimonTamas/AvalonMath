var Percival =
{
    isGood: true,
    name: "Percival",
    pickPlayerForMission : function(_game, _player, _players, _mission)
    {
        var percivalPicks = _players;

        // Percival will never put on both
        // Merlin and Morgana on the same mission
        if ( _mission.isFifthPick() ) {

            percivalPicks = [];
            var player, playerIndex, alreadyPickedOneSeen;
            for (playerIndex = 0; playerIndex < _players.length; playerIndex++) {
                player = _players[playerIndex];
                if ( !player.isSeenByPercival() ) {
                    percivalPicks.push(player);
                }
                else if ( !alreadyPickedOneSeen )
                {
                    percivalPicks.push(player);
                    alreadyPickedOneSeen = true;
                }
            }
        }
        else
        {
            //TODO: Figure out which is which
        }

        return _player.pickRandomPlayerForMission(percivalPicks);
    }
};