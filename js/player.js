const Scores = {
    Scandal: "Scandal",
    Masterpiece: "Masterpiece",
    Stress: "Stress",
};

const GAME_OVER_MESSAGES = {
    [Scores.Scandal]: "You are no longer fit to enter society and must flee to nurse your reputation.",
    [Scores.Masterpiece]: "You create a new genre of supernatural horror fiction based on your time with Byron.",
    [Scores.Stress]: "You lose your patience with the man and either kill him in a fit of rage or otherwise descend into uncontrollable weeping from which you never emerge.",
};

class Player {
    #scandal;
    #masterpiece;
    #stress;
    GameOvered = false;
    dayNumber = 1;

    constructor({ scandal = 0, masterpiece = 0, stress = 0, maxScandal = 10, maxMasterpiece = 10, maxStress = 10 } = {}) {
        this.#scandal = scandal;
        this.#masterpiece = masterpiece;
        this.#stress = stress;
        this.maxScandal = maxScandal;
        this.maxMasterpiece = maxMasterpiece;
        this.maxStress = maxStress;
    }

    get scandal() {
        return this.#scandal;
    }

    set scandal(value) {
        this.#scandal = Math.max(0, value);
    }

    get masterpiece() {
        return this.#masterpiece;
    }

    set masterpiece(value) {
        this.#masterpiece = Math.max(0, value);
    }

    get stress() {
        return this.#stress;
    }

    set stress(value) {
        this.#stress = Math.max(0, value);
    }

    editProperty(propertyName, amount, maxProperty, scoreType) {
        if (this[propertyName] === undefined) {
            console.error(`Property ${propertyName} does not exist.`);
            return;
        }

        this[propertyName] = Math.min(Math.max(this[propertyName] + amount, 0), maxProperty);
        
        if (this[propertyName] === maxProperty) {
            this.gameOver(scoreType);
        }
    }

    gameOver(breakingPoint) {
        this.GameOvered = true;
        const alertContainer = document.getElementById('alert-container');
        const isSuccess = breakingPoint === Scores.Masterpiece;

        alertContainer.innerHTML = `
            <div class="flex items-center justify-between p-4 mb-4 rounded-lg shadow-lg ${isSuccess ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}">
                <div class="flex items-center">
                    <svg class="w-6 h-6 ${isSuccess ? 'text-green-200' : 'text-red-200'}" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        ${isSuccess
                            ? `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />`
                            : `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />`
                        }
                    </svg>
                    <p class="ml-3 text-sm font-medium">${GAME_OVER_MESSAGES[breakingPoint] || "You win, somehow."}</p>
                </div>
                <button onclick="location.reload()" type="button" class="ml-3 p-2 rounded-lg bg-white text-gray-500 hover:bg-gray-100 focus:ring-2 focus:ring-gray-300">
                    Start over
                </button>
            </div>
        `;
    }
}
