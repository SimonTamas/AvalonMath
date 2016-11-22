var Morgana =
{
    isGood : false,
    name : "Morgana",
    getMissionVote : function(mission)
    {
        if ( mission.isFirstMission() ) {
            return 50 < Math.random() * 100;
        }
        return false;
    }
};