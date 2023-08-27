import heisig_kanji from '../data/kanji-data';
import DontKnow from './DontKnow';
import { useGlobalContext } from '../context';

export default function AnswerButtons({gameVisible, lesson, answerOrder, onAnswerClick, answersActive, handleDontKnowClick}){

    const { isDarkTheme } = useGlobalContext();
    const modifiedOnAnswerClick = answersActive ? onAnswerClick : null;

    console.log('AB' + answerOrder);

    if(!gameVisible) return(<></>);
    else return(
    <div className="answer-buttons">
        {answerOrder.map(answer => (
        <div className={isDarkTheme ? "answer-buttons__card button_dark-theme" : "answer-buttons__card"}
            onClick={modifiedOnAnswerClick}
            key={answer}
            data-id={heisig_kanji[lesson][answer][0]}>
                {heisig_kanji[lesson][answer][2]}           
        </div>
        ))}
        <DontKnow
        gameVisible={gameVisible}
        onDontKnowClick={handleDontKnowClick}
        answersActive={answersActive}
    />
    </div>
    );
}

