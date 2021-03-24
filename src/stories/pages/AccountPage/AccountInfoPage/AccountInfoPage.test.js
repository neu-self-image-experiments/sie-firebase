import { render, screen } from '@testing-library/react';
import { UserContext } from '../AccountPage';
import { AccountInfoPage } from './AccountInfoPage';

describe('<AccountInfoPage />', () => {
  // Creating a custom render function because we need to wrap this component
  // with UserContext.Provider
  const renderWithContext = (user) => {
    render(
      <UserContext.Provider value={user}>
        <AccountInfoPage />
      </UserContext.Provider>,
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
