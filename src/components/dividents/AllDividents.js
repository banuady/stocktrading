import React from 'react';
import { Link } from 'react-router-dom';

class AllDividents extends React.Component {
  render() {
    return (
      <div>
        <Link to="/dividents/add" className="ui button primary">
          Add Dividents
        </Link>
        <div>All Dividents Component</div>
      </div>
    );
  }
}

export default AllDividents;
