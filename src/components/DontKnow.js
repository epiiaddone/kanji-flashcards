
export default function DontKnow({gameVisible, onDontKnowClick, answersActive}){

    const modifiedOnDontKnowClick = answersActive ? onDontKnowClick : null;

    if(!gameVisible) return(<></>);
    else return(
        <div className="dont-know" onClick={modifiedOnDontKnowClick}>Don't Know</div>
    )
}