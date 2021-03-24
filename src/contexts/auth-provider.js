/* eslint-disable react/prop-types */
/* eslint-disable object-curly-spacing */
import React, { useEffect, useState } from 'react';
import { getCurrentUser, getUser } from '../firebase/api/users';

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  useEffect(async () => {
    try {
      const auth = await getCurrentUser();
      if (auth) {
        const user = await getUser(auth.uid);
        setUser(user.data);
      }
    } catch (err) {
      // setError(err);
    }
  }, []);

  return (
    <AuthContext.Provider value={user}>
      {children}
    </AuthContext.Provider>);
};

export {AuthProvider, AuthContext };
