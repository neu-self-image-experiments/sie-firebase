/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import { AuthContext } from '../../../contexts/auth-provider';

export const PrivateRoute = ({ children, ...rest }) => {
  // Add your own authentication on the below line.
  const user = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          { children }
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  );
};
