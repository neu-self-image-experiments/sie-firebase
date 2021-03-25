import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router';
import { AuthContext } from '../../../contexts/auth-provider';

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  /**
   * The component to render
   */
  component: PropTypes.node,
  /**
   * Previous location
   */
  location: PropTypes.string,
};
