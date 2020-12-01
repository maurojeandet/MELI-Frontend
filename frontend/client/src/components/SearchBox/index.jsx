import React, { useState } from 'react';

const SearchBox = ({ handleSearchFormSubmit }) => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        handleSearchFormSubmit(searchQuery);
    }

    return (
        <div className="search-bar">
            <div className="search-bar__meli-section">
                <span className="search-bar__meli-icon"></span>
            </div>
            <form onSubmit={handleFormSubmit}>
                <input
                    type="text"
                    className="search-input"
                    onChange={handleInputChange}
                    placeholder="Nunca dejes de buscar"
                    aria-label="Escribe aquí lo que deseas buscar"
                    aria-required="true"
                    autoComplete="off"
                    autoFocus
                    maxLength="80"
                />
                <button
                    type="submit"
                    className="search-button"
                    aria-label="Presiona este botón para buscar"
                >
                    <span className="search-button__icon"></span>
                </button>
            </form>
        </div>
    );
}

export default SearchBox;