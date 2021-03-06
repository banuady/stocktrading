import React from 'react';
import { connect } from 'react-redux';
import { Form, Radio } from 'semantic-ui-react';
import { fetchStock, editStock } from '../../actions';
import StockForm from './StockForm';

class EditStock extends React.Component {
  state = {};

  handleChange = (e, { value }) => this.setState({ value });

  componentDidMount() {
    this.props.fetchStock(this.props.match.params.id);
    this.setState({ value: 'purchased' });
  }

  setInitialValues() {
    const stock = this.props.stock;

    if (this.state.value === 'purchased') {
      this.initialValues = {
        symbol: stock.symbol,
        name: stock.name,
        date: stock.purchased.date,
        unitPrice: stock.purchased.unitPrice,
        quantity: stock.purchased.quantity,
        fees: stock.purchased.fees,
      };
    }

    if (this.state.value === 'sold') {
      this.initialValues = {
        symbol: stock.symbol,
        name: stock.name,
        date: stock.sold.date,
        unitPrice: stock.sold.unitPrice,
        quantity: stock.sold.quantity,
        fees: stock.sold.fees,
      };
    }

    if (this.state.value === 'dividents') {
      this.initialValues = {
        symbol: stock.symbol,
        name: stock.name,
        date: stock.dividents.date,
        unitPrice: stock.dividents.unitPrice,
        quantity: stock.dividents.quantity,
        fees: stock.dividents.fees,
      };
    }
  }

  toggleSoldButtonVisibility() {
    return (
      <Radio
        label="Sold"
        name="radioGroup"
        value="sold"
        disabled={this.props.stock.sold ? false : true}
        checked={this.state.value === 'sold'}
        onChange={this.handleChange}
      />
    );
  }

  toggleDividentsButtonVisibility() {
    return (
      <Radio
        label="Dividents"
        name="radioGroup"
        value="dividents"
        disabled={this.props.stock.dividents ? false : true}
        checked={this.state.value === 'dividents'}
        onChange={this.handleChange}
      />
    );
  }

  onSubmit = (formValues) => {
    this.props.editStock(this.props.match.params.id, formValues, this.state.value);
  };

  render() {
    // console.log(this.props);
    if (!this.props.isSignedIn) {
      return <div>Access Denied! You need to be signed in first!</div>;
    }

    if (!this.props.stock) {
      return <div>Loading...</div>;
    }

    if (this.props.stock.userId !== this.props.currentUserId) {
      return <div>We cannot find this stock in your portfolio.</div>;
    }

    this.setInitialValues();

    return (
      <div style={{ marginLeft: 200, marginRight: 200 }}>
        <Form>
          <h3>
            <label>Edit Stock</label>
          </h3>
          <Form.Group inline>
            <Form.Field>
              <Radio
                label="Purchased"
                name="radioGroup"
                value="purchased"
                checked={this.state.value === 'purchased'}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>{this.toggleSoldButtonVisibility()}</Form.Field>
            <Form.Field>{this.toggleDividentsButtonVisibility()}</Form.Field>
          </Form.Group>
        </Form>
        <hr />
        <StockForm initialValues={this.initialValues} onSubmit={this.onSubmit} enableReinitialize={true} />
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

export default connect(mapStateToProps, { fetchStock, editStock })(EditStock);
