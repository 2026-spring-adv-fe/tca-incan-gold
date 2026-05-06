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

    const nextRound = () => {
        const game: Game = {...currentGame};
        game.rounds.push(currentRound);
        setCurrentGame(game);
        setCurrentRound(createEmptyRound(currentGame.players));
        if (currentGame.rounds.length == NUM_ROUNDS) {
            setGames([...games, currentGame]);
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
                        onClick={nextRound}>{currentGame.rounds.length == NUM_ROUNDS - 1 ? "Save Game" : "Next Round"}</button>
                <button className="btn btn-lg btn-soft btn-warning w-full" onClick={() => nav("/")}>Discard Game
                </button>
            </div>
        </>
    )
}

export default Play;
