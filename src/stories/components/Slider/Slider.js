// Awesome Swiper React component credits: https://swiperjs.com/react

import './styles.scss';
import 'swiper/swiper.scss'; // Swiper styles

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Constrain } from '../../layouts/Constrain/Constrain';


/**
 * Component for Slider element.
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
  // Swiper reference to control scrolling via buttons
  const [swiper, setSwiper] = useState(null);
  const [isAtBeginning, setIsAtBeginning] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  // Put each child of the component into a separate slide, if any
  const slides = children.length ?
    children.map((child, i) =>
      <SwiperSlide key={i}>
        {child}
      </SwiperSlide>) :
    null;

  const backButtonDisabled = isAtBeginning ? 'slider__button--disabled' : '';
  const nextButtonDisabled = isAtEnd ? 'slider__button--disabled' : '';

  return (
    <div className="slider">
      {/* Slider itself */}
      <Swiper
        className="slider__swiper"
        spaceBetween={30}
        freeMode={true}
        scrollbar={{ draggable: true }}
        breakpoints={{
          // tablet
          880: {
            slidesPerView: 1,
            width: 500,
          },
          // desktop
          1100: {
            slidesPerView: 2,
            width: 800,
          },
          // widescreen
          1500: {
            slidesPerView: 3,
            width: 1100,
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
      <Constrain>
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
      </Constrain>
    </div>
  );
};

Slider.propTypes = {
  /**
   * Items in slider
   */
  children: PropTypes.node,
};
