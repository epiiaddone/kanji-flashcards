import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Game from './components/Game';
import { ThemeProvider } from './context/theme_context';
import { AnswerProvider } from './context/answer_context';
import { LessonProvider } from './context/lesson_context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <LessonProvider>
        <AnswerProvider>
          <Game/>
        </AnswerProvider>
      </LessonProvider>
    </ThemeProvider>
  </React.StrictMode>
);

