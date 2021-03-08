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
  });

  it('renders a logged in user correctly', () => {
    // mock static constructor of UserServices
    const mockGetInstance = jest.fn().mockReturnValue({
      // set return value of mocked ethod
      getCurrentUser: (cb) => Promise.resolve(cb(logInState)),
    });
    // set implementation to mock implementation
    UserServices.getInstance = mockGetInstance;
    // mock AccountInfoPage
    AccountInfoPage.mockImplementation(() => (
      <div data-testid="info page"></div>
    ));
    // render component to test
    render(<AccountPage />);
    // assertions to test
    expect(screen.getByTestId('info page')).toBeInTheDocument();
    expect(mockGetInstance).toBeCalled();
  });
});
