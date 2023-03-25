 import heisig_kanji from './kanji-data';
 import shuffleArray from './shuffleArray';

export default function KanjiDisplay({lesson, questionNumber}){
    
    const questions = [];

    heisig_kanji[lesson].map(item => (
        questions.push(item[1])
    ));

    shuffleArray(questions);

    return(
        <div className="answer-display">
            <div className="kanji">{questions[questionNumber - 1]}</div>
        </div>
    );
}