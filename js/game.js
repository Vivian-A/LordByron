
const DISASTER_MUSE_LIMIT = 3;


let sixesInARow = 0;


const player = new Player();
const byronicEventHandler = new ByronicEventHandler();

function triggerEvent(eventType, eventId) {
    byronicEventHandler.applyEvent(eventType, eventId, player);
}

function rollEvents() {
    if (player.GameOvered) {
        return;
    }

    const diceRoll = getRandomInt(0, 6);

    sixesInARow = (diceRoll === 5) ? sixesInARow + 1 : 0;

    if (sixesInARow >= DISASTER_MUSE_LIMIT) {
        byronicEventHandler.applyEvent(EVENT_TYPES.Special, getRandomInt(0, 3), player);
    }

    const category = getEventCategory(diceRoll);
    byronicEventHandler.applyEvent(category, getRandomInt(0, EVENTS[category].length), player);
    
    player.dayNumber++;
    console.log(`Dice Roll: ${diceRoll}`);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function getEventCategory(diceRoll) {
    if (diceRoll <= 1) {
        return EVENT_TYPES.Recreation;
    } else if (diceRoll <= 3) {
        return EVENT_TYPES.Drama;
    } else {
        return EVENT_TYPES.Redoubt;
    }
}
