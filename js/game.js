const player = new Player();
const byronicEvent = new ByronicEvent();


function triggerEvent(eventType, eventId) {
    byronicEvent.applyEvent(eventType, eventId, player);
}
