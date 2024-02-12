import KanjiDisplay from "../components/KanjiDisplay";
import AnswerButtons from "../components/AnswerButtons";
import GameOver from "../components/GameOver";
import GameHeader from "../components/GameHeader";
import { useLessonContext } from "../context/lesson_context";
import { Link } from "react-router-dom";
import { useThemeContext } from "../context/theme_context";

export const GamePage = () => {
    const { isDarkTheme } = useThemeContext();
    const { lesson } = useLessonContext();

    if (!lesson) return (
        <div className="game-page">
            <div>No Lesson Selected</div>
            <Link
                to="/"
                className={isDarkTheme ? "game-over__button button_dark-theme" : "game-over__button"}
            >Home</Link>
        </div>
    )

    //kanjiDataStats();
    return (
        <>
            <GameHeader />
            <KanjiDisplay />
            <AnswerButtons />
            <GameOver />
        </>
    );
}
