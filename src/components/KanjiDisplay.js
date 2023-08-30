import { useLessonContext } from '../context/lesson_context';
import heisig_kanji from '../data/kanji-data';

export default function KanjiDisplay(){
    const {lesson, currentQuestion} = useLessonContext();
    if(lesson === 'none') return;

     return(
        <div className="kanji-display">
            <div className="kanji-display__text" 
                data-id={heisig_kanji[lesson][currentQuestion][0]}
            >{heisig_kanji[lesson][currentQuestion][1]}</div>
        </div>
    );
}