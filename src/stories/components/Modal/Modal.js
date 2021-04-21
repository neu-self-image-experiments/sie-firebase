import './styles.scss';

import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { Fragment } from 'react';
import { Button } from '../Button/Button';
import { Constrain } from '../../layouts/Constrain/Constrain';
import { fadeIn, fadeOut } from '../../../utils/utils';

/**
 * Component for Modal element.
 *
 * @component
 * @param {node} children items of the Modal.
 * @param {string} buttonText Text to appear on the modal's open button.
 * @param {string} buttonModifierClasses Class modifiers of the modal's open
 * button.
 * @param {bool} canOpen bool to denote whether modal is closable
 * @param {bool} canClose bool to denote whether modal is closable
 * @param {func} onClose cleanup method to be ran when the modal is closed
 * @return {object} (
 *   <Modal>
 *      {children}
 *   </Modal>
 * )
 */
export const Modal = ({
  children,
  buttonText,
  buttonModifierClasses,
  canOpen,
  canClose,
  onClose,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const modalRef = useRef(null);

  const toggleModal = () => {
    if (onClose && modalOpen) {
      onClose();
    }
    setModalOpen(!modalOpen);
  };

  useEffect(() => {
    if (modalOpen) {
      fadeIn(modalRef.current);
    } else {
      fadeOut(modalRef.current);
    }
  }, [modalOpen]);

  return (
    <Fragment>
      <Button
        modifierClasses={[
          'button--small',
          'button--tertiary',
          buttonModifierClasses,
        ]
          .join(' ')
          .trim()}
        onClick={toggleModal}
        text={buttonText}
        isButton={true}
        disableBtn={!canOpen}
      />
      <div className="modal" ref={modalRef}>
        <div className="modal__content">
          <button
            className="modal__content--close"
            onClick={toggleModal}
            disabled={!canClose}
          />
          <Constrain modifierClasses="constrain--narrow">{children}</Constrain>
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
   * Modal's Button Text
   */
  buttonText: PropTypes.string.isRequired,
  /**
   * Button's modifier classes
   */
  buttonModifierClasses: PropTypes.string,
  /**
   * Button's canOpen
   */
  canOpen: PropTypes.bool,
  /**
   * Button's canClose
   */
  canClose: PropTypes.bool,
  /**
   * Button's onClose cleanup
   */
  onClose: PropTypes.func,
};

Modal.defaultProps = {
  buttonText: 'Open',
  canOpen: true,
  canClose: true,
  onClose: null,
};
