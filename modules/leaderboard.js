export class Leaderboard {

    leaderboardData = [
        { name: "Player 1", score: 100 },
        { name: "Player 2", score: 90 },
        { name: "Player 3", score: 80 },
        { name: "Player 4", score: 90 },
        { name: "Player 5", score: 10 },
        { name: "Player 6", score: 12 },
        { name: "Player 7", score: 1 },
        { name: "Player 8", score: 5 },
        { name: "Player 9", score: 250 },
        { name: "Player 10", score: 40 }
    ];
    #table

    constructor() {
        this.#table = document.querySelector("#leaderboard tbody");
        this.#table.innerHTML = "";
        this.renderLeaderboard();
    }

    // Function to render leaderboard
    renderLeaderboard() {
        this.#table.innerHTML = "";
        this.leaderboardData.sort((a, b) => b.score - a.score);
        this.leaderboardData.forEach((player, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td></td>
                <td>${player.name}</td>
                <td>${player.score}</td>
            `;
            this.#table.appendChild(row);
        });
    }

    // Function to add a new player to the leaderboard
    addPlayer(name, score) {
        this.leaderboardData.push({ name, score });
        this.leaderboardData.sort((a, b) => b.score - a.score); // Sort players by score
        this.renderLeaderboard();
    }
}