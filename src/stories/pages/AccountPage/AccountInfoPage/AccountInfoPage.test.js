import { render, screen } from '@testing-library/react';
import { AuthContext } from '../../../../contexts/auth-provider';
import { AccountInfoPage } from './AccountInfoPage';

describe('<AccountInfoPage />', () => {
  // Creating a custom render function because we need to wrap this component
  // with UserContext.Provider
  const renderWithContext = (user) => {
    render(
      <AuthContext.Provider value={{ user }}>
        <AccountInfoPage />
      </AuthContext.Provider>,
    );
  };

  it('renders correctly when there is a user', () => {
    const user = {
      firstName: 'first',
      lastName: 'last',
      email: 'email@email.com',
      role: 'Administrator',
    };
    renderWithContext(user);
    expect(screen.getByPlaceholderText(user.firstName)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(user.lastName)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(user.email)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(user.role)).toBeInTheDocument();
  });
});
