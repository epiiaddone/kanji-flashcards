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
    RESET
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
  isShowInfo: false,
  highlightAnswerId:null
}

const LessonContext = createContext();

export const LessonProvider = ({children})=>{

    const [state, dispatch] = useReducer(lesson_reducer, initialState);

        useEffect(()=>{
        if(state.lesson ==='none') return;
        const tempArray1 = [];
        const tempArray2 = [];
        let counter = 0;
  
       // console.log('in use effect');
  
        heisig_kanji[state.lesson].map(item => {
            tempArray1.push(counter);
            tempArray2.push(counter++);
      });
  
          shuffleArray(tempArray1);
          shuffleArray(tempArray2);
          dispatch({type:LOAD_GAME, payload: {tempArray1, tempArray2}})
    },[state.lesson])

    const openLessonSelect = ()=>{
        dispatch({type:OPEN_LESSON_SELECT});
        dispatch({type:RESET});
    }

    const selectLesson = (e)=>{
        const selectedLesson = e.target.getAttribute('data-lesson')
        dispatch({type:LESSON_SELECTED, payload:selectedLesson})
    }

    let currentQuestion = state.questionOrder[state.questionNumber - 1];

    const gameOver = ()=>{
      const newCorrectPercent = state.questionNumber > 1 ?
        Math.round(state.correctCount / state.questionNumber * 100) : 0;

      localStorage.setItem(state.lesson, newCorrectPercent);

       dispatch({type:GAME_OVER, payload:newCorrectPercent})

    }


    const verifyAnswer = (e)=>{
      const clickedAnswerId = e.target.getAttribute('data-id')
      
      if(heisig_kanji[state.lesson][currentQuestion][0] === clickedAnswerId){
        dispatch({type: CORRECT_ANSWER, payload:clickedAnswerId})
      }else{
        dispatch({type: INCORRECT_ANSWER, payload:clickedAnswerId})
      }
    }

    const dontKnowClick = ()=>{      ; 
      dispatch({type:DONT_KNOW_ANSWER, payload:heisig_kanji[state.lesson][currentQuestion][0]})
    }

    const nextQuestion = ()=>{
      const isLastQuestion = state.questionNumber >= heisig_kanji[state.lesson].length;
      if(isLastQuestion){
        gameOver();
        return;
       }
      dispatch({type:NEXT_QUESTION})
    }

    
    const selectNext = ()=>{
      dispatch({type:OPEN_LESSON_SELECT})
      dispatch({type:RESET});
    }

    return (
        <LessonContext.Provider
          value={{
            ...state,
            currentQuestion,
            verifyAnswer,
            dontKnowClick,
            selectNext,
            openLessonSelect,
            selectLesson,
            nextQuestion
          }}
        >
          {children}
        </LessonContext.Provider>
      );

}

export const useLessonContext = () => useContext(LessonContext);