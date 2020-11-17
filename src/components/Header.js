import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

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
    return (
      <div className="ui blue inverted menu">
        {this.renderIndividualMenu('/', 'All Stocks')}
        {this.renderIndividualMenu('/stocks/add', 'Add Stock')}
        {this.renderIndividualMenu('/reports', 'Reports')}

        <div className="right menu">
          <div className="item">
            <div className="ui transparent icon input">
              <input type="text" placeholder="Search Stock..." />
              <i className="search link icon"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// we use "withRouter" to get access to location.pathname in props
const WrappedHeader = withRouter(Header);

export default WrappedHeader;
