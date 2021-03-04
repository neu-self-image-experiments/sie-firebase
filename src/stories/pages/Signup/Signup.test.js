import React from 'react';
import { render } from '@testing-library/react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { mount, configure } from 'enzyme';
import { Signup } from './Signup';

configure({ adapter: new Adapter() });

// Signup test suite
describe('<Signup />', () => {
  it('renders correctly', () => {
    const { getByText, getByRole } = render(<Signup />);
    expect(getByText(/Welcome/i)).toBeInTheDocument();
    expect(getByRole('button')).toBeInTheDocument();
  });

  // test fullname state change
  it('should update fullname state on change', () => {
    const changeState = jest.fn();
    const wrapper = mount(<Signup onChange={changeState} />);
    const handleClick = jest.spyOn(React, 'useState');
    handleClick.mockImplementation((fullname) => [fullname, setFullname]);
    wrapper.find('.form-item__input--text').simulate('change');
    expect(changeState).toBeTruthy();
  });

  // test email state change
  it('should update email state on change', () => {
    const changeState = jest.fn();
    const wrapper = mount(<Signup onChange={changeState} />);
    const handleClick = jest.spyOn(React, 'useState');
    handleClick.mockImplementation((email) => [email, setEmail]);
    wrapper.find('.form-item__input--email').simulate('change');
    expect(changeState).toBeTruthy();
  });

  // test password state change
  it('should update password state on change', () => {
    const changeState = jest.fn();
    const wrapper = mount(<Signup onChange={changeState} />);
    const handleClick = jest.spyOn(React, 'useState');
    handleClick.mockImplementation((password) => [password, setPassword]);
    wrapper.find('.form-item__input--password').simulate('change');
    expect(changeState).toBeTruthy();
  });

  // test select role state change
  it('should update role state on change', () => {
    const changeState = jest.fn();
    const wrapper = mount(<Signup onChange={changeState} />);
    const handleClick = jest.spyOn(React, 'useState');
    handleClick.mockImplementation((role) => [role, setRole]);
    wrapper.find('.form-item__input--select').simulate('change');
    expect(changeState).toBeTruthy();
  });
});
