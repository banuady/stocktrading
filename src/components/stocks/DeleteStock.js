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
        <Link to="/stocks" className="ui button">
          Cancel
        </Link>
      </React.Fragment>
    );
  }

  renderContent() {
    return `Are you sure you want to delete the entry for ${this.props.stock.symbol} stock from your Portfolio?`;
  }

  render() {
    if (!this.props.isSignedIn) {
      return <div>Access Denied! You need to be signed in first!</div>;
    }

    if (!this.props.stock) {
      return <div>Loading...</div>;
    }

    if (this.props.stock.userId !== this.props.currentUserId) {
      return <div>You cannot delete this stock!</div>;
    }

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
    isSignedIn: state.auth.isSignedIn,
    currentUserId: state.auth.userId,
    stock: state.stocks[ownProps.match.params.id],
  };
};

export default connect(mapStateToProps, { fetchStock, deleteStock })(DeleteStock);
