import React from 'react';
import ProductsSummary from './ProductsSummary';
import ProductListFilters from './ProductListFilters';
import ProductList from './ProductList';
import RecommendedProductList from './RecommendedProductList';

const DashboardPage = () => (
    <div>
        <ProductsSummary />
        <ProductListFilters />
        <ProductList />
        <RecommendedProductList />
    </div>
);

export default DashboardPage;