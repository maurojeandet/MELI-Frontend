import { useState } from 'react';
import { Route, Switch, useHistory, withRouter } from 'react-router-dom';
import ProductDetails from './components/ProductDetails';
import SearchBox from './components/SearchBox';
import SearchResult from './components/SearchResult';
import './App.scss';

const App = () => {
    const history = useHistory();
    const [query, setQuery] = useState("");
    const [productId, setProductId] = useState("");

    const handleSearchSubmit = (q) => {
        setQuery(q);
        history.push("/items?search=" + q);
    };

    const handleGoToDetails = (id) => {
        setProductId(id);
        history.push("/items/" + id);
    }

    return (
        <div className="App">
            <SearchBox handleSearchFormSubmit={handleSearchSubmit} />

            <Switch>
                <Route exact path="/" />
                <Route path="/items/:id">
                    <ProductDetails id={productId} />
                </Route>
                <Route path="/items">
                    <SearchResult searchQuery={query} goToDetails={handleGoToDetails} />
                </Route>
            </Switch>
        </div>
    );
}

export default withRouter(App);
