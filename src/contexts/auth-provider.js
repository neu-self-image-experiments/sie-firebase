/* eslint-disable react/prop-types */
/* eslint-disable object-curly-spacing */
import React, { useEffect, useState } from 'react';
import { getCurrentUser, getUser } from '../firebase/api/users';
import { Loader } from '../stories/components/Loader/Loader';

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loaded, setLoaded] = useState(false);

  useEffect(async () => {
    try {
      const auth = await getCurrentUser();
      if (auth) {
        const user = await getUser(auth.uid);
        setUser(user.data);
      }
      setLoaded(true);
    } catch (err) {
      // setError(err);
    }
  }, []);

  return loaded ? (
    <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
  ) : (
    <Loader />
  );
};

export { AuthProvider, AuthContext };
