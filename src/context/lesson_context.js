import { createContext, useContext, useEffect, useReducer } from 'react';

import lesson_reducer from '../reducers/lesson_reducer';

import heisig_kanji from '../data/wk-kanji-data';
import shuffleArray from '../utils/shuffleArray';

import {
  LOAD_GAME,
  LESSON_SELECTED,
  CORRECT_ANSWER,
  INCORRECT_ANSWER,
  DONT_KNOW_ANSWER,
  NEXT_QUESTION,
  GAME_OVER,
  RESET,
  SET_BUTTON_ORDER,
  ENTER_PRACTISE_MODE
} from '../actions';

export const BUTTON_ORDER_VALUES = ['Numerical Order', 'Lowest Score', 'Oldest Review'];

const initialState = {
  highlight: '',
  correctCount: 0,
  falseCount: 0,
  questionNumber: 1,
  answersActive: true,
  correctPercent: 0,
  isGameOver: false,
  lesson: '1',
  questionOrder: [0],
  answerOrder: [0],
  isShowInfo: false,
  highlightAnswerId: null,
  buttonOrder: BUTTON_ORDER_VALUES[0],
  practiseMode: false,
  practiseKanji: [],
  practiseQuestion: null,
}

const LessonContext = createContext();

export const LessonProvider = ({ children }) => {

  const [state, dispatch] = useReducer(lesson_reducer, initialState);

  useEffect(() => {
    if (state.lesson === 'none') return;
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
    dispatch({ type: LOAD_GAME, payload: { tempArray1, tempArray2 } })
  }, [state.lesson])


  const selectLesson = (lesson) => {
    console.log("selectLesson:", lesson);
    dispatch({ type: LESSON_SELECTED, payload: lesson })
  }

  let currentQuestion = state.questionOrder[state.questionNumber - 1];

  const gameOver = () => {
    const newCorrectPercent = state.questionNumber > 1 ?
      Math.round(state.correctCount / state.questionNumber * 100) : 0;

    localStorage.setItem(state.lesson, newCorrectPercent);
    localStorage.setItem(state.lesson + '-date', new Date());

    dispatch({ type: GAME_OVER, payload: newCorrectPercent })

  }


  const verifyAnswer = (e) => {
    const clickedAnswerId = e.target.getAttribute('data-id')

    let isClickedCorrect;
    if (state.practiseMode) isClickedCorrect = heisig_kanji[state.lesson][state.practiseQuestion][0] === clickedAnswerId;
    else isClickedCorrect = heisig_kanji[state.lesson][currentQuestion][0] === clickedAnswerId;

    if (isClickedCorrect) {
      dispatch({ type: CORRECT_ANSWER, payload: { clickedAnswerId: clickedAnswerId, currentQuestion: currentQuestion } })
    } else {
      dispatch({ type: INCORRECT_ANSWER, payload: { clickedAnswerId: clickedAnswerId, currentQuestion: currentQuestion } })
    }
  }

  const dontKnowClick = () => {
    let questionId;
    if (state.practiseMode) {
      questionId = heisig_kanji[state.lesson][state.practiseQuestion][0];
    } else {
      questionId = heisig_kanji[state.lesson][currentQuestion][0];
    }
    dispatch({ type: DONT_KNOW_ANSWER, payload: { currentQuestionId: questionId, currentQuestion: currentQuestion } })
  }

  const nextQuestion = () => {
    if (state.practiseMode) {
      if (state.practiseKanji.length === 0) {
        gameOver();
      } else {
        dispatch({ type: NEXT_QUESTION })
      }
    } else {
      const isLastQuestion = state.questionNumber >= heisig_kanji[state.lesson].length;
      if (isLastQuestion && state.practiseKanji.length > 0) {
        dispatch({ type: ENTER_PRACTISE_MODE });
        dispatch({ type: NEXT_QUESTION });
      } else if (isLastQuestion) {
        gameOver();
      } else {
        dispatch({ type: NEXT_QUESTION })
      }
    }
  }

  const setButtonOrder = (e) => {
    const selectedOrder = e.target.getAttribute('data-order');
    dispatch({ type: SET_BUTTON_ORDER, payload: selectedOrder })
  }

  return (
    <LessonContext.Provider
      value={{
        ...state,
        currentQuestion,
        verifyAnswer,
        dontKnowClick,
        selectLesson,
        nextQuestion,
        setButtonOrder,
      }}
    >
      {children}
    </LessonContext.Provider>
  );

}

export const useLessonContext = () => useContext(LessonContext);