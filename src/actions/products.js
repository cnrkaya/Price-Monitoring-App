import database from '../firebase/firebase';
import axios from 'axios';

// ADD_PRODUCT
export const addProduct = (product) => ({
    type: 'ADD_PRODUCT',
    product
});

export const startAddProduct = (productData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const {
            hostname = '',
            productName = '',
            currentPrice = 0,
            targetPrice = 0,
            imageURL = '',
            productURL = '',
            note = '',
            createdAt = 0
        } = productData;

        const product = { hostname, productName, currentPrice, targetPrice, imageURL, productURL, note, createdAt };
        return database.ref(`users/${uid}/products`).push(product)
            .then((ref) => {
                dispatch(addProduct({
                    id: ref.key,
                    ...product
                }));
            })
            .catch(() => {

            });
    }
};


//SET_PRODUCTS
export const setProducts = (products) => ({
    type: 'SET_PRODUCTS',
    products
});

export const startSetProducts = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/products`).once('value').then((snapshot) => {
            const products = [];
            snapshot.forEach((childSnaphot) => {
                products.push({
                    id: childSnaphot.key,
                    ...childSnaphot.val()
                });
            });

            dispatch(setProducts(products));
        });
    };
};


// EDIT_PRODUCT
export const editProduct = (id, updates) => ({
    type: 'EDIT_PRODUCT',
    id,
    updates
});

export const startEditProduct = (id, updates) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/products/${id}`).update(updates).then(() => {
            dispatch(editProduct(id, updates));
        });
    };
};

// REMOVE_PRODUCT
export const removeProduct = ( {id} = {} ) => ({
    type: 'REMOVE_PRODUCT',
    id
});

export const startRemoveProduct = ( {id} = {} ) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/products/${id}`).remove().then(() => {
            dispatch(removeProduct({ id }));
        });
    };
};


//
export const fetchScrapedProductBegin = () => ({
    type: 'FETCH_SCRAPED_PRODUCT_BEGIN'
});

export const fetchScrapedProductSuccess = (product) => ({
    type: 'FETCH_SCRAPED_PRODUCT_SUCCESS',
    product
}); 

export const fetchScrapedProductFailure = (error) => ({
    type: 'FETCH_SCRAPED_PRODUCT_FAILURE',
    error
});

export const startScrapeProduct = (productURL) => {
    return (dispatch) => {
        dispatch(fetchScrapedProductBegin());

        return axios.post('/scrape', { url: productURL })
        .then((response) => {
            response.data.currentPrice = parseFloat(response.data.currentPrice, 10) * 100;
            dispatch(fetchScrapedProductSuccess(response.data));
            //this.setState({ scrapedProduct: response.data });
            //recommendProduct();
        })
        .catch((error) => dispatch(fetchScrapedProductFailure('An error has occurred during the product scraping!')));
    }
}