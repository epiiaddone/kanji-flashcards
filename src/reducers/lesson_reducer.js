
import {
    OPEN_LESSON_SELECT,
    LOAD_GAME,
    LESSON_SELECTED
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
            isLessonSelectOpen: true
        }
    }

    throw new Error(`No Matching "${action.type}" - action type`)
}

export default lesson_reducer;