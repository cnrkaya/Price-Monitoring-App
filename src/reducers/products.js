const productsReducerDefaultState = [];

export const productsReducer = (state = productsReducerDefaultState, action) => {
    switch(action.type) {
        case 'ADD_PRODUCT':
            return [
                ...state,
                action.product
            ];
        case 'SET_PRODUCTS':
            return action.products;
        case 'EDIT_PRODUCT':
            return state.map((product) => {
                if(product.id === action.id) {
                    return {
                        ...product,
                        ...action.updates
                    }
                } else {
                    return product;
                }
            });
        case 'REMOVE_PRODUCT':
            return state.filter(({ id }) => {
                return id !== action.id;
            });
        default:
            return state;
    }
};


const scrapedProductReducerDefaultState = {
    isLoading: false,
    data: null,
    error: ''
}

export const scrapedProductReducer = (state = scrapedProductReducerDefaultState, action) => {
    switch(action.type) {
        case 'FETCH_SCRAPED_PRODUCT_BEGIN':
            return {
                isLoading: true,
                data: null,
                error: ''
            };
        case 'FETCH_SCRAPED_PRODUCT_SUCCESS':
            return {
                isLoading: false,
                data: action.product,
            };
        case 'FETCH_SCRAPED_PRODUCT_FAILURE':
            return {
                isLoading: false,
                data: null,
                error: action.error
            };
        default:
            return state;
    }
}
