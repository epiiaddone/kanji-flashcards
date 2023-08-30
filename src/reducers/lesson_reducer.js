
import {
    OPEN_LESSON_SELECT,
    LOAD_GAME,
    LESSON_SELECTED,
    CORRECT_ANSWER,
    INCORRECT_ANSWER,
    DONT_KNOW_ANSWER,
    NEXT_QUESTION,
    GAME_OVER,
    SELECT_NEXT
} from '../actions';

const lesson_reducer = (state,action)=>{

    if(action.type === LESSON_SELECTED){
        return{
            ...state,
            lesson: action.payload,
            isLessonSelectOpen: false
        }
    }

    if(action.type=== LOAD_GAME){
        const {tempArray1, tempArray2} = action.payload;
        return{
            ...state,
            questionOrder: tempArray1,
            answerOrder: tempArray2
        }
    }

    if(action.type=== OPEN_LESSON_SELECT){
        return{
            ...state,
            lesson:'none',
            questionOrder:[0],
            answerOrder:[0],
            isLessonSelectOpen: true,
            gameOver:false
        }
    }

    if(action.type === DONT_KNOW_ANSWER){
        return{
            ...state,
            highlight: 'dont-know',
            answersActive: false,
            falseCount: state.falseCount + 1
        }
    }


    if(action.type === CORRECT_ANSWER){
        return{
            ...state,
            highlight: 'correct',
            answersActive: false,
            correctCount: state.correctCount + 1
        }
    }

    if(action.type === INCORRECT_ANSWER){
        return{
            ...state,
            highlight: 'wrong',
            answersActive: false,
            falseCount: state.falseCount + 1
        }
    }

    if(action.type === NEXT_QUESTION){
        return{
            ...state,
            highlight: '',
            answersActive: true,
            questionNumber: state.questionNumber + 1
        }
    }

    if(action.type === GAME_OVER){
        return{
            ...state,
            gameOver: true,
            correctPercent: action.payload,
        }
        }
    
        if(action.type === SELECT_NEXT){
            return{
                ...state,
                gameOver:false
            }
        }

    throw new Error(`No Matching "${action.type}" - action type`)
}

export default lesson_reducer;