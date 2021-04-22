import './styles.scss';

import React from 'react';
import { NavLink } from 'react-router-dom';
import { ReactComponent as ExperimentsIcon } from
  '../../../images/icon-experiments.svg';
import { ReactComponent as AccountIcon } from
  '../../../images/icon-account.svg';
import { ReactComponent as LogoutIcon } from
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
  const icons = ['experiments', 'account', 'logout'];

  // Returns SVG react component based on icon name
  const getIcon = (icon) => {
    switch (icon) {
    case ('experiments'):
      return (<ExperimentsIcon/>);
    case ('account'):
      return (<AccountIcon/>);
    case ('logout'):
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
                to={'/' + icon}
                className={'menu-item__link'}>
                <span className='menu-item__icon'>{getIcon(icon)}</span>
                {icon.charAt(0).toUpperCase() + icon.slice(1)}
              </NavLink>
            </li>
          );
        })
      }
    </ul>
  );
};
