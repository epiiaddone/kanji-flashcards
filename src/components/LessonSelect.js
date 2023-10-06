import { useThemeContext } from "../context/theme_context";
import { BUTTON_ORDER_VALUES, useLessonContext } from "../context/lesson_context";
import { getScoreColorClassName } from "../utils/scoreColors";
import { getSortedLessons } from "../utils/sortLessonButtons";

export default function LessonSelect() {
    const { isDarkTheme } = useThemeContext();
    const { lesson,
        openLessonSelect,
        isLessonSelectOpen,
        selectLesson,
        buttonOrder,
        setButtonOrder,
    } = useLessonContext();

    let sortedLessons = [];
    if (isLessonSelectOpen) sortedLessons = getSortedLessons(buttonOrder);

    function getOrderButtonClassName(order) {
        let className = "lesson-select__order--btn"
        if (isDarkTheme) className += " button_dark-theme"
        if (buttonOrder === order) className += " highlight-btn"
        return className;
    }

    return (
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
                <div className="lesson-select__open">
                    <div className="lesson-select__order">
                        {BUTTON_ORDER_VALUES.map(order => (
                            <button
                                onClick={setButtonOrder}
                                data-order={order}
                                key={order}
                                className={getOrderButtonClassName(order)}
                            >
                                {order}
                            </button>
                        ))}
                    </div>
                    <div className="lesson-select__window">{
                        //use map because the keys are not in the same order for objects
                        sortedLessons.map(lesson => {
                            const lessonScore = localStorage.getItem(lesson);
                            const scoreColorClass = getScoreColorClassName(lessonScore, 'bg');
                            return (
                                <div className={
                                    isDarkTheme ?
                                        "lesson-select__window___button button_dark-theme " + scoreColorClass
                                        : "lesson-select__window___button " + scoreColorClass
                                }
                                    key={lesson}
                                    data-lesson={lesson}
                                    onClick={selectLesson}>{lesson}: {lessonScore || 0}%</div>
                            )
                        }
                        )}
                    </div>
                </div>
            }
        </>
    );
}