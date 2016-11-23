var Assassin =
{
    isGood : false,
    name : "Assassin",
    pickPlayerForMission : function(_game, _player, _players, _mission)
    {
        return BadGuy.pickPlayerForMission(_game, _player, _players, _mission);
    }
};