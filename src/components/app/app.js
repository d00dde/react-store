import React from 'react';
import { Route, IndexRoute, Switch } from 'react-router-dom';
import ShopHeader from '../shop-header';
import { HomePage, CartPage } from '../pages';

import './app.css';

const App = () => {
  return (
      <main role="main" className="container">
        <ShopHeader numItems={5} total={210}/>
        <Switch>
        <IndexRoute
              component={HomePage}
              />
          <Route
              path="/"
              component={HomePage}
              exact />

          <Route
              path="/cart"
              component={CartPage}
          />
        </Switch>
      </main>
  );
};

export default App;
