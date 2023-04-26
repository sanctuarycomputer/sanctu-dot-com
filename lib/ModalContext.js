import { createContext, useState } from 'react';
import Modal from 'react-modal';
import recordConversion from 'utils/recordConversion';

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
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: 'none',
  },
};

const ModalContext = createContext({
  setCurrentModal: (modalType) => {},
});

const ModalProvider = ({ children }) => {
  const [currentModal, setCurrentModal] = useState(null);
  const modalIsOpen = currentModal !== null;
  const closeModal = () => setCurrentModal(null);

  const [email, setEmail] = useState(null);
  const onSubmit = () => {
    recordConversion();
    fetch('/api/emails', {
      method: 'POST',
      redirect: 'follow',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
  };

  return (
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
              className="SignUpForm__button p0 m0 small pointer"
              onClick={closeModal}
            >
              ×
            </button>
          </div>
          <form action="/api/emails" method="post" onSubmit={onSubmit}>
            <label className="small">
              <h3 className="mb1">
                Submit your email below and we&apos;ll send over our pricing
                information.
              </h3>
              <input
                name="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="SignUpForm__input SignUpForm--day-mode__input small p0 w100 inline-block"
                type="email"
                placeholder="hello@example.com"
              />
            </label>
            <div>
              <input
                className="SignUpForm__button p0 m0 small"
                type="submit"
                value="Submit"
              />
            </div>
          </form>
        </Modal>
      )}
    </ModalContext.Provider>
  );
};

export { ModalContext };
export default ModalProvider;
