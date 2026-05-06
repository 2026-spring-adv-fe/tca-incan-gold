import {useNavigate} from "react-router";
import {useEffect} from "react";

import type {Game} from "../../data/Game.ts";
import {CalculateGameStats} from "../../data/GameStats.ts";

type HomeProps = {
    setTitle: (newTitle: string) => void,
    currentGame: Game
}

const Results = ({setTitle, currentGame}: HomeProps) => {

    const gameStats = CalculateGameStats(currentGame);

    const nav = useNavigate();

    useEffect(() => {
        setTitle("Game Results");
    });

    return (
        <>
            <h1 className="text-3xl font-bold">Game Results</h1>
            <div className="stats stats-vertical shadow w-full overflow-hidden max-w-full">
                <div className="stat">
                    <div className="stat-title">Total Gems</div>
                    <div className="stat-value text-success">{gameStats.totalGems}</div>
                </div>
                <div className="stat">
                    <div className="stat-title">Total Turns</div>
                    <div className="stat-value text-secondary">{gameStats.totalTurns}</div>
                </div>
                <div className="stat">
                    <div className="stat-title">Total Deaths</div>
                    <div className="stat-value text-error">{gameStats.totalDeaths}</div>
                </div>
                <div className="stat">
                    <div className="stat-title">Riskiest Player</div>
                    <div className="stat-value text-success">{gameStats.riskiestPlayer}</div>
                </div>
                <div className="stat">
                    <div className="stat-title">Most Successful Exits</div>
                    <div className="stat-value text-secondary">{gameStats.mostAlivePlayer}</div>
                </div>
                <div className="stat">
                    <div className="stat-title">Most Deaths</div>
                    <div className="stat-value text-error">{gameStats.mostDeadPlayer}</div>
                </div>
            </div>
            <h2 className="font-bold my-2">Gems per Round</h2>
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Round</th>
                        <th>Min.</th>
                        <th>Max.</th>
                        <th>Avg.</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        gameStats.gemsPerRound.map((roundGems, roundIndex) => {
                            return (
                                <tr>
                                    <td>{roundIndex + 1}</td>
                                    <td>{roundGems.min}</td>
                                    <td>{roundGems.max}</td>
                                    <td>{roundGems.average.toFixed(0)}</td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </table>
            </div>
            <h2 className="font-bold my-2">Turns per Round</h2>
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Round</th>
                        <th>Min.</th>
                        <th>Max.</th>
                        <th>Avg.</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        gameStats.turnsPerRound.map((roundTurns, roundIndex) => {
                            return (
                                <tr>
                                    <td>{roundIndex + 1}</td>
                                    <td>{roundTurns.min}</td>
                                    <td>{roundTurns.max}</td>
                                    <td>{roundTurns.average.toFixed(0)}</td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </table>
            </div>
            <div className="divider"></div>
            <button className="btn btn-lg btn-soft btn-primary w-full" onClick={() => nav("/")}>Home
            </button>
        </>
    )
}

export default Results;
