
export const dateToTimestamp = value => {
    return new Date(value).getTime();
}

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