import { useLessonContext } from '../context/lesson_context';
import heisig_kanji from '../data/wk-kanji-data';

export default function KanjiDisplay() {
    const { lesson, currentQuestion, isShowInfo, nextQuestion, practiseMode, practiseKanji, practiseQuestion } = useLessonContext();

    if (lesson === 'none') return;

    let kanjiId;
    let kanjiCharacter;
    let kanjiMeaning;
    let kanjiExample;
    let kanjiMnemonic;

    if (practiseMode) {
        kanjiId = heisig_kanji[lesson][practiseQuestion][0];
        kanjiCharacter = heisig_kanji[lesson][practiseQuestion][1];
        kanjiMeaning = heisig_kanji[lesson][practiseQuestion][2];
        kanjiExample = heisig_kanji[lesson][practiseQuestion][3];
        kanjiMnemonic = heisig_kanji[lesson][practiseQuestion][4];
    } else {
        kanjiId = heisig_kanji[lesson][currentQuestion][0];
        kanjiCharacter = heisig_kanji[lesson][currentQuestion][1];
        kanjiMeaning = heisig_kanji[lesson][currentQuestion][2];
        kanjiExample = heisig_kanji[lesson][currentQuestion][3];
        kanjiMnemonic = heisig_kanji[lesson][currentQuestion][4];
    }



    if (!isShowInfo) return (
        <div className="kanji-display">
            {practiseMode && <div className="kanji-display__practise">Practise Mode: {practiseKanji.length} Left</div>}
            <div className="kanji-display__text"
                data-id={kanjiId}
            >{kanjiCharacter}</div>
        </div>
    )
    else return (
        <>
            <div className="kanji-info">
                {practiseMode && <div className="kanji-display__practise">Practise Mode: {practiseKanji.length} Left</div>}
                <div className="kanji-info__container">
                    <div>
                        <div className="kanji-info__character">
                            {kanjiCharacter}
                        </div>
                        <div className="kanji-info__meaning">
                            {kanjiMeaning}
                        </div>
                    </div>
                    <div className="kanji-info--meta">
                        <div className="kanji-info__word">
                            <div className="kanji-info__word--text">
                                <span className="kanji-info--label">Example: </span><br></br>
                                <span className="kanji-info__example">
                                    {kanjiExample ? kanjiExample : 'N/A'}
                                </span>
                            </div>
                        </div>
                        <div className="kanji-info__components">
                            <div className="kaji-info__components--text">
                                <span className="kanji-info--label">Mnemonic: </span><br></br>
                                <span className="kanji-info__mnemonic">
                                    {kanjiMnemonic ? kanjiMnemonic : 'N/A'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    className="kanji-info__next-question"
                    onClick={nextQuestion}
                >Next Question
                </button>
            </div>
        </>
    )
}