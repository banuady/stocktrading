import React from 'react';
import { connect } from 'react-redux';
import { Form, Radio } from 'semantic-ui-react';
import { fetchStock } from '../../actions';
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

    if (stock.sold) {
      this.initialValues =
        this.state.value === 'purchased'
          ? {
              symbol: stock.symbol,
              name: stock.name,
              date: stock.purchased.date,
              unitPrice: stock.purchased.unitPrice,
              quantity: stock.purchased.quantity,
              fees: stock.purchased.fees,
            }
          : {
              symbol: stock.symbol,
              name: stock.name,
              date: stock.sold.date,
              unitPrice: stock.sold.unitPrice,
              quantity: stock.sold.quantity,
              fees: stock.sold.fees,
            };
    } else {
      this.initialValues = {
        symbol: stock.symbol,
        name: stock.name,
        date: stock.purchased.date,
        unitPrice: stock.purchased.unitPrice,
        quantity: stock.purchased.quantity,
        fees: stock.purchased.fees,
      };
    }
  }

  toggleSoldButtonVisibility() {
    if (this.props.stock.sold) {
      return (
        <Radio
          label="Sold"
          name="radioGroup"
          value="sold"
          checked={this.state.value === 'sold'}
          onChange={this.handleChange}
        />
      );
    } else {
      return (
        <Radio
          label="Sold"
          name="radioGroup"
          value="sold"
          disabled
          checked={this.state.value === 'sold'}
          onChange={this.handleChange}
        />
      );
    }
  }

  onSubmit() {
    console.log('onSubmit function triggered');
  }

  render() {
    if (!this.props.stock) {
      return <div>Loading...</div>;
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
    stock: state.stocks[ownProps.match.params.id],
  };
};

export default connect(mapStateToProps, { fetchStock })(EditStock);
