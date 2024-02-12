import ThemeToggle from "./ThemeToggle"

export const LandingHeader = () => {
    return (
        <div className="landing-header">
            <div className="landing-header--logo">MKF</div>
            <div className="landing-header--title">Mutant Kanji Flashcards</div>
            <ThemeToggle />
        </div>
    )
}