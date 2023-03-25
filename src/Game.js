import Score from "./Score";
import KanjiDisplay from "./KanjiDisplay";
import AnswerButtons from "./AnswerButtons";
import DontKnow from "./DontKnow";
import LessonSelect from "./LessonSelect";
import { useState } from "react";

export default function Game(){

    const [lesson, setLesson] = useState('1');
    const [correctCount, setCorrectCount] = useState(0);
    const [falseCount, setFalseCount] = useState(0);

    //this is internal to LessonSelect, i don't think it should be in the parent
    const [selectLessonVisible, setSelectLessonVisible] = useState(false);

    const questionNumber = correctCount + falseCount;

    function handleOnLessonClick(e){
        setLesson(e.target.getAttribute('data-level'));
        setSelectLessonVisible(false);
    }

    function handleOnSelectLessonClick(){
        setSelectLessonVisible(true);
    }

    return(
    <div className="game">
    <LessonSelect
        lesson={lesson}
        onLessonClick={handleOnLessonClick}
        onSelectLessonClick={handleOnSelectLessonClick}        
        selectLessonVisible={selectLessonVisible}
    />
    <Score lesson={lesson} falseCount={falseCount} correctCount={correctCount}/>
    <KanjiDisplay lesson={lesson} questionNumber={questionNumber}/>
    <AnswerButtons lesson={lesson} />
    <DontKnow/>
    </div>
    );
}