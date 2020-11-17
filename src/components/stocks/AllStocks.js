import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
// import ShowStockFormHeader from './table/ShowStocksTableHeader';
// import ShowStockFormBody from './table/ShowStocksTableBody';
import ShowStocksTable from './table/ShowStocksTable';

class AllStocks extends React.Component {
  state = {
    options: [
      { key: 'all', text: 'All Transactions', value: 'all' },
      { key: 'active', text: 'Active Transactions', value: 'active' },
      { key: 'closed', text: 'Closed Transactions', value: 'closed' },
    ],
  };

  componentDidMount() {
    this.setState({ showStocks: 'all' });
  }

  handleChange = (e, result) => {
    this.setState({ showStocks: result.value });
  };

  // stockStats(totalStocks, activeStocks = 0) {
  //   // console.log('Calculate stats...');
  //   console.log(totalStocks);
  //   console.log(activeStocks);
  //   if (totalStocks) {
  //     return (
  //       <Table.Footer>
  //         <Table.Row>
  //           <Table.HeaderCell>Total Stocks: {totalStocks}</Table.HeaderCell>
  //           <Table.HeaderCell>Active Stocks: {activeStocks}</Table.HeaderCell>
  //           <Table.HeaderCell />
  //         </Table.Row>
  //       </Table.Footer>
  //     );
  //   }
  // }

  render() {
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link to={`/stocks/add`} className="ui button primary">
            Add Stock
          </Link>
          <Dropdown
            className="right"
            selection
            options={this.state.options}
            defaultValue={this.state.options[0].value}
            onChange={this.handleChange}
          />
        </div>

        <ShowStocksTable renderStocks={this.state.showStocks} />
      </div>
    );
  }
}

// <Table size="small">
//           <ShowStockFormHeader />

//           <ShowStockFormBody renderStocks={this.state.showStocks} getStats={this.stockStats} />

//           {this.stockStats()}
//         </Table>

export default AllStocks;
