export const Meanings = ({ meaningsArray }) => {
    // console.log("inside Meanings");

    if (!meaningsArray) {
        return (
            <div className="meanings">
                Coming Soon!
            </div>
        )
    }

    return (
        <div className="meanings">
            {meaningsArray.map(m => {
                return (
                    <div key={m}>{m}</div>
                )
            })}
        </div>
    )
}