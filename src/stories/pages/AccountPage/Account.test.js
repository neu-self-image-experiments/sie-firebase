import { findByTestId, render } from '@testing-library/react';
import { getCurrentUser, getUser } from '../../../firebase/api/users';
import { AccountInfoPage } from './AccountInfoPage/AccountInfoPage';
import { AccountPage } from './AccountPage';

const user = {
  data: {
    firstName: 'first',
    lastName: 'last',
    email: 'email@email.com',
    role: 'Administrator',
    username: 'username',
    password: 'password',
  },
};

jest.mock('./AccountInfoPage/AccountInfoPage');
jest.mock('../../../firebase/api/users', () => ({
  getCurrentUser: jest.fn(),
  getUser: jest.fn(),
}));

describe('<AccountPage/>', () => {
  beforeEach(() => {
    // mock AccountInfoPage implementation
    AccountInfoPage.mockImplementation(() => (
      <div data-testid="info page"></div>
    ));
  });

  it('renders a logged in user correctly', async () => {
    getCurrentUser.mockResolvedValueOnce('uid');
    getUser.mockReturnValueOnce(user);
    // render component to test
    const { container } = render(<AccountPage />);
    const infoPage = await findByTestId(container, 'info page');
    // assertions to test
    expect(infoPage).toBeInTheDocument();
    expect(getCurrentUser).toHaveBeenCalledTimes(1);
    expect(getUser).toHaveBeenCalledTimes(1);
  });

  // it('renders correct if no user', () => {
  //   getCurrentUser.mockRejectedValueOnce('uid');
  //   getUser.mockReturnValueOnce(user);
  //   // render component to test
  //   render(<AccountPage />);
  //   // assertions to test
  //   expect(screen.queryByTestId('info page')).toBeNull();
  //   expect(screen.getByText('No logged in user')).toBeInTheDocument();
  //   expect(mockGetInstance).toBeCalled();
  // });

  // it('renders correct if there is an error', async () => {
  //   // mock static constructor of UserServices so that
  //   // getcurrentUser returns a  not logged in user
  //   const mockGetInstance = jest.fn().mockReturnValue({
  //     getCurrentUser: () =>
  //       // eslint-disable-next-line prefer-promise-reject-errors
  //       Promise.reject({ errorCode: 'code', errorMessage: 'message' }),
  //   });
  //   // set implementation to mock implementation
  //   UserServices.getInstance = mockGetInstance;
  //   // render component to test
  //   const { container } = render(<AccountPage />);
  //   // assertions to test
  //   const divNode = await findByText(container, 'code: message');
  //   expect(screen.queryByTestId('info page')).toBeNull();
  //   expect(divNode).toBeInTheDocument();
  //   expect(mockGetInstance).toBeCalled();
  // });
});
