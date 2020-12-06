import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Header from './Header';
import history from '../history';
import Home from './Home';
import AllStocks from './stocks/AllStocks';
import AddStock from './stocks/AddStock';
import EditStock from './stocks/EditStock';
import SellStock from './stocks/SellStock';
import DeleteStock from './stocks/DeleteStock';
import AllDividents from './dividents/AllDividents';
import AddDividents from './dividents/AddDividents';
import AllForex from './forex/AllForex';
import AddForex from './forex/AddForex';
import Reports from './Reports';

const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <div>
          <Header />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/stocks" exact component={AllStocks} />
            <Route path="/stocks/add" exact component={AddStock} />
            <Route path="/stocks/edit/:id" exact component={EditStock} />
            <Route path="/stocks/sell/:id" exact component={SellStock} />
            <Route path="/stocks/delete/:id" exact component={DeleteStock} />
            <Route path="/dividents" exact component={AllDividents} />
            <Route path="/dividents/add" exact component={AddDividents} />
            <Route path="/forex" exact component={AllForex} />
            <Route path="/forex/add" exact component={AddForex} />
            <Route path="/reports" exact component={Reports} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
