import { useLessonContext } from '../context/lesson_context';
import heisig_kanji from '../data/wk-kanji-data';
import { KanjiLocation } from '../utils/kanjiLocation';
import { Mnemonic } from './Mnemonic';
import { wk_api_kanji_data } from '../data/wk_api_kanji_data';
import { Radicals } from './Radicals';
import { wk_api_missing_kanji_data } from '../data/wk_api_missing_kanji_data';
import { Meanings } from './Meanings';
import { fetchVocab } from '../api/fetchVocab';
import { ExampleWord } from './ExampleWord';
import { useEffect, useState } from 'react';

export default function KanjiDisplay() {
    console.log("inside KanjiDisplay")
    const { lesson,
        currentQuestion,
        isShowInfo,
        nextQuestion,
        practiseMode,
        practiseKanji,
        practiseQuestion,
        questionNumber } = useLessonContext();

    //this is state because it's passed as props
    //and we want rerender when api data returns
    const [kanjiExample, setKanjiExample] = useState('');

    let kanjiId;
    let kanjiCharacter;
    let kanjiMeanings;
    let kanjiMnemonic;
    let kanjiComponentIds;
    let kanjiExampleID;
    let kanjiLevel;
    let kanji_location = KanjiLocation.INCOMPLETE;


    if (practiseMode) {
        kanjiId = heisig_kanji[lesson][practiseQuestion][0];
        kanjiCharacter = heisig_kanji[lesson][practiseQuestion][1];
    } else {
        kanjiId = heisig_kanji[lesson][currentQuestion][0];
        kanjiCharacter = heisig_kanji[lesson][currentQuestion][1];
    }


    for (const [key, kanji] of Object.entries(wk_api_kanji_data)) {
        if (kanji.slug === kanjiCharacter) {
            kanji_location = KanjiLocation.WK;
            kanjiMeanings = kanji.meanings;
            kanjiMnemonic = kanji.meaning_mnemonic;
            kanjiComponentIds = kanji.component_subject_ids;
            kanjiExampleID = kanji.amalgamation_subject_ids[0];
            kanjiLevel = kanji.level;
            break;
        }
    }

    if (kanji_location === KanjiLocation.INCOMPLETE) {
        if (wk_api_missing_kanji_data[kanjiCharacter]) {
            kanji_location = KanjiLocation.WK_MISSING;
            const kanjiData = wk_api_missing_kanji_data[kanjiCharacter];
            kanjiMeanings = kanjiData.meanings;
            kanjiComponentIds = kanjiData.component_subject_ids;
            kanjiMnemonic = kanjiData.meaning_mnemonic;
            //this was causing infinite rerender
            if (kanjiData.example_word !== kanjiExample) setKanjiExample(kanjiData.example_word);
        }
    }

    useEffect(() => {
        const abortController = new AbortController();

        const getApiVocab = async (vocabID) => {
            if (!vocabID || !lesson) return;
            const { error, vocabData } = await fetchVocab(vocabID, abortController);
            if (!error) {
                let temp = vocabData.characters + ", " + vocabData.reading + ", " + vocabData.meaning
                setKanjiExample(temp);
            }
            console.log("getApiVocab, vocab is:", kanjiExample)
        }

        getApiVocab(kanjiExampleID);
        return () => {
            abortController.abort();
        };
    }, [questionNumber, practiseQuestion])


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
                        <Meanings meaningsArray={kanjiMeanings} />
                    </div>
                </div>
                <div>
                    <div className="kanji-info__links">
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href={"https://jisho.org/search/" + kanjiCharacter}
                        >jisho</a>
                        {kanjiLevel &&
                            <a
                                target="_blank"
                                rel="noreferrer"
                                href={"https://www.wanikani.com/kanji/" + kanjiCharacter}
                            >WK Level:<span> {kanjiLevel}</span></a>
                        }
                    </div>
                    <div className="kanji-info__radicals">
                        <div className="kanji-info__title">Radicals</div>
                        <Radicals radicalIds={kanjiComponentIds} />
                    </div>
                </div>
                <div className="kanji-info__word">
                    <div className="kanji-info__title">Example Word</div>
                    <ExampleWord exampleWordString={kanjiExample} />
                </div>
            </div>

            <div className="kanji-info__mnemonic">
                <div className="kanji-info__title">Mnemonic</div>
                <Mnemonic mnemonicString={kanjiMnemonic} />
            </div>
            <button
                className="kanji-info__next-question"
                onClick={() => {
                    setKanjiExample('')
                    nextQuestion()
                }
                }
            >Next Question
            </button>
        </div>

    )
}