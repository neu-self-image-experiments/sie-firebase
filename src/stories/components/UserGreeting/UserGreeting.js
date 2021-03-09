import './styles.scss';

import React, { useState, useEffect, useContext } from 'react';
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
  const user = useContext(UserContext);
  const [logInState, setLogInState] = useState({ isLoggedIn: false });
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    service.getCurrentUser(setLoginState).then((response) => {
      if (response.errorCode) {
        // ERROR HANDLING
        // setError(response.errorMessage);
      } else {
        setError('');
        setFirstName(user.firstName);
        setLastName(user.lastName);
      }
    });
  });

  return (
    <UserContext.Provider value={logInState.user}>
      <div>
        <h3>Hello, {firstName + lastName}</h3>
      </div>  
    </UserContext.Provider>
  );
};
