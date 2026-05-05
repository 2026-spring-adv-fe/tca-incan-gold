import {useNavigate} from "react-router";

const Home = () => {

    const nav = useNavigate();

    return (
        <>
            <h1>Home</h1>
            <button className="btn btn-primary" onClick={() => nav("/setup")}>Play</button>
        </>
    )
}

export default Home;
