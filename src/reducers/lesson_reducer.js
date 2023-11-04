
import {
    OPEN_LESSON_SELECT,
    LOAD_GAME,
    LESSON_SELECTED,
    CORRECT_ANSWER,
    INCORRECT_ANSWER,
    DONT_KNOW_ANSWER,
    NEXT_QUESTION,
    GAME_OVER,
    RESET,
    SET_BUTTON_ORDER,
    ENTER_PRACTISE_MODE
} from '../actions';

import { BUTTON_ORDER_VALUES } from '../context/lesson_context';

const lesson_reducer = (state, action) => {

    if (action.type === LESSON_SELECTED) {
        return {
            ...state,
            lesson: action.payload,
            isLessonSelectOpen: false
        }
    }

    if (action.type === LOAD_GAME) {
        const { tempArray1, tempArray2 } = action.payload;
        return {
            ...state,
            questionOrder: tempArray1,
            answerOrder: tempArray2
        }
    }

    if (action.type === OPEN_LESSON_SELECT) {
        return {
            ...state,
            isLessonSelectOpen: true,
            isGameOver: false,
            buttonOrder: BUTTON_ORDER_VALUES[0],
            practiseMode: false,
            practiseRemaining: 0,
        }
    }

    if (action.type === RESET) {
        return {
            ...state,
            lesson: 'none',
            questionOrder: [0],
            answerOrder: [0],
            correctCount: 0,
            falseCount: 0,
            questionNumber: 1,
            correctPercent: 0,
            highlight: '',
            answersActive: true,
            isShowInfo: false,
            highlightAnswerId: null,
            practiseMode: false,
            practiseKanji: [],
        }
    }

    if (action.type === DONT_KNOW_ANSWER) {
        if (state.practiseMode) {
            return {
                ...state,
                highlight: 'dont-know',
                answersActive: false,
                isShowInfo: true,
                highlightAnswerId: action.payload
            }
        } else {
            return {
                ...state,
                highlight: 'dont-know',
                answersActive: false,
                falseCount: state.falseCount + 1,
                isShowInfo: true,
                highlightAnswerId: action.payload,
                practiseKanji: [...state.practiseKanji, action.payload],
            }
        }
    }


    if (action.type === CORRECT_ANSWER) {
        if (state.practiseMode) {
            return {
                ...state,
                highlight: 'correct',
                answersActive: false,
                isShowInfo: true,
                highlightAnswerId: action.payload,
                practiseKanji: [...state.practiseKanji.filter(kanji => kanji != action.payload)],

            }
        } else {
            return {
                ...state,
                highlight: 'correct',
                answersActive: false,
                correctCount: state.correctCount + 1,
                isShowInfo: true,
                highlightAnswerId: action.payload
            }
        }
    }

    if (action.type === INCORRECT_ANSWER) {
        if (state.practiseMode) {
            return {
                ...state,
                highlight: 'wrong',
                answersActive: false,
                isShowInfo: true,
                highlightAnswerId: action.payload,
            }
        } else {
            return {
                ...state,
                highlight: 'wrong',
                answersActive: false,
                falseCount: state.falseCount + 1,
                isShowInfo: true,
                highlightAnswerId: action.payload,
                practiseKanji: [...state.practiseKanji, action.payload],
            }
        }
    }

    if (action.type === NEXT_QUESTION) {
        //console.log('NEXT_QUESTION RUN')
        if (state.practiseMode) {
            return {
                ...state,
                highlight: '',
                answersActive: true,
                isShowInfo: false,
                highlightAnswerId: null
            }
        } else {
            return {
                ...state,
                highlight: '',
                answersActive: true,
                questionNumber: state.questionNumber + 1,
                isShowInfo: false,
                highlightAnswerId: null
            }
        }
    }

    if (action.type === GAME_OVER) {
        return {
            ...state,
            isGameOver: true,
            correctPercent: action.payload,
        }
    }

    if (action.type === SET_BUTTON_ORDER) {
        return {
            ...state,
            buttonOrder: action.payload,
        }
    }

    if (action.type === ENTER_PRACTISE_MODE) {
        return {
            ...state,
            practiseMode: true,
        }
    }

    throw new Error(`No Matching "${action.type}" - action type`)
}

export default lesson_reducer;