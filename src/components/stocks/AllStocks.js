import React from 'react';
import { connect } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
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

  render() {
    if (this.props.isSignedIn) {
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
    } else {
      return <div>You need to sign in first!!!</div>;
    }
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps)(AllStocks);
