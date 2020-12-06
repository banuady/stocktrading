import React from 'react';
import { Link } from 'react-router-dom';

class AllForex extends React.Component {
  render() {
    return (
      <div>
        <Link to="/forex/add" className="ui button primary">
          Add Forex
        </Link>
        <div>All Forex Transactions</div>
      </div>
    );
  }
}

export default AllForex;
