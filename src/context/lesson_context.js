import { createContext, useContext, useEffect, useReducer } from 'react';

import lesson_reducer from '../reducers/lesson_reducer';

import heisig_kanji from '../data/kanji-data';
import shuffleArray from '../utils/shuffleArray';

import {
    LOAD_GAME,
    OPEN_LESSON_SELECT,
    LESSON_SELECTED,
} from '../actions';



const initialState ={
    isLessonSelectOpen:false,
    lesson: '1',
    questionOrder: [0],
    answerOrder: [0],
}

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

    return (
        <LessonContext.Provider
          value={{
            ...state,
            openLessonSelect,
            selectLesson
          }}
        >
          {children}
        </LessonContext.Provider>
      );

}

export const useLessonContext = () => useContext(LessonContext);