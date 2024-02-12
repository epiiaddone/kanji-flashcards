import { Link } from "react-router-dom";
import { useLessonContext } from "../context/lesson_context";
import { useThemeContext } from "../context/theme_context";
import { getScoreColorClassName } from "../utils/scoreColors";

export default function GameOver() {
    const { isDarkTheme } = useThemeContext();
    const { isGameOver, correctPercent, gameOverClicked } = useLessonContext();

    if (!isGameOver) return;

    const percentColorClass = getScoreColorClassName(correctPercent, 'text')

    return (
        <div className={isDarkTheme ? "game-over dark-theme" : "game-over"}>
            <div className={percentColorClass + " game-over__percent"}>{correctPercent}%</div>
            <div
                onClick={gameOverClicked}>
                <Link
                    to="/"
                    className={isDarkTheme ? "game-over__button button_dark-theme" : "game-over__button"}
                >
                    Home</Link>
            </div>
        </div>
    )
}