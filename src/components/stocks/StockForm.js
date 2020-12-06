import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

class StockForm extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderInput = (formProps) => {
    const className = 'field';

    // console.log(formProps);
    return (
      <div className={className}>
        <label>{formProps.label}</label>
        <input {...formProps.input} type={formProps.type} autoComplete="off" />
        {this.renderError(formProps.meta)}
      </div>
    );
  };

  onSubmit = (formValues) => {
    // console.log(formValues);
    this.props.onSubmit(formValues);
  };

  render() {
    if (!this.props.isSignedIn) {
      return <div>You need to be logged in first!</div>;
    }

    console.log(this.props);
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
        <Field name="symbol" component={this.renderInput} type="text" label="Enter Stock Symbol(*)" />
        <Field name="name" component={this.renderInput} type="text" label="Enter Stock Name" />
        <Field name="date" component={this.renderInput} type="date" label="Transaction Date(*)" />
        <Field name="unitPrice" component={this.renderInput} type="number" label="Unit Price(*)" />
        <Field name="quantity" component={this.renderInput} type="number" min="0" step="1" label="Quantity(*)" />
        <Field name="fees" component={this.renderInput} type="number" label="Broker's Commission(*)" />
        <button className="ui button primary left floated">Submit</button>
        <Link to="/stocks" className="ui button right floated">
          Cancel
        </Link>
      </form>
    );
  }
}

const validate = (formValues) => {
  // console.log(formValues);
  const errors = {};

  if (!formValues.symbol) {
    errors.stockSymbol = 'You must enter a Stock Symbol!';
  }

  if (!formValues.date) {
    errors.date = "You must enter the transaction's date!";
  }

  if (!formValues.unitPrice) {
    errors.unitPrice = 'What was the price for 1 share?';
  }

  if (formValues.unitPrice <= 0) {
    errors.unitPrice = 'The price should be greater than 0!';
  }

  if (!formValues.quantity) {
    errors.quantity = 'How many shares?';
  }

  if (formValues.quantity < 0) {
    errors.quantity = 'Quantity should be a positive number!';
  }

  if (!formValues.fees) {
    errors.fees = 'How much was the brokerage fees for this transaction?';
  }

  if (formValues.fees < 0) {
    errors.fees = 'Brokerage fees should be $0 or greater.';
  }

  return errors;
};

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

// export default reduxForm({
//   form: 'stockForm',
//   validate: validate,
// })(StockForm);

export default connect(mapStateToProps)(
  reduxForm({
    form: 'stockForm',
    validate: validate,
  })(StockForm)
);
