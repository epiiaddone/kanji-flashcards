import { createContext, useContext, useReducer } from 'react';

import answer_reducer from '../reducers/answer_reducer';

import { useLessonContext } from './lesson_context';

import heisig_kanji from '../data/kanji-data';
import heisig_kanji_map from '../data/kanji-data-map';

import shuffleArray from '../utils/shuffleArray';

import {
  CORRECT_ANSWER,
  INCORRECT_ANSWER,
  DONT_KNOW_ANSWER,
  NEXT_QUESTION
} from '../actions';


const initialState={
  highlight: '',
  correctCount: 0,
  falseCount:0,
  questionNumber: 1,
  answersActive: true
}

const QUESTION_DELAY = 1000;

const AnswerContext = createContext();

export const AnswerProvider = ({ children }) => {
    const {
      lesson,
      questionOrder
      } = useLessonContext();

    const [state, dispatch] = useReducer(answer_reducer, initialState);

    let currentQuestion = questionOrder[state.questionNumber - 1];

    let isQuestionsComplete = false;
    if(lesson!= 'none' && state.questionNumber > heisig_kanji_map.get(lesson).length){
      isQuestionsComplete = true;
    }


    const verifyAnswer = (e)=>{
      if(heisig_kanji[lesson][currentQuestion][0] === e.target.getAttribute('data-id')){
        dispatch({type: CORRECT_ANSWER})
        e.target.style.backgroundColor='#33d662';
        setTimeout(()=>{
          dispatch({type:NEXT_QUESTION})
          e.target.style.backgroundColor='';
        }
          ,QUESTION_DELAY)
      }else{
        dispatch({type: INCORRECT_ANSWER})
        e.target.style.backgroundColor='#f2351f';
        setTimeout(()=>{
          dispatch({type:NEXT_QUESTION})
          e.target.style.backgroundColor='';
        }
        ,QUESTION_DELAY)
      }
    }

return (
    <AnswerContext.Provider
      value={{
        ...state,
        currentQuestion,
        isQuestionsComplete,
        verifyAnswer
      }}
    >
      {children}
    </AnswerContext.Provider>
  );
};

export const useAnswerContext = () => useContext(AnswerContext);