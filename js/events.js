const SPECIAL_MESSAGES = {
    0: "Byron purposefully destroys your manuscript during one of his episodes.",
    1: "Byron accidentally destroys your manuscript during one of his episodes.",
};

const BYRONS_DRAMA_MESSAGES = {
    0: "He needs help reading his fan mail.",
    1: "He brought his pet bear. He is not trained.",
    2: "He wants to read you his poetry.",
    3: "He's in the papers. Again. Which means you are too.",
    4: "He broke up with his latest girlfriend/boyfriend.",
    5: "He's found a new skull to use as a goblet.",
};

const BYRONS_RECREATIONS_MESSAGES = {
    0: "Is he aware the walls are exceptionally thin?",
    1: "He's made a mess of your desk in the process of his recreations.",
    2: "May he borrow your husband? Of course.",
    3: "His half-sister is here, and they are <i>far</i> too intimate.",
    4: "You weary of listening to his exploits.",
    5: "He makes an excellent muse on occasion.",
};

const BRIEF_REDOUBT_MESSAGES = {
    0: "Time alone. Blissful time.",
    1: "He's busy with a paramour.",
    2: "A walk around the house! Underwear on our heads!",
    3: "He has an excellent supply of contraband substances.",
    4: "Wine! A chest of wine!",
    5: "He passed out in his study.",
};

const EVENT_TYPES = {
    Special: "Special",
    Recreation: "Recreation",
    Drama: "Drama",
    Redoubt: "Redoubt",
};

const EVENTS = {
    Special: [
        { scandal: 0, masterpiece: -999, stress: 0, message: SPECIAL_MESSAGES[0] },
        { scandal: 0, masterpiece: -999, stress: 0, message: SPECIAL_MESSAGES[1] },
    ],
    Recreation: [
        { scandal: 0, masterpiece: 0, stress: 1, message: BYRONS_RECREATIONS_MESSAGES[0] },
        { scandal: 0, masterpiece: -1, stress: 0, message: BYRONS_RECREATIONS_MESSAGES[1] },
        { scandal: 1, masterpiece: 0, stress: -1, message: BYRONS_RECREATIONS_MESSAGES[2] },
        { scandal: 2, masterpiece: 0, stress: 0, message: BYRONS_RECREATIONS_MESSAGES[3] },
        { scandal: 0, masterpiece: 0, stress: 1, message: BYRONS_RECREATIONS_MESSAGES[4] },
        { scandal: 0, masterpiece: 2, stress: -1, message: BYRONS_RECREATIONS_MESSAGES[5] },
    ],
    Drama: [
        { scandal: 0, masterpiece: 0, stress: 1, message: BYRONS_DRAMA_MESSAGES[0] },
        { scandal: 0, masterpiece: 0, stress: 2, message: BYRONS_DRAMA_MESSAGES[1] },
        { scandal: 0, masterpiece: 0, stress: 3, message: BYRONS_DRAMA_MESSAGES[2] },
        { scandal: 1, masterpiece: 0, stress: 0, message: BYRONS_DRAMA_MESSAGES[3] },
        { scandal: 2, masterpiece: 0, stress: 0, message: BYRONS_DRAMA_MESSAGES[4] },
        { scandal: 3, masterpiece: 0, stress: 0, message: BYRONS_DRAMA_MESSAGES[5] },
    ],
    Redoubt: [
        { scandal: 0, masterpiece: 1, stress: 0, message: BRIEF_REDOUBT_MESSAGES[0] },
        { scandal: 0, masterpiece: 0, stress: -1, message: BRIEF_REDOUBT_MESSAGES[1] },
        { scandal: 1, masterpiece: 0, stress: 0, message: BRIEF_REDOUBT_MESSAGES[2] },
        { scandal: 1, masterpiece: 1, stress: 0, message: BRIEF_REDOUBT_MESSAGES[3] },
        { scandal: 0, masterpiece: -1, stress: 0, message: BRIEF_REDOUBT_MESSAGES[4] },
        { scandal: 0, masterpiece: 1, stress: 0, message: BRIEF_REDOUBT_MESSAGES[5] },
    ],
};

class ByronicEventHandler {
    applyEvent(eventType, eventId, player) {
        const event = EVENTS[eventType][eventId];
        this.updatePlayerStats(player, event);
        this.logEvent(event, player);
    }

    updatePlayerStats(player, event) {
        player.editProperty('scandal', event.scandal, player.maxScandal, Scores.Scandal);
        player.editProperty('masterpiece', event.masterpiece, player.maxMasterpiece, Scores.Masterpiece);
        player.editProperty('stress', event.stress, player.maxStress, Scores.Stress);
        this.updateStats(player);
    }

    logEvent(event, player) {
        const message = `
            <div>
                <p><strong>Day ${player.dayNumber}</strong></p>
                <p><strong>Event:</strong> ${event.message}</p>
                <p><strong>Effects:</strong></p>
                <ul>
                    <li>Scandal: ${player.scandal} (${event.scandal >= 0 ? '+' : ''}${event.scandal})</li>
                    <li>Masterpiece: ${player.masterpiece} (${event.masterpiece >= 0 ? '+' : ''}${event.masterpiece})</li>
                    <li>Stress: ${player.stress} (${event.stress >= 0 ? '+' : ''}${event.stress})</li>
                </ul>
            </div>
            <hr style="margin: 10px 0; border: 1px solid #ddd;">
        `;

        const logElement = document.getElementById('log');
        logElement.innerHTML = message + logElement.innerHTML;
    }

    updateStats(player) {
        document.getElementById('scandal').textContent = `Scandal: ${player.scandal}`;
        document.getElementById('masterpiece').textContent = `Masterpiece: ${player.masterpiece}`;
        document.getElementById('stress').textContent = `Stress: ${player.stress}`;
    }
}
