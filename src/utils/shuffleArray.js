

export default function shuffleArray(inputArray) {
    for (let i = inputArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * inputArray.length);
        [inputArray[i], inputArray[j]] = [inputArray[j], inputArray[i]];
    }
}