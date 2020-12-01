import React from 'react';
import shipping from '../../assets/ic_shipping.png';

const Item = ({ item, detailsLink }) => {
    const handleDetailsLink = () => {
        detailsLink(item.id);
    }

    return (
        <div className="item" onClick={handleDetailsLink}>
            <div className="item-general">
                <img className="item-general__picture" src={item.thumbnail} alt={item.title} />
                <div className="item-general__info">
                    <div className="item-general__info-title">
                        <div className="item-general__info-price" >
                            <h1>${item.price.amount}</h1>
                            {item.free_shipping ? (
                                <img src={shipping} alt="Free shipping" />
                            ) : null}
                        </div>
                        <h4>{item.title}</h4>
                    </div>
                    <span>{item.address}</span>
                </div>
            </div>
        </div>
    );
}

export default Item;