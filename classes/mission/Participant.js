var Participant = function(_player, _isPicker)
{
    var participant = this;

    participant.player = _player;
    participant.isPicker = _isPicker;

    participant.isBad = function()
    {
        return !participant.player.role.isGood;
    };

    participant.getRole = function()
    {
        return participant.player.role;
    };

    participant.hasPickedTheMission = function()
    {
        return participant.isPicker;
    };

    participant.getMissionVote = function(mission)
    {
        return participant.player.getMissionVote(mission);
    };

    return participant;
}