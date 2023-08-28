import {
    CORRECT_ANSWER,
    INCORRECT_ANSWER,
    DONT_KNOW_ANSWER,
    NEXT_QUESTION
} from '../actions';

const answer_reducer = (state,action)=>{


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

    throw new Error(`No Matching "${action.type}" - action type`)
}

export default answer_reducer;