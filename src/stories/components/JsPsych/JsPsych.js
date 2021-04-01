/* eslint-disable */

import React from 'react';
import { useEffect } from 'react';

/**
 * Sample component to load jsPsych's "Hello World" tutorial experiment.
 *
 * @component
 * @return {object} (
 *   <React.Fragment />
 * )
 */
export const JsPsych = () => {
  // Load 'jspsych-html-keyboard-response' plugin script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "../../../public/jspsych-6.3.0/plugins/jspsych-html-keyboard-response";
    script.async = true;
    document.body.appendChild(script);
  
    return () => {
      document.body.removeChild(script);
    }
  }, []);

  // Trial of experiment consists of "Hello World" disappearing when a 
  // keyboard key is pressed.
  const hello_trial = {
    type: 'html-keyboard-response',
    stimulus: 'Hello world!'
  }

  jsPsych.init({
    timeline: [hello_trial]
  })

  return (
    <React.Fragment/>
  );
};