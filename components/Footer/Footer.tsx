'use client';

import Link from 'next/link';
import ButtonLink from '@components/Button/ButtonLink';
import { signOut, useSession } from 'next-auth/react';
import Button from '@components/Button/Button';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const { data: session } = useSession();
  const isLoggedIn = !!session;

  const handleSignOut = (): void => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <footer className='footer'>
      <div className='footer-wave'>
        <svg viewBox='0 0 1440 320' preserveAspectRatio='none'>
          <path
            fill='#ffffff'
            fillOpacity='1'
            d='M0,32L80,74.7C160,117,320,203,480,218.7C640,235,800,181,960,165.3C1120,149,1280,171,1360,181.3L1440,192L1440,320L0,320Z'
          />
        </svg>
      </div>

      <div className='footer-container'>
        <div className='footer-top'>
          <div className='footer-logo'>
            <Link href='/' className='footer-links'>
              <span className='brand-name'>accelero</span>
            </Link>
          </div>

          <div className='footer-links'>
            <div className='column'>
              <h4>Explore</h4>
              <Link href='/'>Home</Link>
              <Link href='/events'>Events</Link>
              {/*<Link href='/venues'>Venues</Link>*/}
              {/*<Link href='/news'>News</Link>*/}
              <Link href='/promoters'>For Promoters</Link>
            </div>
            <div className='column'>
              <h4>Support</h4>
              <Link href='/contact'>Contact Us</Link>
              <Link href='/help'>Help</Link>
              <Link href='/legal/privacy-policy'>Privacy Policy</Link>
            </div>
            {!isLoggedIn ? (
              <div className='column'>
                <h4>Account</h4>
                <Link href='/members/signup'>Sign Up</Link>
                <ButtonLink color='signin-btn' text='Sign in' url='members/signin' />
              </div>
            ) : (
              <div className='column'>
                <h4>Members</h4>
                <Link href='/members/account'>My Account</Link>
                <Link href='/members/tickets'>My Tickets</Link>
                <Button color='signin-btn' text='Sign Out' onClick={handleSignOut}/>
              </div>
            )}
          </div>
        </div>

        <div className='newsletter'>
          <p>📬 Stay updated with the hottest concerts and exclusive deals!</p>
          <div className='input-container'>
            <input
              type='email'
              name='email'
              placeholder='your@emailaddress.com'
              required
              autoComplete='off'
            />
            <button type='submit' className='red-filled'>
              <span className='material-symbols-outlined red'>arrow_forward</span>
            </button>
          </div>

          <div className='social-icons'>
            <Link href='https://facebook.com' target='_blank' aria-label='Facebook'>
              <i className='fab fa-facebook-f'></i>
            </Link>
            <Link href='https://instagram.com' target='_blank' aria-label='Instagram'>
              <i className='fab fa-instagram'></i>
            </Link>
            <Link href='https://twitter.com' target='_blank' aria-label='Twitter'>
              <i className='fab fa-twitter'></i>
            </Link>
          </div>
        </div>

        <div className='copy'>
          <span>&copy; {currentYear} - accelero ticketing</span>
          <div className='terms'>
            <Link href='/legal/privacy-policy'>Privacy Policy</Link>
            &nbsp;&bull;&nbsp;
            <Link href='/legal/cookies'>Cookies</Link>
            &nbsp;&bull;&nbsp;
            <Link href='/legal/terms-of-service'>Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
