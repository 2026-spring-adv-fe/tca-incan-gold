import {useEffect, useState} from "react";
import {useNavigate} from "react-router";

import PlayerRow from "../PlayerRow.tsx";

import {createEmptyRound, type Game, type GameRound, NUM_ROUNDS} from "../../data/Game.ts";

type PlayProps = {
    setTitle: (newTitle: string) => void,
    currentGame: Game,
    setCurrentGame: (newGame: Game) => void,
    games: Game[],
    setGames: (newGames: Game[]) => void
};

const Play = ({setTitle, currentGame, setCurrentGame, games, setGames}: PlayProps) => {

    const [currentRound, setCurrentRound] = useState<GameRound>(createEmptyRound(currentGame.players));

    const nav = useNavigate();

    useEffect(() => {
        setTitle("Play");
    });

    const nextRound = (forceFinish: boolean) => {
        const game: Game = {...currentGame};
        const round: GameRound = {...currentRound};
        round.players.forEach((player) => {
           if (player.endedInDeath) player.gems = 0;
        });
        game.rounds.push(round);
        if (forceFinish || currentGame.rounds.length - 1 == NUM_ROUNDS) {
            game.endTime = Date.now();
        }
        setCurrentGame(game);
        setCurrentRound(createEmptyRound(currentGame.players));
        if (currentGame.rounds.length == NUM_ROUNDS || forceFinish) {
            setGames([...games, game]);
            nav("/results");
        }
    }

    return (
        <>
            <h1 className="text-4xl font-bold">Round {currentGame.rounds.length + 1}/{NUM_ROUNDS}</h1>
            {
                currentRound.players.map((_, i) => {
                    return <PlayerRow player={i} currentRound={currentRound} setCurrentRound={setCurrentRound}/>
                })
            }
            <div className="flex flex-col gap-2">
                <button className="btn btn-lg btn-primary w-full"
                        onClick={() => nextRound(false)}>{currentGame.rounds.length == NUM_ROUNDS - 1 ? "Save Game" : "Next Round"}</button>
                <div className="grid grid-cols-2 gap-2">
                    <button className="btn btn-lg btn-soft btn-error w-full" onClick={() => nav("/")}>Discard Game
                    </button>
                    <button className="btn btn-lg btn-soft btn-warning w-full" onClick={() => nextRound(true)}>Finish Early
                    </button>
                </div>

            </div>
        </>
    )
}

export default Play;
