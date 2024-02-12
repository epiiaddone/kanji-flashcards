import heisig_kanji from '../data/wk-kanji-data';
import DontKnow from './DontKnow';
import { useThemeContext } from '../context/theme_context';
import { useLessonContext } from '../context/lesson_context';
import { wk_api_kanji_data } from '../data/wk_api_kanji_data';
import { wk_api_missing_kanji_data } from '../data/wk_api_missing_kanji_data';

export default function AnswerButtons() {
    const { isDarkTheme } = useThemeContext();
    const {
        answerOrder,
        verifyAnswer,
        answersActive,
        lesson,
        highlight,
        highlightAnswerId,
        dontKnowClick
    } = useLessonContext();


    const modifiedOnAnswerClick = answersActive ? verifyAnswer : null;
    console.log('AB-lesson[' + lesson + ']')
    console.log('AB-answerOrder:' + answerOrder);

    const classNameString = isDarkTheme ? "answer-buttons__card button_dark-theme" : "answer-buttons__card";
    let highlightClassName = '';
    if (highlight === 'correct') highlightClassName = 'highlight-correct';
    if (highlight === 'wrong') highlightClassName = 'highlight-wrong';
    if (highlight === 'dont-know') highlightClassName = 'highlight-dont-know';
    highlightClassName = classNameString + ' ' + highlightClassName;

    return (
        <div className="answer-buttons">
            {answerOrder.map(answer => {
                let kanjiId = heisig_kanji[lesson][answer][0];
                let kanjiCharacter = heisig_kanji[lesson][answer][1];

                //the kanji meanings are stored in 3 separate files
                let kanjiMeaning;
                for (const [key, kanji] of Object.entries(wk_api_kanji_data)) {
                    if (kanji.slug === kanjiCharacter) {
                        kanjiMeaning = kanji.meanings[0];
                        break;
                    }
                }
                if (!kanjiMeaning) kanjiMeaning = wk_api_missing_kanji_data[kanjiCharacter]?.meanings[0];
                if (!kanjiMeaning) kanjiMeaning = heisig_kanji[lesson][answer][2];

                return (
                    <div
                        className={heisig_kanji[lesson][answer][0] === highlightAnswerId ?
                            highlightClassName : classNameString}
                        onClick={modifiedOnAnswerClick}
                        key={answer}
                        data-id={kanjiId}
                        data-character={kanjiCharacter}
                        data-meaning={kanjiMeaning}>
                        {kanjiMeaning}
                    </div>
                )
            }
            )}
            <DontKnow
                onDontKnowClick={dontKnowClick}
                answersActive={answersActive}
            />
        </div>
    );
}

