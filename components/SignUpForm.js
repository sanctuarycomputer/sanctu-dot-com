import React, { PureComponent } from 'react';
import cx from 'classnames';

import 'what-input';

class SignUpForm extends PureComponent {
  constructor(props) {
    super(...arguments);

    this.state = {
      value: '',
    };
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
  };

  render() {
    const { overlayMode, title } = this.props;

    return (
      <div className="SignUpForm">
        <form
          action={'https://garden3d.substack.com/api/v1/free?nojs=true'}
          target="_blank"
          method="post"
        >
          <label className="small">
            <h3>{title}</h3>
            <input
              name="email"
              className={cx(
                'SignUpForm__input small ml1_25 p0 w100 inline-block',
                {
                  'SignUpForm--overlay-mode__input': overlayMode,
                  'SignUpForm--day-mode__input': !overlayMode,
                }
              )}
              type="email"
              placeholder="hello@example.com"
            />
          </label>
          <div>
            <input
              className={cx('SignUpForm__button ml1_25 p0 small', {
                'SignUpForm--overlay-mode__button': overlayMode,
                'SignUpForm--day-mode__buton': overlayMode,
              })}
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
