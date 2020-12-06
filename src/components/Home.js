import React from 'react';
import { connect } from 'react-redux';

class Home extends React.Component {
  render() {
    if (this.props.isSignedIn) {
      return <div>Chose an option from the menu</div>;
    } else {
      return <div>Please Login to access the website!</div>;
    }
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps)(Home);
