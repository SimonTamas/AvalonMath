var Mission = function(_missionNumber, _pickNumber, _requiredFails)
{
    var mission = this;

    mission.missionNumber = _missionNumber;
    mission.participants = [];
    mission.results = [];
    mission.pickNumber = _pickNumber;
    mission.requiredFails = _requiredFails;


    mission.isFifthPick = function()
    {
        return mission.pickNumber == 5;
    };

    mission.isFirstMission = function()
    {
        return mission.missionNumber == 1;
    };

    mission.addPlayer = function(_player, _isPicker)
    {
        var participant = new Participant(_player, _isPicker);
        mission.participants.push(participant);
    };

    /**
     * Returns the number of
     * fails cards in the mission
     * @returns {Number}
     */
    mission.getNumberOfFails = function()
    {
        var failCount = 0;
        var success;
        for ( var resultIndex = 0 ; resultIndex < mission.results.length ; resultIndex++ )
        {
            success = mission.results[resultIndex];
            if ( !success )
            {
                failCount++;
            }
        }
        return failCount;
    };

    /**
     * Returns the player
     * who picked the mission
     * @returns {Player}
     */
    mission.getPicker = function()
    {
        var participant;
        for ( var participantIndex = 0 ; participantIndex < mission.participants.length ; participantIndex++ )
        {
            participant = mission.participants[participantIndex];
            if ( participant.hasPickedTheMission() )
            {
                return participant.player;
            }
        }
    };


    /**
     * Returns the participant
     * on the mission
     * @returns {Array}
     */
    mission.getParticipants = function()
    {
        return mission.participants;
    };

    /**
     * Returns whether a player is
     * on the this mission
     * @param {Player} _player
     * @returns {boolean}
     */
    mission.hasPlayer = function(_player)
    {
        var participant;
        for ( var participantIndex = 0 ; participantIndex < mission.participants.length ; participantIndex++ )
        {
            participant = mission.participants[participantIndex];
            if ( participant.player == _player )
            {
                return true;
            }
        }
        return false;
    };


    mission.doMission = function()
    {
        var participant, participantVote;
        for ( var participantIndex = 0 ; participantIndex < mission.participants.length ; participantIndex++ )
        {
            participant = mission.participants[participantIndex];
            participantVote = participant.getMissionVote(mission);
            mission.results.push(participantVote);
        }
    };

    mission.hasFailed = function()
    {
        var failCount = 0;
        var result;
        for ( var resultIndex = 0 ; resultIndex < mission.results.length ; resultIndex++ )
        {
            result = mission.results[resultIndex];
            if ( !result )
            {
                failCount++;
            }
        }
        return failCount >= mission.requiredFails;
    };

    mission.hasPassed = function()
    {
        return !mission.hasFailed();
    };


    return mission;
};