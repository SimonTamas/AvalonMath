var Mordred =
{
    isGood : false,
    name : "Mordred",
    getMissionVote : function(_player,_mission) {
        // If Mordred sees there is another
        // bad guy on the mission he wont fail
        if (_mission.hasAnotherBadGuyBesides(_player)) {
            // Unless this mission this needs two fails
            return !_mission.needsTwoFails();
        }
        return _mission.isFirstMission();
    },
    pickPlayerForMission : function(_game, _player, _players, _mission)
    {
        return BadGuy.pickPlayerForMission(_game, _player, _players, _mission);
    }
};