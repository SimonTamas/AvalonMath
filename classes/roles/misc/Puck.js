var Puck =
{
    isGood : false,
    name : "Puck",
    getMissionVote : function(_game,_player,_mission) {
        if ( _game.getNumberOfFailedMissions() > 1 )
        {
            return true;
        }
        return _mission.isFirstMission();
    }
};