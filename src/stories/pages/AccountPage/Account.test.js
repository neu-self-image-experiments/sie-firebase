import { render, screen } from '@testing-library/react';
import UserServices from '../../../firebase/CRUDServices/userServices';
import { AccountInfoPage } from './AccountInfoPage';
import { AccountPage } from './AccountPage';

const logInState = {
  isLoggedIn: true,
  user: { email: 'testEmail', password: 'password' },
};

jest.mock('./AccountInfoPage');
jest.mock('../../../firebase/CRUDServices/userServices');

describe('<AccountPage/>', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    UserServices.mockClear();
    // mock AccountInfoPage implementation
    AccountInfoPage.mockImplementation(() => (
      <div data-testid="info page"></div>
    ));
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
    render(<AccountPage />);
    // assertions to test
    expect(screen.getByTestId('info page')).toBeInTheDocument();
    expect(mockGetInstance).toBeCalled();
  });

  it('renders a logged in user correctly', () => {
    // mock static constructor of UserServices so that
    // getcurrentUser return not logged in user
    const mockGetInstance = jest.fn().mockReturnValue({
      getCurrentUser: (cb) => Promise.resolve(cb({ isLoggedIn: false })),
    });
    // set implementation to mock implementation
    UserServices.getInstance = mockGetInstance;
    // render component to test
    render(<AccountPage />);
    // assertions to test
    expect(screen.queryByTestId('info page')).toBeNull();
    expect(mockGetInstance).toBeCalled();
  });
});
