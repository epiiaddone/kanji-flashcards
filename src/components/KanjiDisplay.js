import { useLessonContext } from '../context/lesson_context';
import { radicalData } from '../data/radical-data';
import heisig_kanji from '../data/wk-kanji-data';
import { Mnemonic } from './Mnemonic';

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

    const mnemonicString = `A *R[person]R* puts a *R[lid]R* on their *R[cross]R* after they *K[graduate]K*. It’s a symbolic gesture, putting the lid over the cross, but it’s just what you do when you graduate around these parts.`;

    const component_subject_ids = [2, 4, 56];


    if (!isShowInfo) return (
        <div className="kanji-display">
            {practiseMode && <div className="kanji-display__practise">Practise Mode: {practiseKanji.length} Left</div>}
            <div className="kanji-display__text"
                data-id={kanjiId}
            >{kanjiCharacter}</div>
        </div>
    )
    else return (

        <div className="kanji-info">
            {practiseMode && <div className="kanji-display__practise">Practise Mode: {practiseKanji.length} Left</div>}
            <div className="kanji-info__container">
                <div>
                    <div className="kanji-info__character">
                        {kanjiCharacter}
                    </div>
                    <div>
                        <div className="kanji-info__title">Meanings</div>
                        <div className="kanji-info__meaning">
                            {kanjiMeaning}
                        </div>
                    </div>
                </div>
                <div>
                    <div className="kanji-info__links">
                        <a target="_blank" href={"https://jisho.org/search/" + kanjiCharacter}>jisho</a>
                        <a target="_blank" href={"https://www.wanikani.com/kanji/" + kanjiCharacter}>WK Level:<span>4</span></a>
                    </div>
                    <div className="kanji-info__radicals">
                        <div className="kanji-info__title">Radicals</div>
                        <div className="kanji-info__radicals--list">
                            {component_subject_ids.map(radicalID => {
                                return (
                                    <div
                                        className="radical"
                                        key={radicalID}
                                    >
                                        <div className="radical--characters">
                                            {radicalData[radicalID].characters === 'null' ?
                                                <img className="radical--image" src={radicalData[radicalID].image} />
                                                : radicalData[radicalID].characters}
                                        </div>
                                        <div className="radical--slug">{radicalData[radicalID].slug}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div className="kanji-info__word">
                <div className="kanji-info__title">Example Word</div>
                <div className="kanji-info__word--text">
                    <div className="kanji-info__word--kanji">成功</div>
                    <div>せいこう</div>
                    <div>Success</div>
                </div>
            </div>
            <div className="kanji-info__mnemonic">
                <div className="kanji-info__title">Mnemonic</div>
                {<Mnemonic mnemonicString={mnemonicString} />}
            </div>
            <button
                className="kanji-info__next-question"
                onClick={nextQuestion}
            >Next Question
            </button>
        </div>

    )
}