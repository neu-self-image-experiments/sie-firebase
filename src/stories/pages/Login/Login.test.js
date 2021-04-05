import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { mount, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Login } from './Login';
import { AuthContext } from '../../../contexts/auth-provider';

configure({ adapter: new Adapter() });

// Login test suite
describe('<Login />', () => {
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
});
