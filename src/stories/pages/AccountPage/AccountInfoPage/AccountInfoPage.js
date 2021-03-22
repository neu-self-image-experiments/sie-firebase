/* eslint-disable no-console */
/* eslint-disable max-len */
import '../styles.scss';

import React, { useContext, useState } from 'react';
import { Form } from '../../../components/Form/Form';
import { FormItem } from '../../../components/FormItem/FormItem';
import { UserContext } from '../AccountPage';
import Edit from '../../../../images/icon-edit.svg';
import HorizontalRuleDark from '../../../../images/icon-horizontal-rule-dark.svg';
import HorizontalRuleLight from '../../../../images/icon-horizontal-rule-light.svg';
import { updateUserData } from '../../../../firebase/api/users';
import { StatusCodes } from 'http-status-codes';
import { isEmpty } from '../../../../utils/utils';

/**
 * Component for Account Information page.
 *
 * @component
 * @return {object} (
 *   <AccountPage>
 * )
 */
export const AccountInfoPage = () => {
  const { user, setUser } = useContext(UserContext);

  const [editInfo, setEditInfo] = useState(true);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState(user.password);

  const updateUserInfo = () => {
    if (!editInfo) {
      if (
        isEmpty(firstName) ||
        isEmpty(lastName) ||
        isEmpty(email) ||
        isEmpty(role)
      ) {
        alert('Cannot submit if any fields are empty');
        return;
      }

      const result = updateUserData({
        firstName,
        lastName,
        email,
        role,
      });

      if (result.status === StatusCodes.OK) {
        setUser(newUser);
      } else {
        // TODO: how do we handle this?
        alert('error');
      }
      setEditInfo(true);
    } else {
      setEditInfo(false);
    }
  };

  return (
    <div className="account-info">
      <div className="account-info__section-header">
        <img
          className="account-info__personal__horizontal-rule"
          src={HorizontalRuleDark}
        ></img>
        <h5 className="account-info__header-text">PERSONAL INFO</h5>
        <img
          className="account-info__edit"
          src={Edit}
          onClick={() => updateUserInfo()}
        ></img>
      </div>
      <Form type="account">
        <FormItem
          modifierClasses="form-item--inline"
          label={'First Name'}
          placeholder={firstName}
          showLabel={true}
          value={firstName}
          handleChange={(e) => setFirstName(e.target.value)}
          disabled={editInfo}
        ></FormItem>
        <FormItem
          modifierClasses="form-item--inline"
          label={'Last Name'}
          placeholder={lastName}
          showLabel={true}
          value={lastName}
          handleChange={(e) => setLastName(e.target.value)}
          disabled={editInfo}
        ></FormItem>
        <FormItem
          modifierClasses="form-item--inline"
          label={'Email Address'}
          placeholder={email}
          showLabel={true}
          value={email}
          type="email"
          handleChange={(e) => setEmail(e.target.value)}
          disabled={editInfo}
        ></FormItem>
        <FormItem
          modifierClasses="form-item--inline"
          label={'Role'}
          placeholder={role}
          showLabel={true}
          value={role}
          handleChange={(e) => setRole(e.target.value)}
          disabled={editInfo}
        ></FormItem>
      </Form>
      <div className="account-info__section-header">
        <img className="login__horizontal-rule" src={HorizontalRuleLight}></img>
        <h5 className="account-info__header-text">LOGIN</h5>
        <img className="account-info__edit" src={Edit}></img>
      </div>
      <Form type="account">
        <FormItem
          modifierClasses="form-item--inline"
          label={'Username'}
          placeholder={username}
          showLabel={true}
          value={username}
          handleChange={(e) => setUsername(e.target.value)}
        ></FormItem>
        <FormItem
          modifierClasses="form-item--inline"
          label={'Password'}
          placeholder={password}
          showLabel={true}
          value={password}
          type="password"
          handleChange={(e) => setPassword(e.target.value)}
        ></FormItem>
      </Form>
    </div>
  );
};
