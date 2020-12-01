const countDecimals = value => {
    if (Math.floor(value) === value) return 0;
    return value.toString().split(".")[1].length || 0;
};

const mapItem = ({
    id,
    title,
    currency_id,
    price,
    thumbnail,
    condition,
    seller_address,
    shipping,
    category_id
}) => {
    return {
        id,
        title,
        price: {
            currency: currency_id,
            amount: price,
            decimals: countDecimals(price)
        },
        thumbnail,
        condition,
        category_id,
        address: seller_address.state.name,
        free_shipping: shipping.free_shipping
    };
};

const mapResponse = (items, categories) => {
    return {
        author: {
            name: "Mauro",
            lastname: "Jeandet"
        },
        categories: categories
            ? categories.values[0].path_from_root.map(category => category.name)
            : [],
        items: items.slice(0, 4).map(item => mapItem(item))
    };
};

module.exports = { mapItem, mapResponse };