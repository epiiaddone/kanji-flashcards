import { useLessonContext } from "../context/lesson_context";
import { useThemeContext } from "../context/theme_context";
import { getScoreColorClassName } from "../utils/scoreColors";

export default function GameOver(){
    const {isDarkTheme} = useThemeContext();
    const {isGameOver, gameOver, correctPercent, selectNext} = useLessonContext();

    if(!isGameOver) return;
    
    const percentColorClass = getScoreColorClassName(correctPercent)

    return(
        <div className={ isDarkTheme ? "game-over dark-theme" : "game-over dark-theme"}>
            <div className={percentColorClass + " game-over__percent"}>{correctPercent}%</div>
            <div
                className={ isDarkTheme ? "game-over__button button_dark-theme" :"game-over__button"}
                onClick={selectNext}>
                    Select Next Level</div>
        </div>
    )
}