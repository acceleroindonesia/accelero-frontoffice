import { type Metadata } from 'next'

// components
import Master from '@components/Layout/Master'
import Section from '@components/Section/Section'
import Heading from '@components/Heading/Heading'

import Form from './components/Form'

const Page: React.FC = () => (
  <Master>
    <Section className="white-background">
      <div className="container">
        <div className="center">
          <Heading type={1} color="gray" text="Change password" />
          <p className="gray form-information">
            Please enter your new password. It&apos;s a good idea to use a strong password that you
            are not using elsewhere. Your new password must be at least 8 characters.
          </p>
        </div>
        <Form />
      </div>
    </Section>
  </Master>
)

const title = 'Change password'
const canonical = 'https://accelero-ticketing.com/members/password'
const description = 'accelero ticketing is a accelero ticketing solution'

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
}

export default Page
