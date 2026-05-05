import {useNavigate} from "react-router";
import {useEffect} from "react";

const Setup = ({setTitle}: {setTitle: (newTitle: string) => void }) => {

    useEffect(() => {
        setTitle("Setup Game");
    });


    const nav = useNavigate();

    return (
        <>
            <h1>Setup</h1>
            <button className="btn btn-soft btn-warning" onClick={() => nav("/")}>Cancel</button>
            <button className="btn btn-primary" onClick={() => nav("/play")}>Play</button>
        </>
    )
}

export default Setup;
