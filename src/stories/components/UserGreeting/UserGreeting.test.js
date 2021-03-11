import { render, screen, act } from '@testing-library/react';
import UserServices from '../../../firebase/CRUDServices/userServices';
import { UserGreeting } from './UserGreeting';

const logInState = {
  isLoggedIn: true,
  user: { email: 'testEmail', password: 'password',
firstName: 'Jane', lastName: 'Doe' },
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
    getCurrentUser: (cb) => act(() => new Promise.resolve(cb(logInState))),
    });
    // set implementation to mock implementation
    UserServices.getInstance = mockGetInstance;
    // render component to test
    render(<UserGreeting />);
    // assertions to test
    expect(screen.getByText('Hello,')).toBeInTheDocument();
    expect(mockGetInstance).toBeCalled();
  });

  it('renders correct if no user', async () => {
    // mock static constructor of UserServices so that
    // getcurrentUser return not logged in user
    const mockGetInstance = jest.fn().mockReturnValue({
      getCurrentUser: (cb) => act(() => new Promise.resolve(cb({ isLoggedIn: false }))),
    });
    // set implementation to mock implementation
    UserServices.getInstance = mockGetInstance;
    // render component to test
    const { content } = render(<UserGreeting />);
    expect(content).toBeUndefined();
    expect(mockGetInstance).toBeCalled();
  });
});
