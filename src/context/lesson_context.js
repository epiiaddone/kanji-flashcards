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
import { wk_api_kanji_data } from '../data/wk_api_kanji_data';

export const BUTTON_ORDER_VALUES = ['Numerical Order', 'Lowest Score', 'Oldest Review'];

const initialState = {
  highlight: '',
  correctCount: 0,
  falseCount: 0,
  questionNumber: 1,
  answersActive: true,
  correctPercent: 0,
  isGameOver: false,
  lesson: '',
  questionOrder: null,
  answerOrder: null,
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

  const selectLesson = (lesson) => {
    console.log("selectLesson:", lesson);
    //are these state updates being batched??
    dispatch({ type: RESET })
    dispatch({ type: LESSON_SELECTED, payload: lesson })

    const tempArray1 = [];
    const tempArray2 = [];
    let counter = 0;

    //state.lesson not yet updated, so use method argument
    heisig_kanji[lesson].map(item => {
      tempArray1.push(counter);
      tempArray2.push(counter++);
    });

    shuffleArray(tempArray1);
    shuffleArray(tempArray2);
    dispatch({ type: LOAD_GAME, payload: { tempArray1, tempArray2 } })
  }

  let currentQuestion = state.questionOrder ? state.questionOrder[state.questionNumber - 1] : null;

  const gameOver = () => {
    const newCorrectPercent = state.questionNumber > 1 ?
      Math.round(state.correctCount / state.questionNumber * 100) : 0;

    localStorage.setItem(state.lesson, newCorrectPercent);
    localStorage.setItem(state.lesson + '-date', new Date());

    dispatch({ type: GAME_OVER, payload: newCorrectPercent })

  }


  const verifyAnswer = (e) => {
    const clickedAnswerId = e.target.getAttribute('data-id');
    const clickedAnswerMeaning = e.target.getAttribute('data-meaning');
    const clickedAnswerCharacters = e.target.getAttribute('data-characters');
    const answerId = state.practiseMode ?
      heisig_kanji[state.lesson][state.practiseQuestion][0]
      : heisig_kanji[state.lesson][currentQuestion][0]

    const answerCharacters = state.practiseMode ?
      heisig_kanji[state.lesson][state.practiseQuestion][1]
      : heisig_kanji[state.lesson][currentQuestion][1]


    let isClickedCorrect = false;

    // if clicked answer button corresponding to question
    if (answerId == clickedAnswerId) isClickedCorrect = true;

    //for duplicate meanings in same lesson
    //if answer button has same meaning as question
    for (const [key, kanji] of Object.entries(wk_api_kanji_data)) {
      if (kanji.slug === answerCharacters
        && kanji.meanings[0] === clickedAnswerMeaning) isClickedCorrect = true;
    }

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
        console.log("nextQuestion has dispatched: NEXT_QUESTION")
        dispatch({ type: NEXT_QUESTION })
      }
    }
  }

  const setButtonOrder = (e) => {
    const selectedOrder = e.target.getAttribute('data-order');
    dispatch({ type: SET_BUTTON_ORDER, payload: selectedOrder })
  }

  const gameOverClicked = () => {
    dispatch({ type: RESET })
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
        gameOverClicked
      }}
    >
      {children}
    </LessonContext.Provider>
  );

}

export const useLessonContext = () => useContext(LessonContext);