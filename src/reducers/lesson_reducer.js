
import {
    OPEN_LESSON_SELECT
} from '../actions';

const lesson_reducer = (state,action)=>{

    if(action.type=== OPEN_LESSON_SELECT){
        return{
            ...state,
            isLessonSelectOpen: true
        }
    }

    throw new Error(`No Matching "${action.type}" - action type`)
}

export default lesson_reducer;