import React from 'react';
import { Slider } from './Slider';
import { Card } from '../Card/Card';

/**
 * Example Component: Slider
 */
export default {
  title: 'Example/Slider',
  component: Slider,
};

const Template = (args) =>
  <Slider>
    <Card
      modifierClasses='card--active'
      title='Mental Representations of Self 1'
      body= {'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
            'sed do eiusmod tempor incididunt ut labore et magna aliqua. ' +
            'Ut enim ad minim veniam, quis nostrud ullamco laboris ' +
            'nisi ut aliquip ex ea commodo consequat.'}
      opened='02-17-2020'
      admin='Carlo Mutuc'
      researchers='Adrienne Slaughter, Tara Dennehy'
    >

    </Card>
    <Card
      modifierClasses='card--active'
      title='Mental Representations of Self 2'
      body= {'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
            'sed do eiusmod tempor incididunt ut labore et magna aliqua. ' +
            'Ut enim ad minim veniam, quis nostrud ullamco laboris ' +
            'nisi ut aliquip ex ea commodo consequat.'}
      opened='02-17-2020'
      admin='Carlo Mutuc'
      researchers='Adrienne Slaughter, Tara Dennehy'
    >

    </Card>
    <Card
      modifierClasses='card--active'
      title='Mental Representations of Self 3'
      body= {'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
            'sed do eiusmod tempor incididunt ut labore et magna aliqua. ' +
            'Ut enim ad minim veniam, quis nostrud ullamco laboris ' +
            'nisi ut aliquip ex ea commodo consequat.'}
      opened='02-17-2020'
      admin='Carlo Mutuc'
      researchers='Adrienne Slaughter, Tara Dennehy'
    >

    </Card>
    <Card
      modifierClasses='card--active'
      title='Mental Representations of Self 4'
      body= {'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
            'sed do eiusmod tempor incididunt ut labore et magna aliqua. ' +
            'Ut enim ad minim veniam, quis nostrud ullamco laboris ' +
            'nisi ut aliquip ex ea commodo consequat.'}
      opened='02-17-2020'
      admin='Carlo Mutuc'
      researchers='Adrienne Slaughter, Tara Dennehy'
    >

    </Card>
    <Card
      modifierClasses='card--active'
      title='Mental Representations of Self 5'
      body= {'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
            'sed do eiusmod tempor incididunt ut labore et magna aliqua. ' +
            'Ut enim ad minim veniam, quis nostrud ullamco laboris ' +
            'nisi ut aliquip ex ea commodo consequat.'}
      opened='02-17-2020'
      admin='Carlo Mutuc'
      researchers='Adrienne Slaughter, Tara Dennehy'
    >
    </Card>
    <Card
      modifierClasses='card--active'
      title='Mental Representations of Self 6'
      body= {'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
            'sed do eiusmod tempor incididunt ut labore et magna aliqua. ' +
            'Ut enim ad minim veniam, quis nostrud ullamco laboris ' +
            'nisi ut aliquip ex ea commodo consequat.'}
      opened='02-17-2020'
      admin='Carlo Mutuc'
      researchers='Adrienne Slaughter, Tara Dennehy'
    >
    </Card>
    <Card
      modifierClasses='card--active'
      title='Mental Representations of Self 7'
      body= {'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
            'sed do eiusmod tempor incididunt ut labore et magna aliqua. ' +
            'Ut enim ad minim veniam, quis nostrud ullamco laboris ' +
            'nisi ut aliquip ex ea commodo consequat.'}
      opened='02-17-2020'
      admin='Carlo Mutuc'
      researchers='Adrienne Slaughter, Tara Dennehy'
    >
    </Card>
  </Slider>;

// Default slider
export const Default = Template.bind({});
