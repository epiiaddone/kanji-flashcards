export const Mnemonic = ({ mnemonicString }) => {
    //console.log("mnemonicString:", mnemonicString)

    const stringSplit = mnemonicString.split('*');
    //console.log(stringSplit);

    return (
        <div className="mnemonic">
            {stringSplit.map((s, i) => {
                if (s.indexOf('K[') > -1) {
                    let start = "K[".length;
                    let end = s.length - "]K".length;
                    return <span className="mnemonic-item mnemonic-kanji" key={i}>{s.slice(start, end)}</span>
                } else if (s.indexOf('R[') > -1) {
                    let start = "R[".length;
                    let end = s.length - "]R".length;
                    return <span className="mnemonic-item mnemonic-radical" key={i}>{s.slice(start, end)}</span>
                }
                else return s;
            })}
        </div>
    )
}



