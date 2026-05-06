import {useNavigate} from "react-router";
import {useEffect, useState} from "react";

import Card from "../Card.tsx";

import {createEmptyGame, type Game, MAX_PLAYERS, MIN_PLAYERS} from "../../data/Game.ts";

type SetupProps = {
    setTitle: (newTitle: string) => void,
    setCurrentGame: (newGame: Game) => void
};

const Setup = ({setTitle, setCurrentGame}: SetupProps) => {

    const [players, setPlayers] = useState<string[]>([]);
    const [newPlayerName, setNewPlayerName] = useState("");

    useEffect(() => {
        setTitle("Setup Game");
    });

    const startGame = () => {
        const game: Game = createEmptyGame();
        game.players = players;
        setCurrentGame(game);
        nav("/play");
    };

    const nav = useNavigate();

    return (
        <>
            <Card>
                <h2 className="text-lg font-bold">Players</h2>
                <ul>
                    {
                        players.map((player) => {
                            return (<li key={player}>
                                {player}
                                <button className="btn btn-circle" onClick={() => {
                                    setPlayers(players.filter((filterPlayer) => player !== filterPlayer));
                                }}>🗑
                                </button>
                            </li>);
                        })
                    }
                </ul>
                <div className="flex gap-2">
                    <input type="text" placeholder="New Player" className="input w-full" value={newPlayerName}
                           onChange={(e) => {
                               setNewPlayerName(e.target.value);
                           }} disabled={players.length >= MAX_PLAYERS}/>
                    <button className="btn btn-soft w-fit"
                            disabled={newPlayerName.length == 0 || players.length >= MAX_PLAYERS} onClick={() => {
                        setPlayers([...new Set([...players, newPlayerName.trim()])]); // prevents duplicates
                        setNewPlayerName("");
                    }}>Add
                    </button>
                </div>
            </Card>

            <div className="flex flex-col gap-2">
                <button className="btn btn-lg btn-primary w-full" onClick={startGame}
                        disabled={players.length < MIN_PLAYERS || players.length > MAX_PLAYERS}>Play
                </button>
                <button className="btn btn-lg btn-soft btn-warning w-full" onClick={() => nav("/")}>Cancel</button>
            </div>

            <br/>
            <button className="btn btn-secondary" onClick={() => {
                setPlayers(["a", "b", "c"]);
            }}>Testing Players</button>
        </>
    )
}

export default Setup;
