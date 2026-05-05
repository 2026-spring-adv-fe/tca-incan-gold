import {useNavigate} from "react-router";
import {useEffect} from "react";

const Home = ({setTitle}: {setTitle: (newTitle: string) => void }) => {

    const nav = useNavigate();

    useEffect(() => {
       setTitle("Home");
    });

    return (
        <>
            <h1>Home</h1>
            <button className="btn btn-primary" onClick={() => nav("/setup")}>Play</button>
        </>
    )
}

export default Home;
