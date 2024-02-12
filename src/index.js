import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from './context/theme_context';
import { LessonProvider } from './context/lesson_context';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { GamePage } from './pages/GamePage';
import { ErrorPage } from './pages/ErrorPage';

import './index.css';
import './css/answer-buttons.css';
import './css/game-over.css';
import './css/game-header.css';
import './css/kanji-display.css';
import './css/kanji-info.css';
import './css/lesson-select.css';
import './css/score.css';
import './css/mnemonic.css';
import './css/radicals.css';
import './css/meanings.css';
import './css/example-word.css';
import './css/banner.css';
import './css/landing-header.css';
import './css/game-page.css';

// this order is import as overwrite colors
import './css/theme-toggle.css';
import './css/highlight.css';
import './css/score-colors.css';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <LessonProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="game" element={<GamePage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </LessonProvider>
    </ThemeProvider>
  </React.StrictMode>
);

