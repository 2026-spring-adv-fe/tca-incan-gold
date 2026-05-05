import {CalculateGameStats, type GameStats} from "./data/GameStats.ts";
import './App.css'
import type {Game} from "./data/Game.ts";

function App() {

    const fakeGames: Game[] = [
        {
            players: [
                "John",
                "Tom",
                "SpudLover300"
            ],
            startTime: "",
            endTime: "",
            rounds: [
                {
                    players: [
                        {
                            name: "John",
                            gems: 5,
                            turns: 3,
                            endedInDeath: false
                        },
                        {
                            name: "Tom",
                            gems: 8,
                            turns: 4,
                            endedInDeath: false
                        },
                        {
                            name: "SpudLover300",
                            gems: 0,
                            turns: 6,
                            endedInDeath: true
                        }
                    ]
                },
                {
                    players: [
                        {
                            name: "John",
                            gems: 20,
                            turns: 15,
                            endedInDeath: false
                        },
                        {
                            name: "Tom",
                            gems: 13,
                            turns: 12,
                            endedInDeath: false
                        },
                        {
                            name: "SpudLover300",
                            gems: 0,
                            turns: 20,
                            endedInDeath: true
                        }
                    ]
                },
                {
                    players: [
                        {
                            name: "John",
                            gems: 0,
                            turns: 42,
                            endedInDeath: true
                        },
                        {
                            name: "Tom",
                            gems: 20,
                            turns: 31,
                            endedInDeath: false
                        },
                        {
                            name: "SpudLover300",
                            gems: 0,
                            turns: 42,
                            endedInDeath: true
                        }
                    ]
                }
            ]
        },
        {
            players: [
                "John",
                "Tom"
            ],
            startTime: "",
            endTime: "",
            rounds: [
                {
                    players: [
                        {
                            name: "John",
                            gems: 22,
                            turns: 16,
                            endedInDeath: false
                        },
                        {
                            name: "Tom",
                            gems: 22,
                            turns: 16,
                            endedInDeath: false
                        }
                    ]
                }
            ]
        }
    ];

    const fakeGameStats: GameStats = CalculateGameStats(fakeGames[0]);

    return (
        <>
            <h1>this is my awesome app</h1>
            <pre>
                {JSON.stringify(fakeGameStats, null, "    ")}
            </pre>
        </>
    )
}

export default App
