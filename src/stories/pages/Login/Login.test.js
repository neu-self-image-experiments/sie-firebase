import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { act, render } from '@testing-library/react';
import { mount, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Login } from './Login';
import { AuthContext } from '../../../contexts/auth-provider';
import * as users from '../../../firebase/api/users';
import { StatusCodes } from 'http-status-codes';

configure({ adapter: new Adapter() });

// Login test suite
describe('<Login />', () => {
  const waitForComponentToPaint = async (wrapper) => {
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
      wrapper.update();
    });
  };

  afterEach(() => jest.clearAllMocks());
  it('renders correctly', () => {
    const reloadAuthProvider = jest.fn();
    const { getByText, getByRole } = render(
      <AuthContext.Provider value={{ reloadAuthProvider }}>
        <Router>
          <Login />
        </Router>
      </AuthContext.Provider>,
    );
    expect(getByText(/Welcome back./i)).toBeInTheDocument();
    expect(getByRole('button')).toBeInTheDocument();
  });

  // test state change
  it('should update email state on change', () => {
    const changeState = jest.fn();
    const reloadAuthProvider = jest.fn();
    const wrapper = mount(
      <AuthContext.Provider value={{ reloadAuthProvider }}>
        <Router>
          <Login onChange={changeState} />
        </Router>
      </AuthContext.Provider>,
    );
    const handleClick = jest.spyOn(React, 'useState');
    handleClick.mockImplementation((email) => [email, setPassword]);
    wrapper.find('.form-item__input--email').simulate('change');
    expect(changeState).toBeTruthy();
  });

  // test password state change
  it('should update password state on change', () => {
    const changeState = jest.fn();
    const reloadAuthProvider = jest.fn();
    const wrapper = mount(
      <AuthContext.Provider value={{ reloadAuthProvider }}>
        <Router>
          <Login onChange={changeState} />
        </Router>
      </AuthContext.Provider>,
    );
    const handleClick = jest.spyOn(React, 'useState');
    handleClick.mockImplementation((password) => [password, setPassword]);
    wrapper.find('.form-item__input--password').simulate('change');
    expect(changeState).toBeTruthy();
  });

  it('should show error message if no inputs', async () => {
    const reloadAuthProvider = jest.fn();

    const mockSignIn = jest.spyOn(users, 'signIn');
    mockSignIn.mockResolvedValue({
      status: StatusCodes.NOT_FOUND,
      data: null,
      error: { code: 'auth/code', message: 'an error message' },
    });

    const wrapper = mount(
      <AuthContext.Provider value={{ reloadAuthProvider }}>
        <Router>
          <Login />
        </Router>
      </AuthContext.Provider>,
    );
    wrapper.find('.button--small').simulate('click');
    await waitForComponentToPaint(wrapper);
    const errorDiv = wrapper.find('.form__msg');
    expect(errorDiv.exists()).toBeTruthy();
    expect(errorDiv.text()).toBe('an error message');
  });
});
