/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { getCurrentUser, getUser } from '../firebase/api/users';
import { Loader } from '../stories/components/Loader/Loader';

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loaded, setLoaded] = useState(false);
  const [trigger, setTrigger] = useState(false);

  useEffect(async () => {
    // eslint-disable-next-line no-console
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
  }, [trigger]);

  return loaded ? (
    <AuthContext.Provider value={{ user, trigger, setTrigger }}>
      {children}
    </AuthContext.Provider>
  ) : (
    <Loader />
  );
};

export { AuthProvider, AuthContext };
