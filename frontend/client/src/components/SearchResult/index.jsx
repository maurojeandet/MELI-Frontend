import axios from 'axios';
import { useEffect, useState } from 'react';
import Breadcrump from '../Breadcrump';
import Item from '../Item';

const SearchResult = ({ searchQuery, goToDetails }) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        let query = searchQuery;
        if (!query) {
            query = window.location.search.split("=")[1];
        }

        axios.get("http://localhost:3001/api/items?q=" + query)
            .then(res => {
                const array = [];
                for (let index = 0; index < res.data.items.length; index++) {
                    const element = res.data.items[index];
                    array.push(element);
                }
                setItems(array);
            })
            .catch(error => console.log(error));
    }, [searchQuery]);

    return (
        <div className="total-view">
            <Breadcrump category={items[0]?.category_id} />
            <div className="body-content">
                {items?.map((item) => (<Item key={item.id} item={item} detailsLink={goToDetails} />))}
            </div>
        </div>
    );
};

export default SearchResult;