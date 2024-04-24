

export const ExampleWord = ({ exampleWordString }) => {
    //console.log("ExampleWord:", exampleWordString)

    if (!exampleWordString) {
        return (
            <div className="example-word">
                There was a problem getting an example
            </div>
        )
    }

    if (exampleWordString === 'N/A') {
        return (
            <div className="example-missing">N/A</div>
        )
    }

    const vocabComponents = exampleWordString.split(",");

    return (
        <div className="example-word">
            <div className="example-word--kanji">{vocabComponents[0]}</div>
            <div className="example-word--reading">{vocabComponents[1]}</div>
            <div className="example-word--meaning">{vocabComponents[2]}</div>
        </div>
    )
}