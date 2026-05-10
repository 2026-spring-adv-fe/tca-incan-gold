import {Outlet} from "react-router";

import ThemeButton from "./ThemeButton.tsx";
import EmailButton from "./EmailButton.tsx";

const DEFAULT_TITLE = "TCA Incan Gold";

type HeaderProps = {
    theme: string,
    setTheme: (newTheme: string) => void,
    title: string,
    email: string,
    setEmail: (newEmail: string) => void
};

const Header = ({theme, setTheme, title, email, setEmail}: HeaderProps) => {
    return (
        <div>
            <div className="navbar bg-base-100 px-5 py-0 shadow-base-200">
                <div className="flex-1">
                    <h1 className="text-xl">{title}</h1>
                </div>
                <div className="flex-none">
                    <EmailButton email={email} setEmail={setEmail} />
                    &ensp;
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
