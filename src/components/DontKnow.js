import { useLessonContext } from "../context/lesson_context";

export default function DontKnow() {

    const { dontKnowClick, answersActive } = useLessonContext();

    const modifiedOnDontKnowClick = answersActive ? dontKnowClick : null;
    return (
        <div className="dont-know" onClick={modifiedOnDontKnowClick}>Don't Know</div>
    )
}