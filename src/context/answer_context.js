import { createContext, useContext, useEffect, useReducer } from 'react';

import answer_reducer from '../reducers/answer_reducer';

import { useLessonContext } from './lesson_context';

import heisig_kanji from '../data/kanji-data';
import heisig_kanji_map from '../data/kanji-data-map';

import shuffleArray from '../utils/shuffleArray';

import {
  CORRECT_ANSWER,
  INCORRECT_ANSWER,
  DONT_KNOW_ANSWER,
  LOAD_GAME,
  NEXT_QUESTION
} from '../actions';


const initialState={
  questionOrder: [0],
  answerOrder: [0],
  highlight: '',
  correctCount: 0,
  falseCount:0,
  questionNumber: 1,
  answersActive: true
}

const QUESTION_DELAY = 1000;

const AnswerContext = createContext();

export const AnswerProvider = ({ children }) => {
    const {lesson} = useLessonContext();

    const [state, dispatch] = useReducer(answer_reducer, initialState);


    useEffect(()=>{
      const tempArray1 = [];
      const tempArray2 = [];
      let counter = 0;

      console.log('in useEffect');

      heisig_kanji[lesson].map(item => {
          tempArray1.push(counter);
          tempArray2.push(counter++);
    });

        shuffleArray(tempArray1);
        shuffleArray(tempArray2);
        dispatch({type:LOAD_GAME, payload: {tempArray1, tempArray2}})
  }
    ,[lesson]);

    let currentQuestion = state.questionOrder[state.questionNumber - 1];
    let isQuestionsComplete =
              state.questionNumber > heisig_kanji_map.get(lesson).length ? 
              true : false;

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