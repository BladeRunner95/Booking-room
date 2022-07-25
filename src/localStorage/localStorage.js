


export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('filters', serializedState);
    } catch(err) {
        console.log('problem in saving new localStorage instance');
    }
};

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('filters');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        console.log('error loading localStorage state')
        return undefined;
    }
};