export const getTimeRange = (startDate, finishDate) => {
    let list = [];
    while (startDate <= finishDate) {
        list.push(startDate);
        startDate = startDate + (60 * 60 * 1000);
    }
    return list;
};