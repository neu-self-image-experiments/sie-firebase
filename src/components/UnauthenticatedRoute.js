import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { useAppContext } from '../libs/contextLib';

function querystring(name, url = window.location.href) {
  const formattedName = name.replace(/[[]]/g, '\\$&');

  const regex = new RegExp('[?&]' + formattedName + '(=([^&#]*)|&|#|$)', 'i');
  const results = regex.exec(url);

  if (!results) {
    return null;
  }
  if (!results[2]) {
    return '';
  }

  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export default function UnauthenticatedRoute({ children, ...rest }) {
  const { isAuthenticated } = useAppContext();

  const redirect = querystring('redirect');
  return (
    <Route {...rest}>
      {!isAuthenticated ? (
        children
      ) : (
        <Redirect
          to={redirect === '' || redirect === null ? '/dashboard' : redirect}
        />
      )}
    </Route>
  );
}

UnauthenticatedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
