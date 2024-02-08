export const Meanings = ({ meaningsArray }) => {

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