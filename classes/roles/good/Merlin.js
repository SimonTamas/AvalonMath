var Merlin =
{
    isGood : true,
    name : "Merlin",
    pickPlayerForMission : function(_game, _player, _players, _mission)
    {
        var goodPlayers = _players;

        // Merlin will not pick a bad guy
        // on a mission that definitely goes
        if ( _mission.isFifthPick() ) {

            goodPlayers = [];
            var player, playerIndex;
            for (playerIndex = 0; playerIndex < _players.length; playerIndex++) {
                player = _players[playerIndex];
                if ( player.isGoodInTheEyesOfMerlin()) {
                    goodPlayers.push(player);
                }
            }
        }

        return _player.pickRandomPlayerForMission(goodPlayers);
    }
};