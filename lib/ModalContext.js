import { createContext, useState, useRef } from 'react';
import Modal from 'react-modal';
import ReCAPTCHA from 'react-google-recaptcha';
import recordConversion from 'utils/recordConversion';
import validateEmail from 'utils/validateEmail';

const customStyles = {
  overlay: {
    background: `rgba(255, 255, 255, 0.95)`,
    zIndex: 9999,
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    margin: '0 auto',
    transform: 'translate(-50%, -50%)',
    border: 'none',
  },
};

const ModalContext = createContext({
  setCurrentModal: (modalType) => {},
});

const ModalProvider = ({ children }) => {
  const reCaptchaRef = useRef(null);

  const [currentModal, setCurrentModal] = useState(null);
  const modalIsOpen = currentModal !== null;

  const [email, setEmail] = useState(null);
  const [reCaptchaValidated, setReCaptchaValidated] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const closeModal = () => {
    setCurrentModal(null);
    setEmail(null);
    setSubmitting(false);
    setEmailError('');
  };

  const onReCaptchaSuccess = async (captchaCode) => {
    if (!captchaCode) {
      return;
    }

    setReCaptchaValidated(true);
  };

  const onBlur = () => {
    if (!email) {
      setEmailError('Please enter your email address');
    } else if (!validateEmail(email)) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email) || !reCaptchaValidated) {
      return;
    }

    recordConversion();
    setSubmitting(true);

    try {
      await fetch('/api/emails', {
        method: 'POST',
        redirect: 'follow',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
    } finally {
      setSubmitting(false);
      reCaptchaRef.current.reset();

      const url = new URL(window.location.href);
      url.searchParams.set('note', 'thankyou');
      window.location.replace(url.toString());
    }
  };

  return (
    <>
      <ModalContext.Provider value={{ setCurrentModal }}>
        {children}

        {currentModal === 'requestPricingInfo' && (
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Request Pricing Info Modal"
          >
            <div className="text-right mb1">
              <button
                className="SignUpForm__button SignUpForm__button--close p0 m0 small pointer"
                aria-label="Close modal"
                onClick={closeModal}
              >
                ×
              </button>
            </div>
            <form action="/api/emails" method="post" onSubmit={onSubmit}>
              <label htmlFor="email" className="small">
                Submit your email below and we&apos;ll send over our pricing
                information.
              </label>
              <input
                id="email"
                name="email"
                autoFocus
                value={email}
                aria-describedby="email_error"
                onBlur={onBlur}
                onChange={(e) => setEmail(e.target.value)}
                className="SignUpForm__input SignUpForm--day-mode__input small p0 w100 mt1 inline-block"
                type="email"
                placeholder="hello@example.com"
              />
              {emailError && (
                <span
                  id="email_error"
                  className="SignUpForm__error tiny"
                  aria-live="assertive"
                >
                  {emailError}
                </span>
              )}
              <div>
                <ReCAPTCHA
                  ref={reCaptchaRef}
                  className="SignUpForm__reCaptcha pt1"
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                  onChange={onReCaptchaSuccess}
                />
                <input
                  className="SignUpForm__button p0 small"
                  type="submit"
                  value={submitting ? 'Submitting...' : 'Submit'}
                  disabled={submitting || !reCaptchaValidated}
                />
              </div>
            </form>
          </Modal>
        )}
      </ModalContext.Provider>
    </>
  );
};

export { ModalContext };
export default ModalProvider;
