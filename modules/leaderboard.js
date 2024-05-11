export class Leaderboard {

    leaderboardData = [
        { name: "Zdenek Vlach", score: 250 },
        { name: "Ondrej Zara", score: 100 },
        { name: "Petr Hurtak", score: 90 },
        { name: "Jan Dusek", score: 80 },
        { name: "Player 1", score: 70 },
        { name: "Player 5", score: 10 },
        { name: "Player 6", score: 12 },
        { name: "Player 7", score: 1 },
        { name: "Player 8", score: 5 },
        { name: "Player 11", score: 1 },
        { name: "Player 12", score: 2 },
        { name: "Player 13", score: 3 },
        { name: "Player 14", score: 4 },
        { name: "Player 15", score: 5 },
        { name: "Player 16", score: 6 },
        { name: "Player 17", score: 0 },
        { name: "Player 10", score: 40 }
    ];
    #table

    constructor() {
        this.#table = document.querySelector("#leaderboard tbody");
        this.#table.innerHTML = "";
        this.renderLeaderboard();
    }

    addRow(player, index=null) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index ?? ''}${index ? '.' : ''}</td>
            <td>${player.name}</td>
            <td>${player.score}</td>
        `;
        this.#table.appendChild(row);
    }

    renderLeaderboard() {
        const len = this.leaderboardData.length;
        this.#table.innerHTML = "";
        // Sort leaderboard data
        this.leaderboardData.sort((a, b) => b.score - a.score);
        // Slice to get the top 15 players
        const topPlayers = this.leaderboardData.slice(0, 15);
        // Add top 15 players to the leaderboard
        topPlayers.forEach((player) => {
            this.addRow(player);
        });
    
        // Show last player
        if (len > 15) {
            const lastPlacePlayer = this.leaderboardData[len - 1];
            this.addRow(lastPlacePlayer, len - 1);
        }
    }
    

    // Function to add a new player to the leaderboard
    addPlayer(name, score) {
        this.leaderboardData.push({ name, score });
        this.leaderboardData.sort((a, b) => b.score - a.score); // Sort players by score
        this.renderLeaderboard();
    }
}