var Mordred =
{
    isGood : false,
    name : "Mordred",
    getMissionVote : function(mission)
    {
        return mission.isFirstMission();
    }

};