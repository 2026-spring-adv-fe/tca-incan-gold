import {useEffect} from "react";
import {useNavigate} from "react-router";

const Play = ({setTitle}: {setTitle: (newTitle: string) => void }) => {

    useEffect(() => {
        setTitle("Play");
    });

    const nav = useNavigate();

    return (
        <>
            <h1>Play</h1>
            <button className="btn btn-primary" onClick={() => nav("/")}>Home</button>
        </>
    )
}

export default Play;
