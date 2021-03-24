import React, { useState } from 'react';
import { Button } from '../../../components/Button/Button';
import { Form } from '../../../components/Form/Form';
import { FormItem } from '../../../components/FormItem/FormItem';

export const ResetPasswordForm = () => {
  // const [currentPassword, setCurrentPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [verifyPassword, setVerifyPassword] = useState();
  const [isVerified, setIsVerified] = useState(true);

  const resetPassword = async () => {
    // TODO: need to check if current password is correct.
    if (newPassword != verifyPassword) {
      setIsVerified(false);
    } else {
      // TODO: resetUserPassword doesn't work
      // const result = await resetUserPassword(newPassword);
    }
  };

  return (
    <Form>
      {!isVerified ? <p>Passwords do not match</p> : null}
      {/* <FormItem
        placeholder="Current Password"
        value={currentPassword}
        handleChange={(e) => setCurrentPassword(e.target.value)}
      ></FormItem> */}
      <FormItem
        placeholder="New Password"
        value={newPassword}
        handleChange={(e) => setNewPassword(e.target.value)}
      ></FormItem>
      <FormItem
        placeholder="Verify Password"
        value={verifyPassword}
        handleChange={(e) => setVerifyPassword(e.target.value)}
      ></FormItem>
      <Button
        text="Reset Password"
        isButton={true}
        onClick={() => resetPassword()}
      ></Button>
    </Form>
  );
};
