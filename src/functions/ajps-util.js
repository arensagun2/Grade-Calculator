export function getLetterGrade(score) {
    if (score >= 97) {
        return 'A+';
    } else if (score >= 93) {
        return 'A';
    } else if (score >= 90) {
        return 'A-';
    } else if (score >= 87) {
        return 'B+';
    } else if (score >= 83) {
        return 'B';
    } else if (score >= 80) {
        return 'B-';
    } else if (score >= 77) {
        return 'C+';
    } else if (score >= 73) {
        return 'C';
    } else if (score >= 70) {
        return 'C-';
    } else if (score >= 67) {
        return 'D+';
    } else if (score >= 63) {
        return 'D';
    } else if (score >= 60) {
        return 'D-';
    } else {
        return 'F';
    }
}