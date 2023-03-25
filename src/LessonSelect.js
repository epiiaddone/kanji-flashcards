import heisig_kanji_map from "./kanji-data-map";

export default function LessonSelect({lesson, onLessonClick, onSelectLessonClick, selectLessonVisible }){
    
    const keys =[ ...heisig_kanji_map.keys() ];

    return(
        <div className="lesson-select">
            <div className="lesson-select__title">Lesson: {lesson}</div>
            <div className="lesson-select__button" onClick={onSelectLessonClick}>Select Level</div>
            <div className="lesson-select__window">{
                //the keys are not in the same order as in the object
                keys.map(level =>{
                    if(!selectLessonVisible) return;
                    return(
                    <div className="lesson-select__window___button"
                        key={level}
                        data-level={level}
                        onClick={onLessonClick}>{level}</div>
                    )}
            )}
            </div>
        </div>
    );
}