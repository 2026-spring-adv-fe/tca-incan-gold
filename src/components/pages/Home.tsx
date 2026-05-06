import {useNavigate} from "react-router";
import {useEffect} from "react";

import Card from "../Card.tsx";
import type {Game} from "../../data/Game.ts";
import {CalculateGeneralFacts, type GeneralFacts} from "../../data/GameStats.ts";

type HomeProps = {
    setTitle: (newTitle: string) => void,
    games: Game[],
    setCurrentGame: (newGame: Game) => void,
}

const Home = ({setTitle, games, setCurrentGame}: HomeProps) => {

    const nav = useNavigate();

    const generalFacts: GeneralFacts = CalculateGeneralFacts(games);

    useEffect(() => {
        setTitle("Home");
    });

    return (
        <>
            <Card>
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold color">
                        Incan Gold Companion
                    </h1>
                    <p className="opacity-80 max-w-2xl">
                        gaming
                    </p>
                </div>

                <button className="btn btn-primary btn-lg w-full" onClick={() => nav('/setup')}>
                    Start a Game
                </button>
            </Card>

            <ul className="list bg-base-100 rounded-box shadow-md">

                <li className="p-4 pb-2 tracking-wide font-bold">Previous Games</li>

                {
                    games.length == 0 ? <li className="list-row opacity-50">No Games</li> : games.map((game, i) => {
                        return (
                            <li className="list-row" key={i}>
                                <div className="list-col-grow">
                                    <div>{new Date(game.startTime).toLocaleString()}</div>
                                    <div className="text-xs uppercase font-semibold opacity-60">{game.players.length} Players</div>
                                </div>
                                <button className="btn btn-circle btn-soft" onClick={() => {
                                    setCurrentGame(game);
                                    nav("/results");
                                }}>
                                    🞂
                                </button>
                            </li>
                        );
                    })
                }

            </ul>

            <ul className="list bg-base-100 rounded-box shadow-md mt-2">
                <li className="p-4 pb-2 tracking-wide font-bold">General Facts</li>
                <li className="list-row">
                    <div className="list-col-grow">
                        <div>Shortest Game</div>
                    </div>
                    {generalFacts.shortestGame}
                </li>
                <li className="list-row">
                    <div className="list-col-grow">
                        <div>Longest Game</div>
                    </div>
                    {generalFacts.longestGame}
                </li>
                <li className="list-row">
                    <div className="list-col-grow">
                        <div>Last Played</div>
                    </div>
                    {generalFacts.lastPlayed}
                </li>
                <li className="list-row">
                    <div className="list-col-grow">
                        <div>Total Games</div>
                    </div>
                    {generalFacts.totalGames}
                </li>
            </ul>

            <p className="mt-2">stats and leaderboards coming soon™</p>

        </>
    )
}

export default Home;
