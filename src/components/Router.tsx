import {BrowserRouter, Routes, Route} from "react-router";

import Home from "./pages/Home.tsx";
import Setup from "./pages/Setup.tsx";
import Play from "./pages/Play.tsx";

const Router = () => {
  return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/setup" element={<Setup />} />
            <Route path="/play" element={<Play />} />
        </Routes>
      </BrowserRouter>
  )
};

export default Router;
