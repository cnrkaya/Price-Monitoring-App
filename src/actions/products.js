import { v4 as uuid } from 'uuid';
import database from '../firebase/firebase';

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