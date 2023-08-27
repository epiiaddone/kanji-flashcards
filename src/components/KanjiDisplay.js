 import heisig_kanji from '../data/kanji-data';

export default function KanjiDisplay({gameVisible, lesson, currentQuestion}){
    if(!gameVisible) return(<></>);
    else return(
        <div className="kanji-display">
            <div className="kanji-display__text" 
                data-id={heisig_kanji[lesson][currentQuestion][0]}
            >{heisig_kanji[lesson][currentQuestion][1]}</div>
        </div>
    );
}