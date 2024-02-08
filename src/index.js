import React from 'react';
import ReactDOM from 'react-dom/client';

import Game from './components/Game';
import { ThemeProvider } from './context/theme_context';
import { LessonProvider } from './context/lesson_context';

import './index.css';
import './css/answer-buttons.css';
import './css/game-over.css';
import './css/header.css';
import './css/kanji-display.css';
import './css/kanji-info.css';
import './css/lesson-select.css';
import './css/score.css';
import './css/mnemonic.css';
import './css/radicals.css';
import './css/meanings.css';

// this order is import as overwrite colors
import './css/theme-toggle.css';
import './css/highlight.css';
import './css/score-colors.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <LessonProvider>
        <Game />
      </LessonProvider>
    </ThemeProvider>
  </React.StrictMode>
);

