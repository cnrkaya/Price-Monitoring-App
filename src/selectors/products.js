import moment from 'moment';

const getVisibleProducts = (products, { text, sortBy, startDate, endDate }) => {
    return products.filter((product) => {
        const createdAtMoment = moment(product.createdAt);
        const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
        const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;
        const textMatch = product.productName.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if(sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1;
        }
        else if(sortBy === 'current_price') {
            return a.currentPrice < b.currentPrice ? 1 : -1;
        }
        else if (sortBy === 'target_price') {
            return a.targetPrice < b.targetPrice ? 1 : -1;
        }
    })
};

export default getVisibleProducts;