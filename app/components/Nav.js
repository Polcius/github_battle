import React from 'react'
import { NavLink } from 'react-router-dom'

// In 'NavLink', using 'activeClassName' automatically detects the route and applies the class to the link

export default function Nav() {
  return (
    <ul className='nav'>
      <li>
        
        <NavLink exact activeClassName='active' to='/'>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName='active' to='/battle'>
          Battle
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName='active' to='/popular'>
          Popular
        </NavLink>
      </li>
    </ul>
  )
};
