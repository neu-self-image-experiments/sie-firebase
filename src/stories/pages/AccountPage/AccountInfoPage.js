/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-function */
import './styles.scss';

import React, { useContext, useState } from 'react';
import { Form } from '../../components/Form/Form';
import { FormItem } from '../../components/FormItem/FormItem';
import { UserContext } from './AccountPage';
import Edit from '../../../images/icon-edit.svg';
import HorizontalRule from '../../../images/icon-horizontal-rule.svg';

/**
 * Component for Account Information page.
 *
 * @component
 * @return {object} (
 *   <AccountPage>
 * )
 */
export const AccountInfoPage = () => {
  const user = useContext(UserContext);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <div className="account-info__section-header">
        <img className="personal__horizontal-rule" src={HorizontalRule}></img>
        <span className="account-info__header-text">PERSONAL INFO</span>
        <img className="account-info__edit" src={Edit}></img>
      </div>
      <Form type="account">
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
      </Form>
      <div className="account-info__section-header">
        <img className="login__horizontal-rule" src={HorizontalRule}></img>
        <span className="account-info__header-text">LOGIN</span>
        <img className="account-info__edit" src={Edit}></img>
      </div>
      <Form type="account">
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
