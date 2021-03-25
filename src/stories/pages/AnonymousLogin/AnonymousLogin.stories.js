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
    <MemoryRouter initialEntries={['/study/Pl3WJYa7vQ1ALVt0rHRV']}>
      <AnonymousLogin />
    </MemoryRouter>
  );
};

// Default AnonymousLogin
export const Default = Template.bind({});
