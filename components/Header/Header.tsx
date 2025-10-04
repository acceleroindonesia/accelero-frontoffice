'use client';

import { useRef, useState } from 'react';

import Link from 'next/link';

// hooks
import useClickOutside from '@hooks/useClickOutside';

// components
import Dropdown from '@components/Dropdown/Dropdown';
import DropdownItem from '@components/Dropdown/DropdownItem';
import ProfilePhoto from '@components/Profile/ProfilePhoto';
import { signOut, useSession } from 'next-auth/react';

const Header: React.FC = () => {
  const wrapperRef = useRef<any>(null);

  const [menu, setMenu] = useState<boolean>(false);
  const [dropdown, setDropdown] = useState<boolean>(false);

  const { data: session } = useSession();
  const isLoggedIn = !!session;

  /**
   * This is a functional component for the Header.
   * It uses the useClickOutside hook to handle click events outside the component.
   * It also manages the state of the menu and dropdown.
   */
  useClickOutside(wrapperRef, () => {
    setDropdown(false);
  });

  /**
   * Toggles the menu state.
   */
  const menuState = (): void => {
    setMenu((state) => !state);
  };

  const handleSignOut = (): void => {
    signOut({ callbackUrl: '/' });
    setDropdown(false);
  };

  return (
    <header className='colorful-header'>
      <div className='container'>
        <div className='logo'>
          <Link href='/' className='colorful-link logo-link'>
            <span className='brand-name-header'>accelero</span>
          </Link>

          <button
            type='button'
            onClick={() => {
              menuState();
            }}
          >
            <span className='material-symbols-outlined white-icon'>menu</span>
          </button>
        </div>
        <div className='links responsive-hide'>
          <Link href='/' className=' colorful-link'>
            Home
          </Link>
          <Link href='/contact' className='colorful-link'>
            Contact us
          </Link>
          <Link href='/events' className='colorful-link'>
            Events
          </Link>
          {/*<Link href='/news' className='gray'>*/}
          {/*  News*/}
          {/*</Link>*/}
        </div>
        <div className='members' ref={wrapperRef}>
          {isLoggedIn ? (
            <>
              <Link href='/members/account' className='colorful-link'>
                <ProfilePhoto image='https://www.cenksari.com/content/profile.jpg' size='small' />
              </Link>
              <button
                type='button'
                className='menu-opener colorful-link'
                onClick={() => setDropdown(!dropdown)}
              >
                {'Menu'}
                <span className='material-symbols-outlined'>
                  {dropdown ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
                </span>
              </button>
              {dropdown && (
                <Dropdown color='gray'>
                  <DropdownItem url='/members/tickets' text='My tickets' />
                  <DropdownItem url='/members/account' text='My account' />
                  <hr />
                  <DropdownItem text='Sign out' onClick={() => handleSignOut()} url={''} />
                </Dropdown>
              )}
            </>
          ) : (
            <>
              <div className='authHeader'>
                <Link href='/members/signup' className='signup'>
                  Sign up
                </Link>
                <Link href='/members/signin' className='signin'>
                  Sign in
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
      {menu && (
        <div className='main-menu-backdrop'>
          <div className='main-menu'>
            <div className='top'>
              <button
                type='button'
                onClick={() => {
                  menuState();
                }}
              >
                <span className='material-symbols-outlined'>close</span>
              </button>
            </div>
            <div className='padding-top center'>
              <ul>
                <li>
                  <Link href='/' className='white'>
                    Home
                  </Link>
                </li>
                {isLoggedIn ? (
                  <>
                    <li>
                      <Link href='/members/account' className='white'>
                        My account
                      </Link>
                    </li>

                    <li>
                      <Link href='/tickets' className='white'>
                        My tickets
                      </Link>
                    </li>
                    <li>
                      <Link href='/members/signout' className='white' onClick={handleSignOut}>
                        Sign out
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link href='/members/signup' className='white'>
                        Sign up
                      </Link>
                    </li>
                    <li>
                      <Link href='/members/signin' className='white'>
                        Sign in
                      </Link>
                    </li>
                  </>
                )}
                <li>
                  <Link href='/events' className='white'>
                    Events
                  </Link>
                </li>
                <li>
                  <Link href='/help' className='white'>
                    Help
                  </Link>
                </li>
                <li>
                  <Link href='/contact' className='white'>
                    Contact us
                  </Link>
                </li>
                <li>
                  <Link href='/promoters' className='white'>
                    For promoters
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};


export default Header;
