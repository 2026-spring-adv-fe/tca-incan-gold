import Card from "./Card.tsx";

import type {GameRound} from "../data/Game.ts";

type PlayerRowProps = {
    player: number,
    currentRound: GameRound,
    setCurrentRound: (newRound: GameRound) => void
}

const PlayerRow = ({player, currentRound, setCurrentRound}: PlayerRowProps) => {

    const setAlive = (alive: boolean) => {
        const newRound: GameRound = {...currentRound};
        newRound.players[player].endedInDeath = !alive;
        setCurrentRound(newRound);
    }

    const setGems = (gems: number) => {
        const newRound: GameRound = {...currentRound};
        newRound.players[player].gems = isNaN(gems) ? 0 : Math.max(0, gems);
        setCurrentRound(newRound);
    }

    const setTurns = (turns: number) => {
        const newRound: GameRound = {...currentRound};
        newRound.players[player].turns = isNaN(turns) ? 0 : Math.max(0, turns);
        setCurrentRound(newRound);
    }

    return (
        <Card key={player}>
            <h1 className="text-xl font-black">🧍 {currentRound.players[player].name}</h1>
            <div className="grid grid-cols-2 gap-2">
                <label className="input w-full">
                    💎
                    <input type="number" placeholder="Gems" min={0} value={currentRound.players[player].gems}
                           onChange={(e) => {
                               setGems(parseInt(e.target.value));
                           }}/>
                </label>
                <label className="input w-full">
                    🔁
                    <input type="number" placeholder="Turns" min={0} value={currentRound.players[player].turns}
                           onChange={(e) => {
                               setTurns(parseInt(e.target.value));
                           }}/>
                </label>
            </div>
            <div className="join grid grid-cols-2">
                <button
                    className={currentRound.players[player].endedInDeath ? "join-item btn" : "join-item btn btn-success btn-active"}
                    onClick={() => {
                        setAlive(true);
                    }}>Alive
                </button>
                <button
                    className={!currentRound.players[player].endedInDeath ? "join-item btn" : "join-item btn btn-error btn-active"}
                    onClick={() => {
                        setAlive(false);
                    }}>Dead
                </button>
            </div>

        </Card>
    );
}

export default PlayerRow;
