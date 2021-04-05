import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getCurrentUser, getUser } from '../firebase/api/users';
import { Loader } from '../stories/components/Loader/Loader';

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [trigger, setTrigger] = useState(false);

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
      }
      setLoaded(true);
    } catch (err) {
      // setError(err);
    }
  }, [trigger]);

  return loaded ? (
    <AuthContext.Provider value={{ user, isAuthenticated, reloadAuthProvider }}>
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

export { AuthProvider, AuthContext };
