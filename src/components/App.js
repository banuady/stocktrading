import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Header from './Header';
import history from '../history';
import AllStocks from './stocks/AllStocks';
import AddStock from './stocks/AddStock';
import EditStock from './stocks/EditStock';
import SellStock from './stocks/SellStock';
import DeleteStock from './stocks/DeleteStock';
import Reports from './Reports';

const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <div>
          <Header />
          <Switch>
            <Route path="/" exact component={AllStocks} />
            <Route path="/stocks/add" exact component={AddStock} />
            <Route path="/stocks/edit/:id" exact component={EditStock} />
            <Route path="/sell/:id" exact component={SellStock} />
            <Route path="/reports" exact component={Reports} />
            <Route path="/stocks/delete/:id" exact component={DeleteStock} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
