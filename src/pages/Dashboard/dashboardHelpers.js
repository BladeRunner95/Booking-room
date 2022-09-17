import moment from "moment";

export const startDateToTimestamp = value => {
    return moment(value).startOf('hour').valueOf();
}

export const finishDateToTimestamp = value => {
    return moment(value).startOf('hour').valueOf() - 1;
}

export const finishTimeDisplay = v => {
    const hour = moment(v).hour() + 1;
    return moment(v).clone().set({
        'hour': hour,
        'minute': 0,
        'second': 59,
        'millisecond': 59
    }).format('yyyy-MM-DDTHH:mm')
};

export const myIdColumn = {
    '& .RaDatagrid-rowCell': {
        maxWidth: '130px',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    '& .RaDatagrid-headerCell': {
        maxWidth: '100px'
    }
}