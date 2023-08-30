import { useLessonContext } from "../context/lesson_context";

import heisig_kanji from "../data/kanji-data";


export default function Score(){

    const {highlight, falseCount, correctCount, lesson} = useLessonContext();
    if(lesson === 'none') return;

    const questionsRemaining = heisig_kanji[lesson].length - falseCount - correctCount;

    let highlightClassName = '';
    if(highlight === 'correct') highlightClassName = 'highlight-correct';
    if(highlight === 'wrong') highlightClassName = 'highlight-wrong';
    if(highlight === 'dont-know') highlightClassName = 'highlight-dont-know';

    return(
<div className={highlightClassName + " score header__align"}>
    <div className="score--correct"><mark>✓</mark> {correctCount}</div>
    <div className="score--false"><mark>✘</mark> {falseCount}</div>
    <div className="score--remaining">Remaining: {questionsRemaining}</div>
</div>
    );
}