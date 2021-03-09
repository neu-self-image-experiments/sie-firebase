import './styles.scss';

import React, { useState, useEffect } from 'react';
import UserServices from '../../../firebase/CRUDServices/userServices';

/**
 * Component for user's greeting element.
 *
 * @component
 * @return {object} (
 *   <Greeting/>
 * )
 */
export const Greeting = () => {
  const service = UserServices.getInstance();
  const [user, setUser] = useState({});
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  //   const [error, setError] = useState('');

  useEffect(() => {
    service.getCurrentUser(setUser).then((response) => {
      if (response.errorCode) {
        // ERROR HANDLING
        // setError(response.errorMessage);
      } else {
        // setError('');
        // setFirstName(user.firstName);
        setLastName(user.lastName);
        setFirstName('Jane');
        setLastName('Doe');
      }
    });
  });

  return (
    <div>
      <h3>Hello, {firstName + lastName}</h3>
    </div>
  );
};
