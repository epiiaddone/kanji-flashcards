import { useThemeContext } from "../context/theme_context";

export default function GameOver({isQuestionsComplete, correctPercent, onSelectNextClick}){
    const {isDarkTheme} = useThemeContext();
    
    let percentColorClass = 'highlight-wrong-color';
    if(correctPercent > 50) percentColorClass = 'highlight-dont-know-color';
    if(correctPercent > 80) percentColorClass = 'highlight-correct-color';

    if(isQuestionsComplete) return(
        <div className={ isDarkTheme ? "game-over dark-theme" : "game-over dark-theme"}>
            <div className={percentColorClass + " game-over__percent"}>{correctPercent}%</div>
            <div
                className={ isDarkTheme ? "game-over__button button_dark-theme" :"game-over__button"}
                onClick={onSelectNextClick}>
                    Select Next Level</div>
        </div>
    )
}