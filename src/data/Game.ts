type PlayerRound = {
    /// Which player this is for
    name: string,
    /// Number of gems earned
    gems: number,
    /// Number of turns taken
    turns: number,
    /// Whether this player died
    endedInDeath: boolean
}

type GameRound = {
    /// Player statistics for the current round
    players: PlayerRound[],
}

type Game = {
    /// All players in the game
    players: string[],
    /// The rounds in the game
    rounds: GameRound[],
    /// When the game started
    startTime: number,
    /// When the game ended
    endTime: number
};

const createEmptyGame = (): Game => {
    return {
        players: [],
        rounds: [],
        startTime: Date.now(),
        endTime: 0
    };
};

const createEmptyRound = (players: string[]): GameRound => {
    const round: GameRound = {
        players: []
    };
    players.forEach((player) => {
       round.players.push({
           name: player,
           gems: 0,
           turns: 0,
           endedInDeath: false
       });
    });
    return round;
}

const MIN_PLAYERS = 3;
const MAX_PLAYERS = 5;
const NUM_ROUNDS = 5;

export {createEmptyGame, createEmptyRound, MIN_PLAYERS, MAX_PLAYERS, NUM_ROUNDS};
export type {Game, GameRound, PlayerRound};
