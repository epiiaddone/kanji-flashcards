import heisig_kanji from './kanji-data';
import React from 'react';
import PropTypes from 'prop-types';
import './kanjiDisplay.css';

export const KanjiDisplay = ({gameVisible, lesson, currentQuestion}) =>{
    if(!gameVisible) return(<></>);
    else return(
        <div className="kanji-display">
            <div className="kanji-display__text" 
                data-id={heisig_kanji[lesson][currentQuestion][0]}
            >{heisig_kanji[lesson][currentQuestion][1]}</div>
        </div>
    );
};


KanjiDisplay.propTypes = {
    /**
     * Should the component be displayed?
     */
    gameVisbile: PropTypes.bool,
    /**
     * What lesson is being played
     */
    lesson: PropTypes.oneOf(['1', '6a', '18c']),
    /**
     * Question number
     */
    currentQuestion: PropTypes.number,
  };

KanjiDisplay.defaultProps = {
    gameVisible: true,
    lesson: '1',
    currentQuestion: 1
  };