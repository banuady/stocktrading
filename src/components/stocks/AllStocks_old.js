import React from 'react';
import { Table, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import ShowStockFormHeader from './table/ShowStocksTableHeader';
import ShowStockFormBody from './table/ShowStocksTableBody';

class AllStocks extends React.Component {
  // state = { showStocks: localStorage.getItem('showStocks') };
  state = {};

  componentDidMount() {
    // localStorage.setItem('showStocks', this.state.showStocks);
    this.setState({ showStocks: 'all' });
  }

  handleItemClick = (page) => {
    this.setState({ showStocks: page });
    // localStorage.setItem('showStocks', page);
    // console.log(page);
  };

  renderSubMenu(path, title) {
    const { showStocks } = this.state;
    // console.log(this.state.showStocks);

    return (
      <Link to="/" className={`item ${showStocks === path ? 'active' : ''}`} onClick={() => this.handleItemClick(path)}>
        {title}
      </Link>
    );
  }

  render() {
    return (
      <div>
        <div aria-label="Pagination Navigation" role="navigation" className="ui pagination pointing secondary menu">
          {this.renderSubMenu('all', 'All Transactions')}
          {this.renderSubMenu('active', 'Active Transactions')}
          {this.renderSubMenu('closed', 'Closed Transactions')}
        </div>

        <Table size="small">
          <ShowStockFormHeader />

          <ShowStockFormBody renderStocks={this.state.showStocks} />

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell>Total Stocks: 5</Table.HeaderCell>
              <Table.HeaderCell>Active Stocks: 3</Table.HeaderCell>
              <Table.HeaderCell />
            </Table.Row>
          </Table.Footer>
        </Table>
      </div>
    );
  }
}

export default AllStocks;
