import React, { PureComponent } from 'react';

import 'what-input';

class SignUpForm extends PureComponent {
  constructor(props) {
    super(...arguments);

    this.state = {
      value: ''
    };
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log('hi');
  };

  render() {
    return (
      <div className="SignUpForm">
        <form
          action={
            'https://computer.us11.list-manage.com/subscribe/post?u=6e62b74d002f42a0e5350892e&amp;id=4f35a74dc5'
          }
          target="_blank"
          method="post"
        >
          <label className="small">
            <h3>{this.props.title}</h3>
            <input
              name="EMAIL"
              className="SignUpForm__input small ml1_25 p0 w100 inline-block"
              type="email"
              placeholder="hello@example.com"
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
