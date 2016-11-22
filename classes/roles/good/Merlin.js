var Merlin =
{
    isGood : true,
    name : "Merlin",
    pickPlayerForMission : function(players, mission)
    {
        var goodPlayers ;

        // Merlin will not pick a bad guy
        // on a mission that definitely goes
        if ( mission.isFifthPick() ) {

            goodPlayers = [];
            var player, playerIndex;
            for (playerIndex = 0; playerIndex < players.length; playerIndex++) {
                player = players[playerIndex];
                if (player.isGoodInTheEyesOfMerlin()) {
                    goodPlayers.push(player);
                }
            }
        }
        else
        {
            //TODO: Add some tactic for Merlin
            goodPlayers = players;
        }

        var randomPlayerIndex, pickedPlayer;
        do
        {
            randomPlayerIndex = Math.floor(Math.random() * goodPlayers.length);
            pickedPlayer = goodPlayers[randomPlayerIndex];
        } while (!mission.hasPlayer(pickedPlayer));
        return pickedPlayer;
    }
};