const productsReducerDefaultState = [];

const productsReducer = (state = productsReducerDefaultState, action) => {
    switch(action.type) {
        case 'ADD_PRODUCT':
            return [
                ...state,
                action.product
            ];
        case 'SET_PRODUCTS':
            return action.products;
        default:
            return state;
    }
};

export default productsReducer;