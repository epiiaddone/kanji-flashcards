
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
    SET_BUTTON_ORDER
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
            highlightAnswerId: null
        }
    }

    if (action.type === DONT_KNOW_ANSWER) {
        return {
            ...state,
            highlight: 'dont-know',
            answersActive: false,
            falseCount: state.falseCount + 1,
            isShowInfo: true,
            highlightAnswerId: action.payload
        }
    }


    if (action.type === CORRECT_ANSWER) {
        return {
            ...state,
            highlight: 'correct',
            answersActive: false,
            correctCount: state.correctCount + 1,
            isShowInfo: true,
            highlightAnswerId: action.payload
        }
    }

    if (action.type === INCORRECT_ANSWER) {
        return {
            ...state,
            highlight: 'wrong',
            answersActive: false,
            falseCount: state.falseCount + 1,
            isShowInfo: true,
            highlightAnswerId: action.payload
        }
    }

    if (action.type === NEXT_QUESTION) {
        //console.log('NEXT_QUESTION RUN')
        return {
            ...state,
            highlight: '',
            answersActive: true,
            questionNumber: state.questionNumber + 1,
            isShowInfo: false,
            highlightAnswerId: null
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

    throw new Error(`No Matching "${action.type}" - action type`)
}

export default lesson_reducer;