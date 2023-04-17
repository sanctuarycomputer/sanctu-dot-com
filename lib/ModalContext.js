import { createContext, useState } from 'react';
import Modal from 'react-modal';
import cx from 'classnames';

const customStyles = {
  overlay: {
    background: `rgba(255, 255, 255, 0.95)`,
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
          <form action="/api/emails" method="post">
            <label className="small">
              <h3 className="mb1">
                Add an email below and we&apos;ll send over our standard pricing
                info.
              </h3>
              <input
                name="email"
                className={cx('SignUpForm__input small p0 w100 inline-block', {
                  'SignUpForm--overlay-mode__input': false,
                  'SignUpForm--day-mode__input': true,
                })}
                type="email"
                placeholder="hello@example.com"
              />
            </label>
            <div>
              <input
                className={cx('SignUpForm__button p0 m0 small', {
                  'SignUpForm--overlay-mode__button': false,
                  'SignUpForm--day-mode__buton': false,
                })}
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
