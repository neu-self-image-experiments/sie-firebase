import React from 'react';
import { render } from '@testing-library/react';
import { Login } from './Login';

// Login test suite
describe('<Login />', () => {
  it('renders correctly', () => {
    const { getByText, getByRole } = render(<Login />);
    expect(getByText(/Welcome back./i)).toBeInTheDocument();
    expect(getByRole('button')).toBeInTheDocument()
  });
});