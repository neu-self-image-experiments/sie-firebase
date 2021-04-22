import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router';

export const PrivateRoute = ({ component: Component, user, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        user?.email ? (
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
  component: PropTypes.func || PropTypes.node,
  /**
   * Previous location
   */
  location: PropTypes.object,
  /**
   * User that is logged in
   */
  user: PropTypes.object,
};
