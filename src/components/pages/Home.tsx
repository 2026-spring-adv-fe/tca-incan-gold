import {useNavigate} from "react-router";
import {useEffect} from "react";

import Card from "../Card.tsx";

type HomeProps = {
    setTitle: (newTitle: string) => void
}

const Home = ({setTitle}: HomeProps) => {

    const nav = useNavigate();

    useEffect(() => {
        setTitle("Home");
    });

    return (
        <>
            <Card>
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold">
                        blah
                    </h1>
                    <p className="opacity-80 max-w-2xl">
                        gaming
                    </p>
                </div>

                <button className="btn btn-primary btn-lg w-full" onClick={() => nav('/setup')}>
                    Start a Game
                </button>
            </Card>

            <p>stats and leaderboards coming soon™</p>

        </>
    )
}

export default Home;
