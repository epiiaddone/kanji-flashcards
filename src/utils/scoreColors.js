
export const getScoreColorClassName = (score)=>{
    if(!score) return '';
    else if(score >= 90) return 'score-90';
    else if(score >= 80) return 'score-80';
    else if(score >= 70) return 'score-70';
    else if(score >= 60) return 'score-60';
    else if(score >= 50) return 'score-50';
    else if(score >= 40) return 'score-40';
    else if(score >= 30) return 'score-30';
    else if(score >= 20) return 'score-20';
    else return 'score-10';
}