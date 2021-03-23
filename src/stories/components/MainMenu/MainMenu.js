import './styles.scss';

import React from 'react';
import { NavLink } from 'react-router-dom';
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
    <ul className="main-menu">
      {
        icons.map((icon) => {
          return (
            <li className="main-menu__item" key={icon}>
              <NavLink
                to={icon}
                className={'menu-item__link'}>
                <span className='menu-item__icon'>{getIcon(icon)}</span>
                {icon}
              </NavLink>
            </li>
          );
        })
      }
    </ul>
  );
};
