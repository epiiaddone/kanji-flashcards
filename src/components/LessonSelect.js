import heisig_kanji_map from "../data/kanji-data-map";
import { useThemeContext } from "../context/theme_context";
import { useLessonContext } from "../context/lesson_context";
import { getScoreColorClassName } from "../utils/scoreColors";

export default function LessonSelect(){
    const { isDarkTheme } = useThemeContext();
    const {lesson,
        openLessonSelect,
        isLessonSelectOpen,
        selectLesson,
    } = useLessonContext();

    const keys =[ ...heisig_kanji_map.keys() ];

    return(
        <>
        <div className="lesson-select">
            <div className="lesson-select__title header__align">Level: {lesson}</div>
            <div 
                className={isDarkTheme ? 
                    "lesson-select__button header__align button_dark-theme"
                    : "lesson-select__button header__align"}
                onClick={openLessonSelect}
            >
                Select
            </div>
        </div>
                    {isLessonSelectOpen &&
                        <div className="lesson-select__window">{
                            //use map because the keys are not in the same order for objects
                            keys.map(lesson =>{
                                const lessonScore = localStorage.getItem(lesson);
                                const scoreColorClass = getScoreColorClassName(lessonScore);
                                return(
                                <div className={ 
                                        isDarkTheme ? 
                                            "lesson-select__window___button button_dark-theme " + scoreColorClass
                                            : "lesson-select__window___button " + scoreColorClass
                                    }
                                    key={lesson}
                                    data-lesson={lesson}
                                    onClick={selectLesson}>{lesson}: {lessonScore || 0}%</div>
                                )}
                        )}
                        </div>
}
                        </>
    );
}