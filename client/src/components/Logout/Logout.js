import React, { Component } from 'react';
import { AuthStore } from '../../helpers';
import { withRouter } from "react-router-dom";

class Logout extends Component {
  componentDidMount() {
    AuthStore.logout().then(() => {
      this.props.history.push('/');
    });
  }

  render() {
    return (
      <div>
        Logout
      </div>
    );
  }
}

export default withRouter(Logout);
