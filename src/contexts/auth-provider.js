import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { getCurrentUser, getUser } from '../firebase/api/users';
import { Loader } from '../stories/components/Loader/Loader';

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [error, setError] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [trigger, setTrigger] = useState(false);

  const resetUserData = () => {
    setTrigger(!trigger);
    setUser();
    setIsAuthenticated(false);
  };

  const reloadAuthProvider = () => {
    setTrigger(!trigger);
    setLoaded(false);
  };

  useEffect(async () => {
    try {
      const auth = await getCurrentUser();
      if (auth) {
        const user = await getUser(auth.uid);
        setUser(user.data);
        setIsAuthenticated(true);
      } else {
        setError('User email is not verified');
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoaded(true);
    }
  }, [trigger]);

  return loaded ? (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        trigger,
        setTrigger,
        resetUserData,
        reloadAuthProvider,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  ) : (
    <Loader />
  );
};

AuthProvider.propTypes = {
  /**
   * Children of this AuthProvider
   */
  children: PropTypes.node,
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('undefined');
  }
  return context;
};

export { AuthProvider, AuthContext, useAuth };
