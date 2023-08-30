import { useLessonContext } from "../context/lesson_context";

export default function DontKnow(){

    const {lesson, dontKnowClick, answersActive} = useLessonContext();

    const modifiedOnDontKnowClick = answersActive ? dontKnowClick : null;

    if(lesson ==='none') return(<></>);
    else return(
        <div className="dont-know" onClick={modifiedOnDontKnowClick}>Don't Know</div>
    )
}