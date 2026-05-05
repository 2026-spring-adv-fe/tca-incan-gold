import {BrowserRouter, Routes, Route} from "react-router";
import {useState} from "react";

import Home from "./pages/Home.tsx";
import Setup from "./pages/Setup.tsx";
import Play from "./pages/Play.tsx";

import type {Game} from "../data/Game.ts";
import {DEFAULT_THEME} from "./ThemeButton.tsx";
import Header, {DEFAULT_TITLE} from "./Header.tsx";

const App = () => {

    const [games, setGames] = useState<Game[]>([]);

    const [theme, setTheme] = useState(DEFAULT_THEME);
    const [title, setTitle] = useState(DEFAULT_TITLE);

    return (
        <div data-theme={theme} className='min-h-screen'>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Header theme={theme} setTheme={setTheme} title={title} />}>
                        <Route path="/" element={<Home setTitle={setTitle}/>}/>
                        <Route path="/setup" element={<Setup setTitle={setTitle}/>}/>
                        <Route path="/play" element={<Play setTitle={setTitle}/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
