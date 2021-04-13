import '../styles.scss';

import React, { useContext, useState } from 'react';
import { Form } from '../../../components/Form/Form';
import { FormItem } from '../../../components/FormItem/FormItem';
import Edit from '../../../../images/icon-edit.svg';
import Done from '../../../../images/icon-done.svg';
import { updateUserData } from '../../../../firebase/api/users';
import { StatusCodes } from 'http-status-codes';
import { isEmpty } from '../../../../utils/utils';
import { AuthContext } from '../../../../contexts/auth-provider';

/**
 * Component for Account Information page.
 *
 * @component
 * @return {object} (
 *   <AccountPage>
 * )
 */
export const AccountInfoPage = () => {
  const { user } = useContext(AuthContext);

  const [editInfo, setEditInfo] = useState(true);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);

  const updateUserInfo = async () => {
    if (!editInfo) {
      if (
        isEmpty(firstName) ||
        isEmpty(lastName) ||
        isEmpty(role) ||
        isEmpty(email)
      ) {
        alert('Cannot submit if any fields are empty');
        return;
      }

      const result = await updateUserData({
        firstName,
        lastName,
        email,
        role,
      });
      if (result.status === StatusCodes.OK) {
      } else {
        // TODO: how do we handle this
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
        <h6 className="account-info__header-text">Account Info</h6>
        <button className="account-info__edit"
          onClick={() => updateUserInfo()}>
          <img src={editInfo ? Edit : Done} />
        </button>
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
          label={'Email'}
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
          disabled={true}
          handleChange={(e) => setRole(e.target.value)}
        ></FormItem>
      </Form>
    </div>
  );
};
