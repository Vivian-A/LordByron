const BYRONS_DRAMA_MESSAGES = {
    0:"He needs help reading his fan mail.",
    1:"He brought his pet bear. He is not trained.",
    2:"He wants to read you his poetry.",
    3:"He's in the papers. Again. Which means you are too.",
    4:"He broke up with his latest girlfriend/boyfriend.",
    5:"He's found a new skull to use as a goblet.",
}


const BYRONS_RECREATIONS_MESSAGES = {
    0: "Is he aware the walls are exceptionally thin?",
    1: "He's made a mess of your desk in the process.",
    2: "May he borrow your husband? Of course.",
    3: "His half-sister is here, and they are <i>far</i> too intimate.",
    4: "You weary of listening to his exploits.",
    5: "He makes an excellent muse on occasion."
};
const BRIEF_REDOUBT_MESSAGES = {
    0:"Time alone. Blissful time.",
    1:"He's busy with a paramour.",
    2:"A walk around the house! Underwear on our heads!",
    3:"He has an excellent supply of contraband substances.",
    4:"Wine! A chest of wine!",
    5:"He passed out in his study.",
}
const EVENTS = {
    Recreation: [
        { scandal: 0, masterpiece: 0, stress: 1, message: BYRONS_DRAMA_MESSAGES[0] },
        { scandal: 0, masterpiece: -1, stress: 0, message: BYRONS_DRAMA_MESSAGES[1] },
        { scandal: 1, masterpiece: 0, stress: -1, message: BYRONS_DRAMA_MESSAGES[2] },
        { scandal: 2, masterpiece: 0, stress: 0, message: BYRONS_DRAMA_MESSAGES[3] },
        { scandal: 0, masterpiece: 0, stress: 1, message: BYRONS_DRAMA_MESSAGES[4] },
        { scandal: 0, masterpiece: 2, stress: -1, message: BYRONS_DRAMA_MESSAGES[5] }
    ],
    Drama: [
        { scandal: 0, masterpiece: 0, stress: 1, message: BYRONS_RECREATIONS_MESSAGES[0] },
        { scandal: 0, masterpiece: 0, stress: 2, message: BYRONS_RECREATIONS_MESSAGES[1] },
        { scandal: 0, masterpiece: 0, stress: 3, message: BYRONS_RECREATIONS_MESSAGES[2] },
        { scandal: 1, masterpiece: 0, stress: 0, message: BYRONS_RECREATIONS_MESSAGES[3] },
        { scandal: 2, masterpiece: 0, stress: 0, message: BYRONS_RECREATIONS_MESSAGES[4] },
        { scandal: 3, masterpiece: 0, stress: 0, message: BYRONS_RECREATIONS_MESSAGES[5] }
    ],
    Redoubt: [
        { scandal: 0, masterpiece: 1, stress: 0, message: BRIEF_REDOUBT_MESSAGES[0] },
        { scandal: 0, masterpiece: 0, stress: -1, message: BRIEF_REDOUBT_MESSAGES[1] },
        { scandal: 1, masterpiece: 0, stress: 0, message: BRIEF_REDOUBT_MESSAGES[2] },
        { scandal: 1, masterpiece: 1, stress: 0, message: BRIEF_REDOUBT_MESSAGES[3] },
        { scandal: 0, masterpiece: -1, stress: 0, message: BRIEF_REDOUBT_MESSAGES[4] },
        { scandal: 0, masterpiece: 1, stress: 0, message: BRIEF_REDOUBT_MESSAGES[5] }
    ]
};

class ByronicEvent
{
    applyEvent(eventType, eventId, player) {
        const effects = EVENTS[eventType][eventId];
        player.scandal += effects.scandal;
        player.masterpiece += effects.masterpiece;
        player.stress += effects.stress;
        // make a message for the effects that we've applied to the player
        const message = `${effects.message} \n\nEffects:\nScandal: ${player.scandal} (${effects.scandal >= 0 ? '+' : ''}${effects.scandal})\n` +
        `Masterpiece: ${player.masterpiece} (${effects.masterpiece >= 0 ? '+' : ''}${effects.masterpiece})\n` +
        `Stress: ${player.stress} (${effects.stress >= 0 ? '+' : ''}${effects.stress})`;

        console.log(message);
    }
}

