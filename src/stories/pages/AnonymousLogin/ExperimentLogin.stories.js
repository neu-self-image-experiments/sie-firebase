import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { AnonymousLogin } from './AnonymousLogin';

/**
 * Example Component: AnonymousLogin
 */
export default {
  title: 'Example/AnonymousLogin',
  component: AnonymousLogin,
};
const Template = (args) => {
  return (
    <MemoryRouter>
      <AnonymousLogin />
    </MemoryRouter>
  );
};

// Default AnonymousLogin
export const Default = Template.bind({});
