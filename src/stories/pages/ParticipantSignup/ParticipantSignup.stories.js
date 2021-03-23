import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { ParticipantSignup } from './ParticipantSignup';

/**
 * Example Component: ParticipantSignup
 */
export default {
  title: 'Example/ParticipantSignup',
  component: ParticipantSignup,
};
const Template = (args) => {
  return (
    <MemoryRouter>
      <ParticipantSignup />
    </MemoryRouter>
  );
};

// Default ParticipantSignup
export const Default = Template.bind({});
