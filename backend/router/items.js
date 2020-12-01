const express = require("express");
const axios = require("axios");
const { mapItem, mapResponse } = require("../utils");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const response = await axios.get(
            `https://api.mercadolibre.com/sites/MLA/search?q=${req.query.q}`
        );
        const categories = response.data.filters.find(filter => filter.id === "category");

        res.json(mapResponse(response.data.results, categories));
    } catch (error) {
        if (error.response) {
            res
                .status(error.response.status)
                .json({ error: error.response.data.message });
        }
    }
});

router.get("/:id", async (req, res) => {
    try {
        const item = await axios.get(
            `https://api.mercadolibre.com/items/${req.params.id}`
        );

        const description = await axios.get(
            `https://api.mercadolibre.com/items/${req.params.id}/description`
        );

        const response = mapItem(item.data);
        response.sold_quantity = item.data.sold_quantity;
        response.description = description.data.plain_text;
        response.picture = item.data.pictures[0].url;

        const result = {
            author: {
                name: "Mauro",
                lastname: "Jeandet"
            },
            item: response
        };

        res.json(result);
    } catch (error) {
        if (error.response) {
            res
                .status(error.response.status)
                .json({ error: error.response.data.message });
        }
    }
});

router.get("/categories/:id", async (req, res) => {
    try {
        const category = await axios.get(
            `https://api.mercadolibre.com/categories/${req.params.id}`
        );

        const result = {
            categories: category.data.path_from_root.map(c => c.name)
        }

        res.json(result);
    } catch (error) {
        if (error.response) {
            res
                .status(error.response.status)
                .json({ error: error.response.data.message });
        }
    }
});

module.exports = router;