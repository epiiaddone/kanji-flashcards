import { createContext, useContext, useEffect, useReducer } from 'react';

import lesson_reducer from '../reducers/lesson_reducer';

import heisig_kanji from '../data/kanji-data';
import shuffleArray from '../utils/shuffleArray';

import {
    LOAD_GAME,
    OPEN_LESSON_SELECT,
    LESSON_SELECTED,
    CORRECT_ANSWER,
    INCORRECT_ANSWER,
    DONT_KNOW_ANSWER,
    NEXT_QUESTION,
    GAME_OVER,
} from '../actions';



const initialState ={
  highlight: '',
  correctCount: 0,
  falseCount:0,
  questionNumber: 1,
  answersActive: true,
  correctPercent: 0,
  isGameOver: false,
  isLessonSelectOpen:false,
  lesson: '1',
  questionOrder: [0],
  answerOrder: [0],
}

const QUESTION_DELAY = 1000;

const LessonContext = createContext();

export const LessonProvider = ({children})=>{

    const [state, dispatch] = useReducer(lesson_reducer, initialState);

        useEffect(()=>{
        if(state.lesson ==='none') return;
        const tempArray1 = [];
        const tempArray2 = [];
        let counter = 0;
  
        console.log('in use effect');
  
        heisig_kanji[state.lesson].map(item => {
            tempArray1.push(counter);
            tempArray2.push(counter++);
      });
  
          shuffleArray(tempArray1);
          shuffleArray(tempArray2);
          dispatch({type:LOAD_GAME, payload: {tempArray1, tempArray2}})
    },[state.lesson])


    const openLessonSelect = ()=>{
        dispatch({type:OPEN_LESSON_SELECT})
    }

    const selectLesson = (e)=>{
        const selectedLesson = e.target.getAttribute('data-lesson')
        dispatch({type:LESSON_SELECTED, payload:selectedLesson})
    }

    let currentQuestion = state.questionOrder[state.questionNumber - 1];

    const gameOver = ()=>{
      const correctPercent = state.questionNumber > 1 ?
        Math.round(state.correctCount / state.questionNumber * 100) : 0;

      localStorage.setItem(state.lesson, state.correctPercent);

      setTimeout(()=>{
        dispatch({type:GAME_OVER, payload:correctPercent})
      },QUESTION_DELAY)
    }


    const verifyAnswer = (e)=>{
      const isLastQuestion = state.questionNumber >= heisig_kanji[state.lesson].length;

      if(heisig_kanji[state.lesson][currentQuestion][0] === e.target.getAttribute('data-id')){
        dispatch({type: CORRECT_ANSWER})
        e.target.style.backgroundColor='#33d662';
        if(isLastQuestion){
         gameOver();
         return;
        }
        setTimeout(()=>{
          dispatch({type:NEXT_QUESTION})
          e.target.style.backgroundColor='';
        }
          ,QUESTION_DELAY)
      }else{
        dispatch({type: INCORRECT_ANSWER})
        e.target.style.backgroundColor='#f2351f';
        if(isLastQuestion){
          gameOver();
          return;
         }
        setTimeout(()=>{
          dispatch({type:NEXT_QUESTION})
          e.target.style.backgroundColor='';
        }
        ,QUESTION_DELAY)
      }
    }

    const dontKnowClick = ()=>{
      const isLastQuestion = state.questionNumber >= heisig_kanji[state.lesson].length;
      dispatch({type:DONT_KNOW_ANSWER})
      const correctAnswer = heisig_kanji[state.lesson][currentQuestion][0];
      const correctAnswerElement = document.querySelector(
        '.answer-buttons__card[data-id="' + correctAnswer + '"]');
        correctAnswerElement.style.backgroundColor='orange';
        if(isLastQuestion){
          gameOver();
          return;
         }
      setTimeout(()=>{
        dispatch({type:NEXT_QUESTION})
        correctAnswerElement.style.backgroundColor='';
      },QUESTION_DELAY)
    }

    
    const selectNext = ()=>{
      dispatch({type:OPEN_LESSON_SELECT})
    }

    return (
        <LessonContext.Provider
          value={{
            ...state,
            currentQuestion,
            verifyAnswer,
            dontKnowClick,
            gameOver,
            selectNext,
            openLessonSelect,
            selectLesson
          }}
        >
          {children}
        </LessonContext.Provider>
      );

}

export const useLessonContext = () => useContext(LessonContext);