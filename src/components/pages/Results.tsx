import {useNavigate} from "react-router";
import {useEffect} from "react";

import Card from "../Card.tsx";

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
            <Card>
                <span>Riskiest Player: <span>{gameStats.riskiestPlayer}</span></span>
                <span>Most Deaths: <span>{gameStats.mostDeadPlayer}</span></span>
                <span>Most Successful Exits: <span>{gameStats.mostAlivePlayer}</span></span>
            </Card>
            <button className="btn btn-lg btn-soft btn-primary w-full" onClick={() => nav("/")}>Home
            </button>
        </>
    )
}

export default Results;
