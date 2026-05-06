import type {Game, GameRound, PlayerRound} from "./Game.ts";
import {durationFormatter} from "human-readable";

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

    totalGems: number,
    totalTurns: number,
    totalDeaths: number
}

type GeneralFacts = {
    lastPlayed: string,
    totalGames: number,
    shortestGame: string,
    longestGame: string
}

type Leaderboard = {
    name: string,
    score: number
}[];

function CreateEmptyGeneralFacts(): GeneralFacts {
    return {
        lastPlayed: "N/A",
        totalGames: 0,
        shortestGame: "N/A",
        longestGame: "N/A"
    };
}

function CalculateGeneralFacts(games: Game[]): GeneralFacts {
    console.log(games);
    const facts: GeneralFacts = CreateEmptyGeneralFacts();
    let lastPlayedTime = 0;
    let shortestGameTime = Number.MAX_VALUE;
    let longestGameTime = 0;
    facts.totalGames = games.length;
    games.forEach((game: Game) => {
        if (game.startTime > lastPlayedTime) {
            lastPlayedTime = game.startTime;
        }
        const gameLength = game.endTime - game.startTime;
        if (gameLength > longestGameTime) {
            longestGameTime = gameLength;
        }
        if (gameLength < shortestGameTime) {
            shortestGameTime = gameLength;
        }
    });
    if (lastPlayedTime != 0) facts.lastPlayed =  new Date(lastPlayedTime).toLocaleString();
    if (longestGameTime != 0) facts.longestGame = durationFormatter<string>()(longestGameTime);
    if (shortestGameTime != Number.MAX_VALUE) facts.shortestGame = durationFormatter<string>()(shortestGameTime);
    return facts;
}

function CreateEmptyLeaderboard(): Leaderboard {
    return [];
}

function CreateEmptyGameStats(): GameStats {
    return {
        gemsPerRound: [],
        turnsPerRound: [],
        mostDeadPlayer: "",
        mostAlivePlayer: "",
        riskiestPlayer: "",
        totalDeaths: 0,
        totalGems: 0,
        totalTurns: 0
    };
}

function CalculateGameStats(game: Game): GameStats {
    const stats: GameStats = CreateEmptyGameStats();

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

            stats.totalGems += player.gems;
            stats.totalTurns += player.turns;
            if (player.endedInDeath) {
                stats.totalDeaths++;
            }

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

export type {GameStats, GeneralFacts, Leaderboard};
export {CalculateGameStats, CreateEmptyGameStats, CreateEmptyGeneralFacts, CreateEmptyLeaderboard, CalculateGeneralFacts};
