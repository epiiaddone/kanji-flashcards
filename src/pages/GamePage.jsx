import Score from "../components/Score";
import KanjiDisplay from "../components/KanjiDisplay";
import AnswerButtons from "../components/AnswerButtons";
import GameOver from "../components/GameOver";
import Header from "../components/Header";
import ThemeToggle from "../components/ThemeToggle";

export const GamePage = () => {

    //kanjiDataStats();
    return (
        <div className="game">
            <Header>
                <ThemeToggle />
                <Score />
            </Header>
            <KanjiDisplay />
            <AnswerButtons />
            <GameOver />
        </div>
    );
}
