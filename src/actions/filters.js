// SET_TEXT_FILTER
export const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
});

// SORT_BY_DATE
export const sortByDate = () => ({
    type: 'SORT_BY_DATE'
});

// SORT_BY_CURRENT_PRICE
export const sortByCurrentPrice = () => ({
    type: 'SORT_BY_CURRENT_PRICE'
});

// SORT_BY_TARGET_PRICE
export const sortByTargetPrice = () => ({
    type: 'SORT_BY_TARGET_PRICE'
});

// SET_START_DATE
export const setStartDate = (startDate = undefined) => ({
    type: 'SET_START_DATE',
    startDate
});

// SET_END_DATE
export const setEndDate = (endDate = undefined) => ({
    type: 'SET_END_DATE',
    endDate
});