import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { mount, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Login } from './Login';

configure({ adapter: new Adapter() });

// Login test suite
describe('<Login />', () => {
  it('renders correctly', () => {
    const { getByText, getByRole } = render(<Router><Login /></Router>);
    expect(getByText(/Welcome back./i)).toBeInTheDocument();
    expect(getByRole('button')).toBeInTheDocument();
  });

  // test state change
  it('should update email state on change', () => {
    const changeState = jest.fn();
    const wrapper = mount((<Router><Login onChange={changeState} /></Router>));
    const handleClick = jest.spyOn(React, 'useState');
    handleClick.mockImplementation((email) => [email, setPassword]);
    wrapper.find('.form-item__input--email').simulate('change');
    expect(changeState).toBeTruthy();
  });

  // test password state change
  it('should update password state on change', () => {
    const changeState = jest.fn();
    const wrapper = mount((<Router><Login onChange={changeState} /></Router>));
    const handleClick = jest.spyOn(React, 'useState');
    handleClick.mockImplementation((password) => [password, setPassword]);
    wrapper.find('.form-item__input--password').simulate('change');
    expect(changeState).toBeTruthy();
  });
});
