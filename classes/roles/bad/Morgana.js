var Morgana =
{
    isGood : false,
    name : "Morgana",
    getMissionVote : function(_player, _mission)
    {
        if ( _mission.isFirstMission() ) {
            return 50 < Math.random() * 100;
        }
        return false;
    }
};