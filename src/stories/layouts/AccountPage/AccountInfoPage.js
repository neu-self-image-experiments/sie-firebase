import React from 'react';
import PropTypes from 'prop-types';
import { Form } from '../../components/Form/Form';
import { FormItem } from '../../components/FormItem/FormItem';

export const AccountInfoPage = ({ user }) => {
  return (
    <div>
      <Form>
        <FormItem
          label={'First Name'}
          value={user.firstName}
        ></FormItem>
        <FormItem label={'Last Name'} value={user.lastName}></FormItem>
        <FormItem label={'Email Address'} value={user.email}></FormItem>
        <FormItem label={'Role'} value={user.role}></FormItem>
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
  },
};
