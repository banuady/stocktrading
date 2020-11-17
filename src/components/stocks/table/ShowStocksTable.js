import React from 'react';
import { connect } from 'react-redux';
import { Table, TableBody } from 'semantic-ui-react';
import { fetchAllStocks } from '../../../actions';
import IndividualStock from './IndividualStock';

class ShowStocksTable extends React.Component {
  componentDidMount() {
    // console.log(this.props);
    this.props.fetchAllStocks();
  }

  renderHeader() {
    return (
      <Table.Row>
        <Table.HeaderCell>Symbol</Table.HeaderCell>
        <Table.HeaderCell>Purchased</Table.HeaderCell>
        <Table.HeaderCell>Sold</Table.HeaderCell>
        <Table.HeaderCell>P/L</Table.HeaderCell>
        <Table.HeaderCell></Table.HeaderCell>
      </Table.Row>
    );
  }

  renderList() {
    // this returns each individual row
    return this.props.stocks.map((stock) => {
      // return all stocks if in 'All Transactions' page
      // Otherwise, return active or closed stocks only
      if (this.props.renderStocks === 'all') {
        return <IndividualStock key={stock.id} stock={stock} />;
      } else if (stock.status === this.props.renderStocks) {
        return <IndividualStock key={stock.id} stock={stock} />;
      }
    });
  }

  renderFooter() {
    let activeStocks = 0;
    if (this.props.stocks.length > 0) {
      activeStocks = this.props.stocks.filter((stock) => {
        if (stock.status === 'active') {
          return stock;
        }
      });
    }
    return (
      <Table.Row>
        <Table.HeaderCell>Total Stocks: {this.props.stocks.length}</Table.HeaderCell>
        <Table.HeaderCell>Active Stocks: {activeStocks.length}</Table.HeaderCell>
        <Table.HeaderCell></Table.HeaderCell>
        <Table.HeaderCell />
      </Table.Row>
    );
  }

  render() {
    return (
      <Table size="small">
        <Table.Header>{this.renderHeader()}</Table.Header>
        <TableBody>{this.renderList()}</TableBody>
        <Table.Footer>{this.renderFooter()}</Table.Footer>
      </Table>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    stocks: Object.values(state.stocks),
  };
};

export default connect(mapStateToProps, { fetchAllStocks })(ShowStocksTable);
