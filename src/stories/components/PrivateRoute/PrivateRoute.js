/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React from 'react';
import { Redirect, Route } from 'react-router';

export const PrivateRoute = ({ children, user, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <React.Fragment>{children}</React.Fragment>
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  );
};
