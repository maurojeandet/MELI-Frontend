import axios from 'axios';
import { useEffect, useState } from 'react';
import Breadcrump from '../Breadcrump';

const ProductDetails = ({ id }) => {
    const [product, setProduct] = useState({});

    useEffect(() => {
        let prodId = id;
        if (!prodId) {
            const split = window.location.href.split("/");
            prodId = split[split.length - 1];
        }

        axios.get("http://localhost:3001/api/items/" + prodId)
            .then(res => {
                const obj = res.data.item;
                setProduct(obj);
            })
            .catch(error => console.log(error));
    }, [id]);

    return (
        <div className="total-view">
            <Breadcrump category={product.category_id} />
            <div className="body-content">
                <div className="product">
                    <div className="item-detail">
                        <div className="item-detail__picture">
                            <img src={product.picture} alt={product.title} />
                        </div>
                        <div className="item-detail__description">
                            <h3>Descripción del producto</h3>
                            <p>{product.description}</p>
                        </div>
                    </div>
                    <div className="item-buy">
                        <div className="item-detail__info">
                            <p>
                                {product.condition} - {" "}
                                {product.sold_quantity} vendidos
                            </p>
                            <h3>{product.title}</h3>
                            <h1>$ {product.price?.amount}</h1>
                            <button className="button">Comprar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ProductDetails;