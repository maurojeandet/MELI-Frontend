import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Breadcrump = ({ category }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        let categoryId = category;
        if (!categoryId) {
            const split = window.location.href.split("/");
            categoryId = split[split.length - 1];
        }

        axios.get("http://localhost:3001/api/items/categories/" + category)
            .then(res => {
                const array = [];
                for (let index = 0; index < res.data.categories.length; index++) {
                    const element = res.data.categories[index];
                    array.push({
                        id: index,
                        name: element
                    });
                }
                setCategories(array);
            })
            .catch(error => console.log(error));
    }, [category]);

    return (
        <ul className="breadcrumb">
            {
                categories?.map(c => {
                    let value = c.name;
                    if (c.id !== (categories.length - 1)) {
                        value = value + " > ";
                    }
                    return (<li key={c.id}>{value}</li>)
                })
            }
        </ul>
    )
}

export default Breadcrump;