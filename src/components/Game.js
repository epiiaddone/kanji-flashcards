import { useState } from "react";

import Score from "./Score";
import KanjiDisplay from "./KanjiDisplay";
import AnswerButtons from "./AnswerButtons";
import LessonSelect from "./LessonSelect";
import GameOver from "./GameOver";
import Header from "./Header";
import ThemeToggle from "./ThemeToggle";

import heisig_kanji_map from "../data/kanji-data-map";
import heisig_kanji from "../data/kanji-data";
import kanjiDataStats from "../data/kanji-data-stats";

import shuffleArray from "../utils/shuffleArray";
import { useAnswerContext } from "../context/answer_context";
import { useLessonContext } from "../context/lesson_context";


export default function Game(){

    //kanjiDataStats();

    const [gameVisible, setGameVisible] = useState(true);

    //this is internal to LessonSelect, i don't think it should be in the parent
    const [selectLessonVisible, setSelectLessonVisible] = useState(false);

    const answerDelay = 1000;
    const {
        isQuestionsComplete,
        lesson,
        questionNumber,
        correctCount,
        falseCount
        } = useAnswerContext();

    const {
        questionOrder
    } = useLessonContext();

    if(isQuestionsComplete) questionNumber--;

    const currentQuestion = questionOrder[questionNumber - 1];

    const correctPercent = questionNumber > 1 ?
    Math.round(correctCount / questionNumber * 100) : 0;

    if(isQuestionsComplete) storeGameScore();

    function storeGameScore(){
        localStorage.setItem(lesson, correctPercent);
    }
    

    function handleOnLessonClick(e){
        /*
        setLesson(e.target.getAttribute('data-level'));
        setSelectLessonVisible(false);
        setCorrectCount(0);
        setFalseCount(0);
        setGameVisible(true);
        */
    }

    function handleOnSelectLessonClick(){
        // setSelectLessonVisible(true);
        // setAnswerOrder([1]);
        // setQuestionOrder([1]);
        // setCorrectCount(0);
        // setFalseCount(0);
        // setGameVisible(false);
    }

    function handleDontKnowClick(){
        // setAnswersActive(false);
        // const correctAnswer = heisig_kanji[lesson][currentQuestion][0];
        // console.log('correct answer:' + correctAnswer + '  kanji:' + heisig_kanji[lesson][currentQuestion][1] );
        
        // const correctAnswerElement = 
        //     document.querySelector('.answer-buttons__card[data-id="' + correctAnswer + '"]');

        // console.log(correctAnswerElement);
        // correctAnswerElement.style.backgroundColor='orange';
        // setTimeout(()=>{
        //     setAnswersActive(true)
        //     setFalseCount(falseCount + 1);
        //     correctAnswerElement.style.backgroundColor='';
        // },answerDelay)
    }


    function handleAnswerClick(e){
        // if(heisig_kanji[lesson][currentQuestion][0] === e.target.getAttribute('data-id')){
        //     setAnswersActive(false);
        //     changeHighlight('correct')
        //     //does this fit in with react?
        //     e.target.style.backgroundColor='#33d662';
        //     setTimeout(()=>{
        //         e.target.style.backgroundColor='';
        //         setAnswersActive(true)
        //         setCorrectCount(correctCount + 1);
        //     },answerDelay)
        // }else{
        //     setAnswersActive(false);
        //     setHighlight('wrong');
        //     e.target.style.backgroundColor='#eb2d1c';
        //     setTimeout(()=>{
        //         e.target.style.backgroundColor='';
        //         setAnswersActive(true)
        //         setFalseCount(falseCount + 1);
        //         setHighlight('');
        //     },answerDelay)
        // }
    }



    function handleSelectNextClick(){
        // setFalseCount(0);
        // setCorrectCount(0);
        // setSelectLessonVisible(true);
    }


    return(
    <div className="game">
    <Header>
        <LessonSelect
            onLessonClick={handleOnLessonClick}
            onSelectLessonClick={handleOnSelectLessonClick}        
            selectLessonVisible={selectLessonVisible}
        />
        <ThemeToggle/>
        <Score/>
    </Header>
    <KanjiDisplay
        gameVisible={gameVisible}
    />
    <AnswerButtons
        gameVisible={gameVisible}
        handleDontKnowClick = {handleDontKnowClick}
    />
    <GameOver
        isQuestionsComplete={isQuestionsComplete}
        correctPercent={correctPercent}
        onSelectNextClick={handleSelectNextClick}
    />
    </div>
    );
}