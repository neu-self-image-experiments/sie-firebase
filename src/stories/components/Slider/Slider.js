import './styles.scss';
import 'swiper/swiper.scss';

import React from 'react';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Constrain } from '../../layouts/Constrain/Constrain';


/**
 * Component for branding element.
 *
 * @component
 * @param {node} children The items that will be shown as a list in the slider.
 * @return {object} (
 *   <Branding modifierClasses={modifierClasses}
 *             text={text}
 *   />
 * )
 */
export const Slider = ({ children }) => {
  const slides = children.map((child, i) =>
    <SwiperSlide key={i}>
      <Constrain modifierClasses='constrain--narrow'>
        {child}
      </Constrain>
    </SwiperSlide>);

  return (
    <Swiper
      spaceBetween={30}
      slidesPerView={4}
      freeMode={true}
    >
      {slides}
    </Swiper>
  );
};

Slider.propTypes = {
  /**
   * Items in slider
   */
  children: PropTypes.node,
};
