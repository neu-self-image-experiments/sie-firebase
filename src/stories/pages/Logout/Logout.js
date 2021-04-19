import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../../contexts/auth-provider';
import { HorizontalTitle } from
  '../../components/HorizontalTitle/HorizontalTitle';
import { Constrain } from '../../layouts/Constrain/Constrain';
import { Button } from '../../components/Button/Button';
import { logOut } from '../../../firebase/api/users';
/**
 * Component for logout page.
 *
 * @component
 * @return {object} (
 *   <Logout>{children}</Logout>
 * )
 */
export const Logout = () => {
  const history = useHistory();

  const { resetUserData } = useContext(AuthContext);


  const logUserOut = (e) => {
    e.preventDefault();

    logOut().then((response) => {
      if (response.status === 200) {
        // REDIRECT TO LOGIN
        // ERROR HANDLING
        resetUserData();
        history.push('/login');
      } else {
        alert(response.status);
      }
    });
  };

  const cancelLogout = (e) => {
    history.push('/dashboard');
  };
  return (
    <Constrain>
      <HorizontalTitle
        modifierClasses="horizontal-title--medium"
        eyebrow="Confirm"
        title="Logout"
        content={'Are you sure you want to logout?'}
      />
      <Constrain>
        <Button
          modifierClasses={'button--small button--secondary'}
          disabled={true}
          isButton={true}
          text="Yes"
          onClick={(e) => logUserOut(e)}
        />
        <Button
          modifierClasses={'button--small button--quaternary'}
          disabled={true}
          isButton={true}
          text="No"
          onClick={(e) => cancelLogout(e)}
        />
      </Constrain>
    </Constrain>
  );
};
