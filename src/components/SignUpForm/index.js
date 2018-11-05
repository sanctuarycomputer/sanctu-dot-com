import React, { PureComponent } from "react";

import "what-input";

import "./SignUpForm.scss";

class SignUpForm extends PureComponent {
  constructor(props) {
    super(...arguments);

    this.state = {
      value: ""
    };
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
  };

  render() {
    return (
      <div className={"SignUpForm"}>
        <form onSubmit={this.handleSubmit}>
          <label className="small">
            <h3>{this.props.title}</h3>
            <input
              className="SignUpForm__input small ml1_25 p0 w100 inline-block"
              type="email"
              placeholder="hello@example.com"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <div>
            <input
              className="SignUpForm__button ml1_25 p0 small"
              type="submit"
              value="Submit"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default SignUpForm;
