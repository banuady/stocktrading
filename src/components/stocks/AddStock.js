import React from 'react';
import { connect } from 'react-redux';
import { createStock } from '../../actions';
import StockForm from './StockForm';

class AddStock extends React.Component {
  componentDidMount() {
    localStorage.setItem('currentLocation', this.props.location.pathname);
  }

  onSubmit = (formValues) => {
    this.props.createStock(formValues);
  };

  render() {
    return (
      <div style={{ marginLeft: 200, marginRight: 200 }}>
        <h3>Add Stock</h3>
        <StockForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(null, { createStock })(AddStock);
