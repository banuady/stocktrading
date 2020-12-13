import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import GoogleAuth from './GoogleAuth';

class Header extends React.Component {
  state = {};

  componentDidMount() {
    this.setState({ activeMenu: this.props.location.pathname });
  }

  renderIndividualMenu(path, title) {
    const { activeMenu } = this.state;

    return (
      <Link
        to={path}
        className={`item ${activeMenu === path ? 'active' : ''}`}
        onClick={() => this.setState({ activeMenu: path })}
      >
        {title}
      </Link>
    );
  }

  render() {
    if (this.props.isSignedIn) {
      return (
        <div className="ui blue inverted menu">
          {this.renderIndividualMenu('/stocks', 'Stocks')}
          {this.renderIndividualMenu('/forex', 'Forex')}
          {this.renderIndividualMenu('/reports', 'Reports')}

          <div className="right menu">
            <div className="item">
              <div className="ui transparent icon input">
                <input type="text" placeholder="Search Stock..." />
                <i className="search link icon"></i>
              </div>
            </div>
            <GoogleAuth />
          </div>
        </div>
      );
    } else {
      return (
        <div className="ui blue inverted menu">
          <div className="right menu">
            <GoogleAuth />
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

// we use "withRouter" to get access to location.pathname in props
const WrappedHeader = withRouter(Header);

export default connect(mapStateToProps)(WrappedHeader);
