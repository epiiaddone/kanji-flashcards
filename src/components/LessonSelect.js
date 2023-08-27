import heisig_kanji_map from "../data/kanji-data-map";
import { useGlobalContext } from '../context';

export default function LessonSelect({lesson, onLessonClick, onSelectLessonClick, selectLessonVisible }){
    const { isDarkTheme } = useGlobalContext();
    const keys =[ ...heisig_kanji_map.keys() ];

    return(
        <div className="lesson-select">
            <div className="lesson-select__title header__align">Level: {lesson}</div>
            <div 
                className={isDarkTheme ? "lesson-select__button header__align button_dark-theme" : "lesson-select__button header__align"}
                onClick={onSelectLessonClick}
            >
                Select
            </div>
            <div className="lesson-select__window">{
                //use map because the keys are not in the same order for objects
                keys.map(level =>{
                    if(!selectLessonVisible) return;
                    let scoreColorClass = '';
                    const lessonScore = localStorage.getItem(level);
                    if(lessonScore > 0) scoreColorClass = 'highlight-wrong';
                    if(lessonScore >= 50) scoreColorClass = 'highlight-dont-know';
                    if(lessonScore >= 80) scoreColorClass = 'highlight-correct';
                    return(
                    <div className={ 
                            isDarkTheme ? 
                                "lesson-select__window___button button_dark-theme " + scoreColorClass
                                : "lesson-select__window___button " + scoreColorClass
                        }
                        key={level}
                        data-level={level}
                        onClick={onLessonClick}>{level}: {lessonScore || 0}%</div>
                    )}
            )}
            </div>
        </div>
    );
}