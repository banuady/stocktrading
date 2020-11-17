import React from 'react';

class Reports extends React.Component {
  componentDidMount() {
    localStorage.setItem('currentLocation', this.props.location.pathname);
  }

  render() {
    return <div>Reports</div>;
  }
}

export default Reports;
