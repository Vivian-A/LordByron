const Scores = {
    Scandal,
    Masterpiece,
    Stress,
}
const GAME_OVER_MESSAGES = {
    [Scores.Scandal]: "You are no longer fit to enter society and must flee to nurse your reputation.",
    [Scores.Masterpiece]: "You create a new genre of supernatural horror fiction based on your time with Byron.",
    [Scores.Stress]: "You lose your patience with the man and either kill him in a fit of rage or otherwise descend into uncontrollable weeping from which you never emerge."
};
class Player {
    #scandal = 0;
    #masterpiece = 0;
    #stress = 0;

    constructor({ scandal = 0, masterpiece = 0, stress = 0, maxScandal = 10, maxMasterpiece = 10, maxStress = 10 } = {}) {
        this.#scandal = scandal;
        this.#masterpiece = masterpiece;
        this.#stress = stress;
        this.maxScandal = maxScandal;
        this.maxMasterpiece = maxMasterpiece;
        this.maxStress = maxStress;
    }
    
    // this is almost all boilerplate
    get scandal() {
        return this.#scandal;
    }

    set scandal(value) {
        this.#scandal = value;
    }

    get masterpiece() {
        return this.#masterpiece;
    }

    set masterpiece(value) {
        this.#masterpiece = value;
    }

    get stress() {
        return this.#stress;
    }

    set stress(value) {
        this.#stress = value;
    }
    
    editProperty(propertyName, amount, maxProperty, scoreType) {
        this[propertyName] += amount;
        if (this[propertyName] >= maxProperty) {
            this.gameOver(scoreType);
        }
    }
    
    editScandal(amount) {
        this.editProperty('#scandal', amount, this.maxScandal, Scores.Scandal);
    }
    
    editMasterpiece(amount) {
        this.editProperty('#masterpiece', amount, this.maxMasterpiece, Scores.Masterpiece);
    }
    
    editStress(amount) {
        this.editProperty('#stress', amount, this.maxStress, Scores.Stress);
    }

    gameOver(breakingPoint) {
        console.log(GAME_OVER_MESSAGES[breakingPoint] || "You win, somehow.");
    }

}