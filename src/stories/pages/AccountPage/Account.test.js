import { findByText, render, screen } from '@testing-library/react';
import UserServices from '../../../firebase/CRUDServices/userServices';
import { AccountInfoPage } from './AccountInfoPage/AccountInfoPage';
import { AccountPage } from './AccountPage';

const logInState = {
  isLoggedIn: true,
  user: { email: 'testEmail', password: 'password' },
};

jest.mock('./AccountInfoPage/AccountInfoPage');
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

  it('renders correct if no user', () => {
    // mock static constructor of UserServices so that
    // getcurrentUser returns a not logged in user
    const mockGetInstance = jest.fn().mockReturnValue({
      getCurrentUser: (cb) => Promise.resolve(cb({ isLoggedIn: false })),
    });
    // set implementation to mock implementation
    UserServices.getInstance = mockGetInstance;
    // render component to test
    render(<AccountPage />);
    // assertions to test
    expect(screen.queryByTestId('info page')).toBeNull();
    expect(screen.getByText('No logged in user')).toBeInTheDocument();
    expect(mockGetInstance).toBeCalled();
  });

  it('renders correct if there is an error', async () => {
    // mock static constructor of UserServices so that
    // getcurrentUser returns a  not logged in user
    const mockGetInstance = jest.fn().mockReturnValue({
      getCurrentUser: () =>
        // eslint-disable-next-line prefer-promise-reject-errors
        Promise.reject({ errorCode: 'code', errorMessage: 'message' }),
    });
    // set implementation to mock implementation
    UserServices.getInstance = mockGetInstance;
    // render component to test
    const { container } = render(<AccountPage />);
    // assertions to test
    const divNode = await findByText(container, 'code: message');
    expect(screen.queryByTestId('info page')).toBeNull();
    expect(divNode).toBeInTheDocument();
    expect(mockGetInstance).toBeCalled();
  });
});
