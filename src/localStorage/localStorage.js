


export const saveState = (state) => {
    try {
        const serializedLocations= JSON.stringify(state.locations);
        // const serializedUser= JSON.stringify(state.user);
        localStorage.setItem('filters', serializedLocations);
        // localStorage.setItem('user', serializedUser);
    } catch(err) {
        console.log('problem in saving new localStorage instance');
    }
};

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('filters');
        // const serializedStateUser = localStorage.getItem('user');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
        // return [JSON.parse(serializedState), JSON.parse(serializedStateUser)];
    } catch (err) {
        console.log('error loading localStorage state')
        return undefined;
    }
};