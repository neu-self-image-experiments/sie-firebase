import './styles.scss';

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Fragment } from 'react';
import { Button } from '../Button/Button';
import { Constrain } from '../../layouts/Constrain/Constrain';

/**
 * Component for Modal element.
 *
 * @component
 * @param {node} children items of the Modal.
 * @param {string} theme of the Modal Button's parent.
 * @return {object} (
 *   <Modal>
 *      {children}
 *   </Modal>
 * )
 */
export const Modal = ({ children, theme, buttonText }) => {
  const [modalOpen, setModalOpen] = useState(false);
  // const [modalClasses, setModalClasses] = useState('modal--content');
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <Fragment>
      <Button
        modifierClasses={[
          'button--small',
          `button--${
            (theme === 'light')?
              'secondary':
              'quaternary'
          }`].join(' ').trim()
        }
        onClick={toggleModal}
        text={buttonText}
        isButton={true}/>
      <div
        hidden={!modalOpen}
        id='modalPop'
        className={['modal', `modal--${theme}`].join(' ').trim()}
      >
        <div
          className={
            (modalOpen) ?
              'modal__content modal--open' :
              'modal__content'}
        >
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
     * Modal's theme
     */
  theme: PropTypes.string.isRequired,
  /**
    * Button's Text
    */
  buttonText: PropTypes.string.isRequired,
};

Modal.defaultProps = {
  theme: 'light',
  buttonText: 'Open Modal',
};

