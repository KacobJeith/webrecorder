import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { apiPath, supportEmail } from 'config';


class RegisterAccount extends Component {

  static contextTypes = {
    router: PropTypes.object
  };

  static propTypes = {
    match: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = { error: false };
  }

  componentDidMount() {
    const { match } = this.props;
    const reg = match.params.registration;
    const validateApi = `${apiPath}/auth/validate`;
    document.cookie = `valreg=${reg}; Max-Age=60; Path=${validateApi}`;

    const data = new FormData();
    data.append('reg', reg);

    // call user registration endpoint
    fetch(validateApi, {
      credentials: 'same-origin',
      headers: new Headers({ 'x-requested-with': 'XMLHttpRequest' }),
      method: 'POST',
      body: data
    }).then(res => res.json())
      .then((result) => {
        if (result.error) {
          this.setState({ error: true });
        } else {
          // redirect to homepage, disregard history
          window.location = '/';
        }
      });
  }

  render() {
    const { error } = this.state;

    return (
      <React.Fragment>
        {
          error ?
            <React.Fragment>
              <h2>Error Validating Registration</h2>
              <p>Please try the link again or contact <a href={`mailto:${supportEmail}`}>{supportEmail}</a> if the problem persists.</p>
            </React.Fragment> :
            <h2>Validating Registration...</h2>
        }
      </React.Fragment>
    );
  }
}

export default RegisterAccount;
