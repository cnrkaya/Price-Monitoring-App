import React from 'react';

import ProductsSummary from './ProductsSummary';
import ProductListFilters from './ProductListFilters';
import ProductList from './ProductList';

const DashboardPage = () => (
    <div>
        <ProductsSummary />
        <ProductListFilters />
        <ProductList />
    </div>
);

export default DashboardPage;