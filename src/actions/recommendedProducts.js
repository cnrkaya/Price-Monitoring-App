import database from '../firebase/firebase';

// ADD_RECOMMENDED_PRODUCT
export const addRecommendedProduct = (recommendedProduct) => ({
    type: 'ADD_RECOMMENDED_PRODUCT',
    recommendedProduct
});

export const startAddRecommendedProduct = (recommendedProductData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const {
            hostname = '',
            productName = '',
            currentPrice = 0,
            imageURL = '',
            productURL = ''
        } = recommendedProductData;

        const recommendedProduct = { hostname, productName, currentPrice, imageURL, productURL };
        return database.ref(`users/${uid}/recommendedProducts`).push(recommendedProduct)
            .then((ref) => {
                dispatch(addRecommendedProduct({
                    id: ref.key,
                    ...recommendedProduct
                }));
            })
            .catch(() => {

            });
    }
}

// SET_RECOMMENDED_PRODUCTS
export const setRecommendedProducts = (recommendedProducts) => ({
    type: 'SET_RECOMMENDED_PRODUCTS',
    recommendedProducts
});

export const startSetRecommendedProducts = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/recommendedProducts`).once('value').then((snapshot) => {
            const recommendedProducts = [];
            snapshot.forEach((childSnapshot) => {
                recommendedProducts.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });

            dispatch(setRecommendedProducts(recommendedProducts));
        });
    };
};
