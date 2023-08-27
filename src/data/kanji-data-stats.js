import heisig_kanji from "./kanji-data";

export default function kanjiDataStats(){
    const lessonSizes = [];
    let largestLesson = ['none', 0];

    for(const lesson in heisig_kanji){
        lessonSizes.push([lesson, heisig_kanji[lesson].length]);
        if(heisig_kanji[lesson].length> largestLesson[1]){
            largestLesson[0] = lesson;
            largestLesson[1] = heisig_kanji[lesson].length;
        }
    }
    //console.log(lessonSizes);
    console.log("largest-lesson:" + largestLesson);
}