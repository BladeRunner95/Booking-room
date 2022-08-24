import moment from "moment";

export const getTimeRange = (startDate, finishDate) => {
    let list = [];
    while (startDate <= finishDate) {
        list.push(startDate);
        startDate = startDate + (60 * 60 * 1000);
    }
    return list;
};

export const startTimestampToDate = (timestamp) => {
    return new Date(timestamp.startDate);
};

export const finishTimestampToDate = (timestamp) => {
    return new Date(timestamp.finishDate);
};

export const times = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
export const timeDuration = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 24];
export const timePrefix = (hour) => ((hour + 11) % 12 + 1) + (hour >= 12 ? "pm" : "am");

export const inFifteenMinutes = new Date(new Date().getTime() + 30 * 60 * 1000);

export const toAmPm = (date) => moment(date).format('ha')