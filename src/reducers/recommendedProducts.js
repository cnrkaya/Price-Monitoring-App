const recommendedProductsReducerDefaultState = [];

const recommendedProductsReducer = (state = recommendedProductsReducerDefaultState, action) => {
    switch(action.type) {
        case 'ADD_RECOMMENDED_PRODUCT':
            return [
                ...state,
                action.recommendedProduct
            ];
        case 'SET_RECOMMENDED_PRODUCTS':
            return action.recommendedProducts;
        default:
            return state;
    }
};

export default recommendedProductsReducer;