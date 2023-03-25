import heisig_kanji from './kanji-data';
import shuffleArray from './shuffleArray';


export default function AnswerButtons({lesson}){
    const answers = [];
    heisig_kanji[lesson].map(e => ( 
        answers.push(e[2])
    ));

    shuffleArray(answers);

    return(
    <div className="answer-buttons-container">
        {answers.map(answer => (
        <div className="answer-button" key={answer}>{answer}</div>
        ))}    
    </div>
    );
}

