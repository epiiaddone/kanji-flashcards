import Score from "./Score";
import KanjiDisplay from "./KanjiDisplay";
import AnswerButtons from "./AnswerButtons";
import LessonSelect from "./LessonSelect";
import { useState } from "react";
import heisig_kanji_map from "./kanji-data-map";
import heisig_kanji from "./kanji-data";
import shuffleArray from "../shuffleArray";
import { useEffect } from "react";
import GameOver from "./GameOver";
import Header from "./Header";
import kanjiDataStats from "./kanji-data-stats";
import { HighlightContext } from "../HighlightContext";
import ThemeToggle from "./ThemeToggle";

export default function Game(){

    kanjiDataStats();

    const [lesson, setLesson] = useState('1');
    const [correctCount, setCorrectCount] = useState(0);
    const [falseCount, setFalseCount] = useState(0);
    const [questionOrder, setQuestionOrder] = useState([1]);
    const [answerOrder, setAnswerOrder] = useState([1]);
    const [answersActive, setAnswersActive] = useState(true);
    const [highlight, setHighlight] = useState('');
    const [gameVisible, setGameVisible] = useState(true);

    //this is internal to LessonSelect, i don't think it should be in the parent
    const [selectLessonVisible, setSelectLessonVisible] = useState(false);

    const answerDelay = 1000;

    useEffect(()=>{
        const tempArray1 = [];
        const tempArray2 = [];
        let counter = 0;
        console.log('in useEffect');
        heisig_kanji[lesson].map(item => {
            tempArray1.push(counter);
            tempArray2.push(counter++);
    });
        shuffleArray(tempArray1);
        shuffleArray(tempArray2);
        setQuestionOrder(tempArray1);
        setAnswerOrder(tempArray2)}
    ,[lesson]);

    console.log(questionOrder);
    console.log(answerOrder);

    let questionNumber = correctCount + falseCount + 1;

    const isQuestionsComplete = questionNumber > heisig_kanji_map.get(lesson).length ? true : false;

    if(isQuestionsComplete) questionNumber--;

    const currentQuestion = questionOrder[questionNumber - 1];

    const correctPercent = questionNumber > 1 ?
    Math.round(correctCount / questionNumber * 100) : 0;

    if(isQuestionsComplete) storeGameScore();

    function storeGameScore(){
        localStorage.setItem(lesson, correctPercent);
    }
    
    function handleOnLessonClick(e){
        setLesson(e.target.getAttribute('data-level'));
        setSelectLessonVisible(false);
        setCorrectCount(0);
        setFalseCount(0);
        setGameVisible(true);
    }

    function handleOnSelectLessonClick(){
        setSelectLessonVisible(true);
        setAnswerOrder([1]);
        setQuestionOrder([1]);
        setCorrectCount(0);
        setFalseCount(0);
        setGameVisible(false);
    }

    function handleDontKnowClick(){
        setAnswersActive(false);
        setHighlight('dont-know');
        const correctAnswer = heisig_kanji[lesson][currentQuestion][0];
        console.log('correct answer:' + correctAnswer + '  kanji:' + heisig_kanji[lesson][currentQuestion][1] );
        
        const correctAnswerElement = 
            document.querySelector('.answer-buttons__card[data-id="' + correctAnswer + '"]');

        console.log(correctAnswerElement);
        correctAnswerElement.style.backgroundColor='orange';
        setTimeout(()=>{
            setAnswersActive(true)
            setFalseCount(falseCount + 1);
            correctAnswerElement.style.backgroundColor='';
            setHighlight('');
        },answerDelay)
    }

    function handleAnswerClick(e){
        if(heisig_kanji[lesson][currentQuestion][0] === e.target.getAttribute('data-id')){
            setAnswersActive(false);
            setHighlight('correct');
            //does this fit in with react?
            e.target.style.backgroundColor='#33d662';
            setTimeout(()=>{
                e.target.style.backgroundColor='';
                setAnswersActive(true)
                setCorrectCount(correctCount + 1);
                setHighlight('');
            },answerDelay)
        }else{
            setAnswersActive(false);
            setHighlight('wrong');
            e.target.style.backgroundColor='#eb2d1c';
            setTimeout(()=>{
                e.target.style.backgroundColor='';
                setAnswersActive(true)
                setFalseCount(falseCount + 1);
                setHighlight('');
            },answerDelay)
        }
    }

    function handleSelectNextClick(){
        setFalseCount(0);
        setCorrectCount(0);
        setSelectLessonVisible(true);
    }

    return(
    <div className="game">
        <HighlightContext.Provider value={highlight}>
    <Header>
        <LessonSelect
            lesson={lesson}
            onLessonClick={handleOnLessonClick}
            onSelectLessonClick={handleOnSelectLessonClick}        
            selectLessonVisible={selectLessonVisible}
        />
        <ThemeToggle/>
        <Score
            lesson={lesson}
            falseCount={falseCount}
            correctCount={correctCount}
        />
    </Header>
    <KanjiDisplay
        gameVisible={gameVisible}
        lesson={lesson}
        currentQuestion={currentQuestion}
    />
    <AnswerButtons
        gameVisible={gameVisible}
        lesson={lesson}
        answerOrder={answerOrder}
        onAnswerClick={handleAnswerClick}
        answersActive={answersActive}
        handleDontKnowClick = {handleDontKnowClick}
    />
    <GameOver
        isQuestionsComplete={isQuestionsComplete}
        correctPercent={correctPercent}
        onSelectNextClick={handleSelectNextClick}
    />
    </HighlightContext.Provider>
    </div>
    );
}