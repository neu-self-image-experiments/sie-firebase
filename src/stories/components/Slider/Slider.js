// Awesome Swiper React component credits: https://swiperjs.com/react

import './styles.scss';
import 'swiper/swiper.scss'; // Swiper styles

import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import Button from '../Button/Button';
import { Swiper, SwiperSlide } from 'swiper/react';

const TABLET_SCREEN_SIZE = 640;
const DESKTOP_SCREEN_SIZE = 1024;
const WIDESCREEN_SCREEN_SIZE = 1400;


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
  // Swiper reference to control scrolling via Buttons
  const [swiper, setSwiper] = useState(null);

  // Put each child of the component into a separate slide
  const slides = children.map((child, i) =>
    <SwiperSlide key={i}>
      {child}
    </SwiperSlide>);

  return (
    <div>
      <Swiper
        spaceBetween={30}
        freeMode={true}
        onSwiper={(swiperInstance) => {
          // Save this Swiper's instance when initialized
          setSwiper(swiperInstance);
        }}
        breakpoints={{
          // tablet
          640: {
            width: TABLET_SCREEN_SIZE,
            slidesPerView: 2,
          },
          // desktop
          1024: {
            width: DESKTOP_SCREEN_SIZE,
            slidesPerView: 3,
          },
          // widescreen
          1400: {
            width: WIDESCREEN_SCREEN_SIZE,
            slidesPerView: 4,
          },
        }}
      >
        {slides}
      </Swiper>

      <button onClick={() => swiper.slidePrev()}>Prev</button>
      <button onClick={() => swiper.slideNext()}>Next</button>
    </div>
  );
};

Slider.propTypes = {
  /**
   * Items in slider
   */
  children: PropTypes.node,
};
