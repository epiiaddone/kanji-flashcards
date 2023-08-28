import {
    CORRECT_ANSWER,
    INCORRECT_ANSWER,
    DONT_KNOW_ANSWER,
    LOAD_GAME,
    NEXT_QUESTION
} from '../actions';

const answer_reducer = (state,action)=>{

    if(action.type=== LOAD_GAME){
        const {tempArray1, tempArray2} = action.payload;
        return{
            ...state,
            questionOrder: tempArray1,
            answerOrder: tempArray2
        }
    }

    if(action.type === CORRECT_ANSWER){
        return{
            ...state,
            highlight: 'correct',
            answersActive: false,
        }
    }

    if(action.type === INCORRECT_ANSWER){
        return{
            ...state,
            highlight: 'wrong',
            answersActive: false,
        }
    }

    if(action.type === NEXT_QUESTION){
        return{
            ...state,
            highlight: '',
            answersActive: true,
        }
    }

    throw new Error(`No Matching "${action.type}" - action type`)
}

export default answer_reducer;