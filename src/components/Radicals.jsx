import { radicalData } from "../data/radical-data"
import { RadicalSvg } from "./RadicalSvg";

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
                                    <RadicalSvg radicalSlug={radicalData[radicalID].slug} />
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