import { createContext, useContext, useReducer } from 'react';

import lesson_reducer from '../reducers/lesson_reducer';

import {
    OPEN_LESSON_SELECT
} from '../actions';


const initialState ={
    isLessonSelectOpen:false,
    lesson: '1',
}

const LessonContext = createContext();

export const LessonProvider = ({children})=>{

    const [state, dispatch] = useReducer(lesson_reducer, initialState);

    const openLessonSelect = ()=>{
        dispatch({type:OPEN_LESSON_SELECT})
    }

    return (
        <LessonContext.Provider
          value={{
            ...state,
            openLessonSelect
          }}
        >
          {children}
        </LessonContext.Provider>
      );

}

export const useLessonContext = () => useContext(LessonContext);