import { useLessonContext } from '../context/lesson_context';
import heisig_kanji from '../data/kanji-data';

export default function KanjiDisplay(){
    const {lesson, currentQuestion, isShowInfo} = useLessonContext();

    if(lesson === 'none') return;

     if(!isShowInfo)return(
        <div className="kanji-display">
            <div className="kanji-display__text" 
                data-id={heisig_kanji[lesson][currentQuestion][0]}
            >{heisig_kanji[lesson][currentQuestion][1]}</div>
        </div>
    )
    else return(
        <div className="kanji-info">
            <div className="kanji-info__character">
                {heisig_kanji[lesson][currentQuestion][1]}
            </div>
            <div className="kanji-info__meaning">
            {heisig_kanji[lesson][currentQuestion][2]}
            </div>
            <div className="kanji-info__word">
            {heisig_kanji[lesson][currentQuestion][3]}
            </div>
            <div>Press space to continue</div>
        </div>
    )
}