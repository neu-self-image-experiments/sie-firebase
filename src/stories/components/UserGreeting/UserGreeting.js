import './styles.scss';

import React, { useState, useEffect, useContext } from 'react';
import UserServices from '../../../firebase/CRUDServices/userServices';

export const UserContext = React.createContext();

/**
 * Component for user's greeting element.
 *
 * @component
 * @return {object} (
 *   <UserGreeting/>
 * )
 */
export const UserGreeting = () => {
  const service = UserServices.getInstance();
  const user = useContext(UserContext);
  const [logInState, setLogInState] = useState({ isLoggedIn: false });
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');

  useEffect(async () => {
    service.getCurrentUser(setLogInState).then((response) => {
      if (response && response.errorCode) {
        // ERROR HANDLING
        setLogInState({ isLoggedIn: false });
        setError(response.errorMessage);
      } else {
        setError('');
        setLogInState({ isLoggedIn: true });
        setFirstName(user.firstName);
        setLastName(user.lastName);
      }
    });
  }, [logInState.isLoggedIn]);

  return (
    <div>
      { logInState.isLoggedIn ?
        <UserContext.Provider value={logInState.user}>
          <div>
            <h5>Hello, {firstName + ' ' + lastName}</h5>
          </div>
        </UserContext.Provider> :
        <div>
          { error }
        </div>
      }
    </div>
  );
};
