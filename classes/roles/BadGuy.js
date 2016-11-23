var BadGuy = {
    pickPlayerForMission : function(_game, _player, _players, _mission)
    {
        var possiblePicks = _players;

        // If the mission goes it needs two fails
        if ( _mission.isFifthPick() ) {
            if ( _mission.needsTwoFails() )
            {
                if ( !_mission.hasAnotherBadGuyBesides(_player) ) {
                    // Pick a bad guy who has already failed a mission
                    // or if not, then pick one randomly
                    return _game.getMostObviousOtherBadGuyOrRandom(_player);
                }
            }
        }

        return _player.pickRandomPlayerForMission(possiblePicks);
    }
};