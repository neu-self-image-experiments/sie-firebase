import './styles.scss';

import React from 'react';
import PropTypes from 'prop-types';

/**
 * Component for split-gradient element.
 *
 * @component
 * @param {string} modifierClasses Class modifiers of the component.
 * @param {node} leftContent Left content of the component.
 * @param {node} rightContent Right content of the component.
 * @return {object} (
 *   <SplitGradient modifierClasses={modifierClasses} />
 *      {leftContent}
 *      {rightContent}
 *   </SplitGradient>
 * )
 */

export const SplitGradient = ({
  modifierClasses, leftContent, rightContent,
}) => {
  return (
    <div
      className={[
        'split-gradient',
        `${modifierClasses}`,
      ].join(' ').trim()}
    >
      <div className="split-gradient__left">{leftContent}</div>
      <div className="split-gradient__right">{rightContent}</div>
    </div>
  );
};

SplitGradient.propTypes = {
  /**
   * SplitGradient's modifier classes
   */
  modifierClasses: PropTypes.string,
  /**
   * SplitGradient's left content
   */
  leftContent: PropTypes.node,
  /**
   * SplitGradient's right content
   */
  rightContent: PropTypes.node,
};

SplitGradient.defaultProps = {
  modifierClasses: '',
  leftContent: '',
  rightContent: '',
};
