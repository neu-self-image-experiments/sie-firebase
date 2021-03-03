import './styles.scss';

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Fragment } from 'react';
import { Button } from '../Button/Button';

/**
 * Component for Modal element.
 *
 * @component
 * @param {node} children items of the Modal.
 * @param {string} theme of the Modal.
 * @return {object} (
 *   <Modal>
 *      {children}
 *   </Modal>
 * )
 */
export const Modal = ({ children, theme }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <Fragment>
      <Button
        modifierClasses="button--secondary button--small"
        onClick={toggleModal}
        text="Open Modal"
        isButton={true}/>
      <div
        hidden={!modalOpen}
        id="modalPop"
        className={['modal', `modal--${theme}`].join(' ').trim()}
      >
        <div className="modal--content">
          <span
            onClick={toggleModal}
            className="modal--content--close"
          >
            x
          </span>
          {children}
        </div>
      </div>
    </Fragment>
  );
};

Modal.propTypes = {
  /**
     * Modal's node children
     */
  children: PropTypes.node,
  /**
     * Modal's theme
     */
  theme: PropTypes.string.isRequired,
};

Modal.defaultProps = {
  theme: 'light',
};


