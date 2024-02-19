import { radicalData } from "../data/radical-data"

export const Radicals = ({ radicalIds }) => {
    console.log("inside Radicals");

    if (!radicalIds) {
        return (
            <div className="radicals" >Coming Soon!</div>
        )
    }


    return (
        <div className="radicals" >
            {
                radicalIds.map(radicalID => {
                    return (
                        <div
                            className="radical"
                            key={radicalID}
                        >
                            <div className="radical--characters">
                                {radicalData[radicalID]?.characters === 'null' ?
                                    <img className="radical--image" src={radicalData[radicalID].image} />
                                    : radicalData[radicalID].characters}
                            </div>
                            <div className="radical--slug">{radicalData[radicalID].slug}</div>
                        </div>
                    )
                })
            }
        </div >
    )

}