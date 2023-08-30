
import Score from "./Score";
import KanjiDisplay from "./KanjiDisplay";
import AnswerButtons from "./AnswerButtons";
import LessonSelect from "./LessonSelect";
import GameOver from "./GameOver";
import Header from "./Header";
import ThemeToggle from "./ThemeToggle";

export default function Game(){

    //kanjiDataStats();
    return(
    <div className="game">
    <Header>
        <LessonSelect/>
        <ThemeToggle/>
        <Score/>
    </Header>
    <KanjiDisplay />
    <AnswerButtons/>
    <GameOver/>
    </div>
    );
}