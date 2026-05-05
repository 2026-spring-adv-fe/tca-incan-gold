import type {Game, GameRound, PlayerRound} from "./Game.ts";

type MinMaxAverage = {
    min: number,
    max: number,
    average: number
}

type GameStats = {
    /// Min, Max, and Avg. gems/round for all players
    gemsPerRound: MinMaxAverage[],
    /// Min, Max, and Avg. turns/round for all players
    turnsPerRound: MinMaxAverage[],
    /// Player with the most deaths
    mostDeadPlayer: string,
    /// Player with the least deaths
    mostAlivePlayer: string,
    /// Player that lasted the longest WHILE SURVIVING
    riskiestPlayer: string,
}

function CalculateGameStats(game: Game): GameStats {
    const stats: GameStats = {
        gemsPerRound: [],
        turnsPerRound: [],
        mostDeadPlayer: "",
        mostAlivePlayer: "",
        riskiestPlayer: ""
    };

    const playerDeaths: { [key: string]: number } = {};
    const playerLives: { [key: string]: number } = {};
    const playerSurvivingTurns: { [key: string]: number } = {};

    game.rounds.forEach((round: GameRound): void => {
        const gems: MinMaxAverage = {
            min: Number.MAX_VALUE,
            max: 0,
            average: 0
        };
        const turns: MinMaxAverage = {
            min: Number.MAX_VALUE,
            max: 0,
            average: 0
        }
        round.players.forEach((player: PlayerRound): void => {

            if (!(player.name in playerDeaths)) {
                playerDeaths[player.name] = 0;
                playerLives[player.name] = 0;
                playerSurvivingTurns[player.name] = 0;
            }
            if (player.endedInDeath) {
                playerDeaths[player.name]++;
            } else {
                playerLives[player.name]++;
                playerSurvivingTurns[player.name] += player.turns;
            }

            gems.average += player.gems;
            if (player.gems > gems.max) {
                gems.max = player.gems;
            }
            if (player.gems < gems.min) {
                gems.min = player.gems;
            }

            turns.average += player.turns;
            if (player.turns > turns.max) {
                turns.max = player.turns;
            }
            if (player.turns < turns.min) {
                turns.min = player.turns;
            }
        });
        gems.average /= round.players.length;
        stats.gemsPerRound.push(gems);
        turns.average /= round.players.length;
        stats.turnsPerRound.push(turns);
    });

    Object.keys(playerDeaths).forEach((key: string): void => {
        if (stats.mostDeadPlayer == "" || playerDeaths[stats.mostDeadPlayer] < playerDeaths[key]) {
            stats.mostDeadPlayer = key;
        }

        if (stats.mostAlivePlayer == "" || playerLives[stats.mostAlivePlayer] < playerLives[key]) {
            stats.mostAlivePlayer = key;
        }

        if (stats.riskiestPlayer == "" || playerSurvivingTurns[stats.riskiestPlayer] < playerSurvivingTurns[key]) {
            stats.riskiestPlayer = key;
        }
    });

    return stats;
}

export type {GameStats};
export {CalculateGameStats};
