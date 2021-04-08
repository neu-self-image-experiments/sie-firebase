import './styles.scss';

import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { Constrain } from '../Constrain/Constrain';
import { fadeIn, fadeOut } from '../../../utils/utils';

/**
 * Component for screen takeover layout.
 *
 * @component
 * @param {node} children Children of the component.
 * @param {boolean} isHidden component.
 * @return {object} (
 *   <ScreenTakeover />
 *      {content}
 *   </ScreenTakeover>
 * )
 */

export const ScreenTakeover = ( { isHidden, children }) => {
  const divRef = useRef(null);

  useEffect(() => {
    if (isHidden) {
      fadeOut(divRef.current);
    } else {
      fadeIn(divRef.current);
    }
  }, [isHidden]);

  return (
    <div className="screen-takeover" ref={divRef}>
      <Constrain modifierClasses="constrain--wide">
        {children}
      </Constrain>
    </div>
  );
};

ScreenTakeover.propTypes = {
  /**
   * ScreenTakeover's children nodes
   */
  children: PropTypes.node,
  /**
   * ScreenTakeover's isHidden
   */
  isHidden: PropTypes.bool,
};

Constrain.defaultProps = {
  isHidden: true,
};
