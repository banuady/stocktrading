import React from 'react';
import { connect } from 'react-redux';
import { fetchStock, addDividents } from '../../actions';
import StockForm from './StockForm';

class AddDividents extends React.Component {
  componentDidMount() {
    this.props.fetchStock(this.props.match.params.id);
  }

  onSubmit = (formValues) => {
    // console.log(formValues);
    this.props.addDividents(this.props.match.params.id, formValues);
  };

  render() {
    if (!this.props.isSignedIn) {
      return <div>Access Denied! You need to be signed in first!</div>;
    }

    if (!this.props.stock) {
      return <div>Loading...</div>;
    }

    if (this.props.stock.userId !== this.props.currentUserId) {
      return <div>We cannot find this stock in your portfolio.</div>;
    }

    console.log(this.props);

    return (
      <div style={{ marginLeft: 200, marginRight: 200 }}>
        <h3>Add Dividents</h3>
        <StockForm
          initialValues={{
            symbol: this.props.stock.symbol,
            name: this.props.stock.name,
            quantity: this.props.stock.purchased.quantity,
            fees: '0',
          }}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    currentUserId: state.auth.userId,
    stock: state.stocks[ownProps.match.params.id],
  };
};

export default connect(mapStateToProps, { fetchStock, addDividents })(AddDividents);
