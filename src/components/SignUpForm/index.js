import React, { PureComponent } from "react";

import "what-input";

import "./SignUpForm.scss";

import ENV from 'config/Environment';
import MailchimpSubscribe from 'react-mailchimp-subscribe';
const { MAILCHIMP_URL } = ENV;

class SignUpForm extends PureComponent {
  constructor(props) {
    super(...arguments);

    this.state = {
      emailAddress: '',
      message: '',
    };
  }

  handleChange = event => {
    this.setState({ emailAddress: event.target.value });
  };

  render() {
    const body = document.querySelector('body');

    body.addEventListener('keyup', function (event) {
      event.preventDefault();
      if (event.keyCode === 13) {
        const input = document.getElementById("submit")
        input.click();
      }
    });

    return (
      <div className={"SignUpForm"}>
        <MailchimpSubscribe
          url={MAILCHIMP_URL}
          render={({ subscribe, status }) => (
            <div>
              <label className="small">
                <h3>{this.props.title}</h3>
                <input
                  className="SignUpForm__input small ml1_25 p0 w100 inline-block"
                  type="email"
                  placeholder="hello@example.com"
                  value={this.state.emailAddress}
                  onChange={this.handleChange}
                />
              </label>
            <div>
              <input
                id="submit"
                className="SignUpForm__button ml1_25 p0 small"
                type="submit"
                value="Submit"
                onClick={() => subscribe({ EMAIL: this.state.emailAddress })}
              />
              <div className="relative w100">
                <p className="smaller absolute ml1_25 p0">{this.state.message}</p>
              </div>
            </div>
            {status === 'sending' ? (
              this.setState({
                message: 'Loading...'
              })
            ) : null}
            {status === 'success' ? (
              this.setState({
                message: 'Thanks for subscribing'
              })
            ) : null}
            {status === 'error' ? (
              this.setState({
                message: `Oops! Please try again`
              })
            ) : null}
          </div>
        )}
      />
    </div>
    )
  }
}

export default SignUpForm;
