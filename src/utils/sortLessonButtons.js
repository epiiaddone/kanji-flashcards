import { BUTTON_ORDER_VALUES } from "../context/lesson_context";
import heisig_kanji_map from "../data/kanji-data-map";

export function getSortedLessons(buttonOrder) {

    if (!BUTTON_ORDER_VALUES.includes(buttonOrder)) throw new Error(`No Matching "${buttonOrder}" - button order`);

    const keys = [...heisig_kanji_map.keys()];

    if (buttonOrder === 'Numerical Order') return keys;

    const lessonData = [];

    if (buttonOrder === 'Lowest Score') {

        keys.map(lesson => {
            if (localStorage.getItem(lesson)) {
                lessonData.push([lesson, localStorage.getItem(lesson)])
            }
        })
        //console.log(lessonData);

        lessonData.sort((a, b) => parseInt(a[1]) - parseInt(b[1]))
        //console.log(lessonData);
    }

    if (buttonOrder === 'Oldest Review') {
        keys.map(lesson => {
            if (localStorage.getItem(lesson + "-date")) {
                lessonData.push([lesson, localStorage.getItem(lesson + "-date")])
            }
        })
        //console.log(lessonData);

        lessonData.sort((a, b) => Date.parse(a[1]) - Date.parse(b[1]))
        //console.log(lessonData);
    }

    const sortedKeys = [];
    lessonData.forEach(data => sortedKeys.push(data[0]));
    keys.forEach(lesson => {
        if (!sortedKeys.includes(lesson)) sortedKeys.push(lesson)
    })
    //console.log(sortedKeys);

    return sortedKeys;
}