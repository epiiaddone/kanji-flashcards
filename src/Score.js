import heisig_kanji from "./kanji-data";

export default function Score({lesson, falseCount, correctCount}){

    const questionsRemaining = heisig_kanji[lesson].length - falseCount - correctCount;

    const percent = Math.round(correctCount / heisig_kanji[lesson].length * 100);

    return(
<div className="score--container">    
    <div className="score--remaining">Correct: {correctCount}</div>
    <div className="score--remaining">False: {falseCount}</div>
    <div className="score--remaining">Remaining: {questionsRemaining}</div>
    <div className="score--percent">{percent}%</div>
</div>
    );
}