var Merlin =
{
    isGood : true,
    name : "Merlin",
    pickPlayerForMission : function(players, mission)
    {
        // Merlin will not Mordred and Morgana
        // on a mission that definitely goes
        if ( mission.isFifthPick() ) {

            var goodPlayers = [];
            var player, playerIndex;
            for (playerIndex = 0; playerIndex < players.length; playerIndex++) {
                player = players[playerIndex];
                if (player.isGoodInTheEyesOfMerlin()) {
                    goodPlayers.push(player);
                }
            }

            var randomPlayerIndex, pickedPlayer;
            do
            {
                randomPlayerIndex = Math.floor(Math.random() * goodPlayers.length);
                pickedPlayer = goodPlayers[randomPlayerIndex];
            } while (!mission.hasPlayer(pickedPlayer));
            return pickedPlayer;
        }
    }
};