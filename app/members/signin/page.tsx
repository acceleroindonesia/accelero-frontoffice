import Link from 'next/link';

import { type Metadata } from 'next';

// components
import Master from '@components/Layout/Master';
import Section from '@components/Section/Section';
import Heading from '@components/Heading/Heading';

import Form from './components/Form';

const Page: React.FC = () => (
  <Master>
    <Section className='white-background'>
      <div className='container'>
        <div className='center'>
          <Heading type={1} color='white' text='Sign in' />
          <p className='white form-information'>
            Please enter your e-mail address and password to sign in. Don&apos;t have an account?{' '}
            <Link href='/members/signup' className='red'>
              Sign up here
            </Link>
          </p>
        </div>
        <Form />
      </div>
    </Section>
  </Master>
);

const title = 'Sign in';
const canonical = 'https://accelero-ticketing.com/members/signin';
const description = 'accelero ticketing is a accelero ticketing solution';

export const metadata: Metadata = {
  title,
  description,
  keywords: 'accelero ticketing',
  alternates: { canonical },
  openGraph: {
    title,
    description,
    url: canonical,
    type: 'website',
    siteName: 'accelero ticketing',
    images: 'https://accelero-ticketing.com/logo192.png',
  },
};

export default Page;
