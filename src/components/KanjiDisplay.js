import { useLessonContext } from '../context/lesson_context';
import heisig_kanji from '../data/kanji-data';

export default function KanjiDisplay(){
    const {lesson, currentQuestion, isShowInfo, nextQuestion} = useLessonContext();

    if(lesson === 'none') return;

     if(!isShowInfo)return(
        <div className="kanji-display">
            <div className="kanji-display__text" 
                data-id={heisig_kanji[lesson][currentQuestion][0]}
            >{heisig_kanji[lesson][currentQuestion][1]}</div>
        </div>
    )
    else return(
        <>
            <div className="kanji-info">
                <div>
                <div className="kanji-info__character">
                    {heisig_kanji[lesson][currentQuestion][1]}
                </div>
                <div className="kanji-info__meaning">
                {heisig_kanji[lesson][currentQuestion][2]}
                </div>
            </div>
            <div className="kanji-info--meta">
                <div className="kanji-info__word">
                    <div className="kanji-info__word--text">
                    <span className="kanji-info--label">Example: </span>
                    {heisig_kanji[lesson][currentQuestion][3] ? heisig_kanji[lesson][currentQuestion][3] : 'N/A'}
                    </div>
                </div>
                <div className="kanji-info__components">
                    <div className="kaji-info__components--text">
                    <span className="kanji-info--label">Radicals: </span>
                    {heisig_kanji[lesson][currentQuestion][4] ? heisig_kanji[lesson][currentQuestion][4] : 'N/A'}
                    </div>
                </div>
                <div
                className="kanji-info__continue"
                onClick={nextQuestion}
                >Click here to continue</div>
            </div>
        </div>

        </>
    )
}