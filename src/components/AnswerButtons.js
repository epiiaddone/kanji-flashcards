import heisig_kanji from '../data/kanji-data';
import DontKnow from './DontKnow';
import { useThemeContext } from '../context/theme_context';
import { useLessonContext } from '../context/lesson_context';

export default function AnswerButtons({gameVisible, handleDontKnowClick}){
    const { isDarkTheme } = useThemeContext();
    const {answerOrder, verifyAnswer, answersActive, lesson} = useLessonContext();

    if(lesson === 'none') return;

    const modifiedOnAnswerClick = answersActive ? verifyAnswer : null;
    //console.log('AB-lesson[' + lesson + ']')
    //console.log('AB-answerOrder' + answerOrder);

    return(
    <div className="answer-buttons">
        {answerOrder.map(answer => {
            return(
        <div className={isDarkTheme ? "answer-buttons__card button_dark-theme" : "answer-buttons__card"}
            onClick={modifiedOnAnswerClick}
            key={answer}
            data-id={heisig_kanji[lesson][answer][0]}>
                {heisig_kanji[lesson][answer][2]}           
        </div>
            )}
        )}
        <DontKnow
        gameVisible={gameVisible}
        onDontKnowClick={handleDontKnowClick}
        answersActive={answersActive}
    />
    </div>
    );
}

