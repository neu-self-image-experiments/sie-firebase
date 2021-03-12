import './styles.scss';

import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from 'react-router-dom';
import { ReactComponent as DashboardIcon} from
  '../../../images/icon-dashboard.svg';
import { ReactComponent as ExperimentsIcon} from
  '../../../images/icon-experiments.svg';
import { ReactComponent as AccountIcon} from
  '../../../images/icon-account.svg';
import { ReactComponent as LogoutIcon} from
  '../../../images/icon-logout.svg';

/**
 * Component for main menu.
 *
 * @component
 * @return {object} (
 *   <MainMenu />
 * )
 */

export const MainMenu = () => {
  // List of button links/icons we currently support
  const icons = ['Dashboard', 'Experiments', 'Account', 'Logout'];

  // Returns SVG react component based on icon name
  const getIcon = (icon) => {
    switch (icon) {
    case ('Dashboard'):
      return (<DashboardIcon/>);
    case ('Experiments'):
      return (<ExperimentsIcon/>);
    case ('Account'):
      return (<AccountIcon/>);
    case ('Logout'):
      return (<LogoutIcon/>);
    }
  };

  return (
    <Router>
      <ul className='main-menu'>
        {
          icons.map((icon) => {
            return (
              <li key={icon}>
                <NavLink
                  to={icon}
                  className={'menu-item__link'}>
                  <p className='menu-item__icon'>{getIcon(icon)}</p>
                  <p className='menu-item__text'>{icon}</p>
                </NavLink>
              </li>
            );
          })
        }
      </ul>

      {/* TODO: Need to properly render different pages.
      currently routing to 'dummy' pages created below. */}
      <hr />
      <Switch>
        <Route exact path="/dashboard">
          <DashboardPage />
        </Route>
        <Route path="/experiments">
          <ExperimentsPage />
        </Route>
        <Route path="/account">
          <AccountPage />
        </Route>
        <Route path="/logout">
          <LogoutPage />
        </Route>
      </Switch>
    </Router>
  );
};

// TODO: Update pages below once these pages are implemented
function DashboardPage() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}

function ExperimentsPage() {
  return (
    <div>
      <h2>Experiments</h2>
    </div>
  );
}

function AccountPage() {
  return (
    <div>
      <h2>Account</h2>
    </div>
  );
}

function LogoutPage() {
  return (
    <div>
      <h2>Logout</h2>
    </div>
  );
}
