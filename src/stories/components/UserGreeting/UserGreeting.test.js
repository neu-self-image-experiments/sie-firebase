import { findByText, render, screen } from '@testing-library/react';
import UserServices from '../../../firebase/CRUDServices/userServices';
import { UserGreeting } from './UserGreeting';

const logInState = {
  isLoggedIn: true,
  user: { email: 'testEmail', password: 'password' },
};

jest.mock('../../../firebase/CRUDServices/userServices');

describe('<UserGreeting />', () => {
  beforeEach(() => {
    UserServices.mockClear();
  });

  it('renders a logged in user correctly', () => {
    // mock static constructor of UserServices
    const mockGetInstance = jest.fn().mockReturnValue({
      // getCurrentUser is used inside
      getCurrentUser: (cb) => Promise.resolve(cb(logInState)),
    });
    // set implementation to mock implementation
    UserServices.getInstance = mockGetInstance;
    // render component to test
    render(<UserGreeting />);
    // assertions to test
    expect(screen.getByText('Hello,')).toBeInTheDocument();
    expect(mockGetInstance).toBeCalled();
  });

  it('renders correct if no user', () => {
    // mock static constructor of UserServices so that
    // getcurrentUser return not logged in user
    const mockGetInstance = jest.fn().mockReturnValue({
      getCurrentUser: (cb) => Promise.resolve(cb({ isLoggedIn: false })),
    });
    // set implementation to mock implementation
    UserServices.getInstance = mockGetInstance;
    // render component to test
    render(<UserGreeting />);
    // assertions to test
    expect(screen.getByText('No user is logged in')).toBeInTheDocument();
    expect(mockGetInstance).toBeCalled();
  });
});
