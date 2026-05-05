import {Outlet} from "react-router";
import ThemeButton from "./ThemeButton.tsx";

const DEFAULT_TITLE = "TCA Incan Gold";

const Header = ({theme, setTheme, title}: { theme: string, setTheme: (newTheme: string) => void, title: string }) => {
    return (
        <div>
            <div className="navbar bg-base-300 px-5">
                <div className="flex-1">
                    <span className="text-xl">{title}</span>
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
