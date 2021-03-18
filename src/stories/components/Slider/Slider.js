/* eslint-disable no-console */
// Awesome Swiper React component credits: https://swiperjs.com/react

import './styles.scss';
import 'swiper/swiper.scss'; // Swiper styles

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';


/**
 * Component for branding element.
 *
 * @component
 * @param {node} children The items that will be shown as a list in the slider.
 * @return {object} (
 *   <Slider>
 *     {children}
 *   </Slider>
 * )
 */
export const Slider = ({ children }) => {
  // Swiper reference to control scrolling via Buttons
  const [swiper, setSwiper] = useState(null);
  const [isAtBeginning, setIsAtBeginning] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  // Put each child of the component into a separate slide
  const slides = children.map((child, i) =>
    <SwiperSlide key={i}>
      {child}
    </SwiperSlide>);

  const backButtonDisabled = isAtBeginning ? 'slider__button--disabled' : '';
  const nextButtonDisabled = isAtEnd ? 'slider__button--disabled' : '';

  return (
    <div>
      {/* Slider itself */}
      <Swiper
        spaceBetween={30}
        freeMode={true}
        scrollbar={{ draggable: true }}
        breakpoints={{
          // tablet
          640: {
            slidesPerView: 2,
          },
          // desktop
          1024: {
            slidesPerView: 3,
          },
          // widescreen
          1400: {
            slidesPerView: 4,
          },
        }}

        // Save this Swiper's instance when initialized
        onSwiper={(swiperInstance) => {
          setSwiper(swiperInstance);
        }}

        // Disable 'BACK' control button
        onReachBeginning={() => {
          setIsAtBeginning(true);
        }}

        // Disable 'NEXT' control button
        onReachEnd={() => {
          setIsAtEnd(true);
        }}

        // Enable control buttons
        onSlideChange={(swiperInstance) => {
          if (!swiperInstance.isBeginning) {
            setIsAtBeginning(false);
          }
          if (!swiperInstance.isEnd) {
            setIsAtEnd(false);
          }
        }}
      >
        {slides}
      </Swiper>

      {/* Slider control buttons */}
      <div className="slider__controls">
        <button
          className=
            {`slider__button slider__button--back ${backButtonDisabled}`}
          onClick={() => {
            swiper.slidePrev();
          }}
        >
          BACK
        </button>
        <button
          className=
            {`slider__button slider__button--next ${nextButtonDisabled}`}
          onClick={() => swiper.slideNext()}
        >
          NEXT
        </button>
      </div>
    </div>
  );
};

Slider.propTypes = {
  /**
   * Items in slider
   */
  children: PropTypes.node,
};
