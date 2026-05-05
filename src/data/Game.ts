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
    startTime: string,
    /// When the game ended
    endTime: string
};

export type {Game, GameRound, PlayerRound};
