import {Outlet} from "react-router";

import ThemeButton from "./ThemeButton.tsx";

const DEFAULT_TITLE = "TCA Incan Gold";

type HeaderProps = {
    theme: string,
    setTheme: (newTheme: string) => void,
    title: string
};

const Header = ({theme, setTheme, title}: HeaderProps) => {
    return (
        <div>
            <div className="navbar bg-base-100 px-5 shadow-base-200">
                <div className="flex-1">
                    <h1 className="text-xl">{title}</h1>
                </div>
                <div className="flex-none">
                    <ThemeButton theme={theme} setTheme={setTheme}/>
                </div>
            </div>
            <div className="p-3">
                <Outlet/>
            </div>
        </div>
    );
}

export default Header;
export {DEFAULT_TITLE};
