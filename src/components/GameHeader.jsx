import { Link } from "react-router-dom";
import Score from "./Score";
import ThemeToggle from "./ThemeToggle";
import { useThemeContext } from "../context/theme_context";


export default function GameHeader() {
    const { isDarkTheme } = useThemeContext();

    const exitButtonStyleClass = isDarkTheme ?
        "game-header--exit-button button_dark-theme"
        : "game-header--exit-button";


    return (
        <div className="game-header">
            <div className="game-header--buttons">
                <Link to="/" className={exitButtonStyleClass}>Exit Game</Link>
                <ThemeToggle />
            </div>
            <Score />
        </div>
    )
}