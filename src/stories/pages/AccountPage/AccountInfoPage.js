import './styles.scss';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from '../../components/Form/Form';
import { FormItem } from '../../components/FormItem/FormItem';

export const AccountInfoPage = ({ user }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <Form>
        <FormItem
          modifierClasses="form-item--inline"
          label={'First Name'}
          placeholder={user.firstName}
          showLabel={true}
          value={firstName}
          handleChange={(e) => setFirstName(e.target.value)}
        ></FormItem>
        <FormItem
          modifierClasses="form-item--inline"
          label={'Last Name'}
          placeholder={user.lastName}
          showLabel={true}
          value={lastName}
          handleChange={(e) => setLastName(e.target.value)}
        ></FormItem>
        <FormItem
          modifierClasses="form-item--inline"
          label={'Email Address'}
          placeholder={user.email}
          showLabel={true}
          value={email}
          type="email"
          handleChange={(e) => setEmail(e.target.value)}
        ></FormItem>
        <FormItem
          modifierClasses="form-item--inline"
          label={'Role'}
          placeholder={user.role}
          showLabel={true}
          value={role}
          handleChange={(e) => setRole(e.target.value)}
        ></FormItem>
        <FormItem
          modifierClasses="form-item--inline"
          label={'Username'}
          placeholder={user.username}
          showLabel={true}
          value={username}
          handleChange={(e) => setUsername(e.target.value)}
        ></FormItem>
        <FormItem
          modifierClasses="form-item--inline"
          label={'Password'}
          placeholder={user.password}
          showLabel={true}
          value={password}
          type="password"
          handleChange={(e) => setPassword(e.target.value)}
        ></FormItem>
      </Form>
    </div>
  );
};

AccountInfoPage.propTypes = {
  user: {
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
    username: PropTypes.string,
    password: PropTypes.string,
  },
};
