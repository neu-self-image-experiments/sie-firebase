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
 * @return {object} (
 *   <Modal>
 *      {children}
 *   </Modal>
 * )
 */
export const Modal = ({ children, buttonText, buttonModifierClasses }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const modalRef = useRef(null);
  // const [modalClasses, setModalClasses] = useState('modal--content');
  const toggleModal = () => {
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
          buttonModifierClasses].join(' ').trim()
        }
        onClick={toggleModal}
        text={buttonText}
        isButton={true} />
      <div className="modal" ref={modalRef}>
        <div className="modal__content">
          <button
            className='modal__content--close'
            onClick={toggleModal}
          />
          <Constrain modifierClasses="constrain--narrow">
            {children}
          </Constrain>
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
    * Button's Text
    */
  buttonText: PropTypes.string.isRequired,
  /**
    * Button's modifier classes
    */
  buttonModifierClasses: PropTypes.string,
};

Modal.defaultProps = {
  buttonText: 'Open Modal',
};


