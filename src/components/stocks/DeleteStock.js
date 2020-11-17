import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStock, deleteStock } from '../../actions';
import history from '../../history';
import Modal from '../Modal';

class DeleteStock extends React.Component {
  componentDidMount() {
    this.props.fetchStock(this.props.match.params.id);
  }

  renderActions() {
    // console.log('Deleting stock');
    const id = this.props.match.params.id;

    return (
      <React.Fragment>
        <button onClick={() => this.props.deleteStock(id)} className="ui button negative">
          Delete
        </button>
        <Link to="/" className="ui button">
          Cancel
        </Link>
      </React.Fragment>
    );
  }

  renderContent() {
    if (!this.props.stock) {
      return 'Are you sure you want to delete this stock?';
    }

    return `Are you sure you want to delete the entry for ${this.props.stock.symbol} stock from your Portfolio?`;
  }

  render() {
    return (
      <Modal
        title="Delete Stock"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push('/')}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    stock: state.stocks[ownProps.match.params.id],
  };
};

export default connect(mapStateToProps, { fetchStock, deleteStock })(DeleteStock);
