const productsReducerDefaultState = [];

const productsReducer = (state = productsReducerDefaultState, action) => {
    switch(action.type) {
        case 'ADD_PRODUCT':
            return [
                ...state,
                action.product
            ];
        default:
            return state;
    }
};

export default productsReducer;